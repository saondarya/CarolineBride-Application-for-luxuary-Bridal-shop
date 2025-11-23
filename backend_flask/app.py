from datetime import timedelta

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    get_jwt_identity,
    jwt_required,
    get_jwt,
)
from pymongo import MongoClient
from werkzeug.security import check_password_hash, generate_password_hash
from bson import ObjectId


def create_app():
    app = Flask(__name__)

    # Basic configuration – customise in production via environment variables
    app.config["JWT_SECRET_KEY"] = "change-this-secret-in-production"
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=7)

    CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)
    JWTManager(app)

    mongo_uri = "mongodb://localhost:27017/carolinebride"
    client = MongoClient(mongo_uri)
    db = client["carolinebride"]

    users = db["users"]
    carts = db["carts"]
    orders = db["orders"]
    appointments = db["appointments"]

    # ---------- Auth ----------

    @app.post("/api/auth/register")
    def register():
        data = request.get_json() or {}
        name = data.get("name", "").strip()
        email = data.get("email", "").strip().lower()
        password = data.get("password", "")

        if not name or not email or not password:
            return jsonify({"message": "Name, email and password are required"}), 400

        if users.find_one({"email": email}):
            return jsonify({"message": "Email already registered"}), 400

        hashed = generate_password_hash(password)
        # Simple rule: treat emails ending with '+admin@carolinebride.com' as admin,
        # otherwise regular users. You can also flip this flag manually in MongoDB.
        is_admin = bool(data.get("isAdmin")) or email.endswith("+admin@carolinebride.com")

        user_doc = {
            "name": name,
            "email": email,
            "password": hashed,
            "isAdmin": is_admin,
            "createdAt": db.command("serverStatus")["localTime"],
        }
        users.insert_one(user_doc)

        access_token = create_access_token(
            identity=str(user_doc["_id"]),
            additional_claims={"is_admin": is_admin},
        )
        user_response = {"name": name, "email": email, "isAdmin": is_admin}

        return jsonify({"token": access_token, "user": user_response}), 201

    @app.post("/api/auth/login")
    def login():
        data = request.get_json() or {}
        email = data.get("email", "").strip().lower()
        password = data.get("password", "")

        user = users.find_one({"email": email})
        if not user or not check_password_hash(user["password"], password):
            return jsonify({"message": "Invalid credentials"}), 401

        is_admin = bool(user.get("isAdmin"))
        access_token = create_access_token(
            identity=str(user["_id"]),
            additional_claims={"is_admin": is_admin},
        )
        user_response = {
            "name": user.get("name"),
            "email": user.get("email"),
            "isAdmin": is_admin,
        }
        return jsonify({"token": access_token, "user": user_response}), 200

    # Helper to get current user id for collections
    def current_user_id():
        return get_jwt_identity()

    def require_admin():
        claims = get_jwt()
        if not claims.get("is_admin"):
            return False
        return True

    # ---------- Cart ----------

    @app.get("/api/cart")
    @jwt_required()
    def get_cart():
        uid = current_user_id()
        cart = carts.find_one({"userId": uid}) or {"items": []}
        items = cart.get("items", [])
        total = sum((item.get("price", 0) * item.get("quantity", 1)) for item in items)

        return jsonify({"items": items, "total": total}), 200

    @app.post("/api/cart")
    @jwt_required()
    def update_cart():
        uid = current_user_id()
        data = request.get_json() or {}
        items = data.get("items")

        if not isinstance(items, list):
            return jsonify({"message": "Items must be a list"}), 400

        carts.update_one(
            {"userId": uid}, {"$set": {"items": items}}, upsert=True
        )

        total = sum((item.get("price", 0) * item.get("quantity", 1)) for item in items)
        return jsonify({"message": "Cart updated", "total": total}), 200

    # ---------- Orders ----------

    @app.get("/api/orders")
    @jwt_required()
    def get_orders():
        uid = current_user_id()
        user_orders = list(orders.find({"userId": uid}).sort("createdAt", -1))
        for o in user_orders:
            o["_id"] = str(o["_id"])
        return jsonify({"orders": user_orders}), 200

    @app.get("/api/admin/orders")
    @jwt_required()
    def get_all_orders():
        if not require_admin():
            return jsonify({"message": "Admin privileges required"}), 403

        all_orders = list(orders.find().sort("createdAt", -1))
        for o in all_orders:
            o["_id"] = str(o["_id"])
        return jsonify({"orders": all_orders}), 200

    @app.patch("/api/admin/orders/<order_id>")
    @jwt_required()
    def update_order_status(order_id):
        if not require_admin():
            return jsonify({"message": "Admin privileges required"}), 403

        data = request.get_json() or {}
        new_status = data.get("status")
        allowed_statuses = {"confirmed", "dispatched", "completed"}

        if new_status not in allowed_statuses:
            return jsonify({"message": "Invalid status"}), 400

        try:
            oid = ObjectId(order_id)
        except Exception:
            return jsonify({"message": "Invalid order id"}), 400

        result = orders.find_one_and_update(
            {"_id": oid},
            {"$set": {"status": new_status}},
            return_document=True,
        )

        if not result:
            return jsonify({"message": "Order not found"}), 404

        result["_id"] = str(result["_id"])
        return jsonify({"order": result}), 200

    @app.post("/api/orders")
    @jwt_required()
    def create_order():
        uid = current_user_id()
        data = request.get_json() or {}
        items = data.get("items")
        total = data.get("total")

        if not items or total is None:
            return jsonify({"message": "Items and total are required"}), 400

        order_doc = {
            "userId": uid,
            "items": items,
            "total": total,
            "status": "confirmed",
            "createdAt": db.command("serverStatus")["localTime"],
        }
        result = orders.insert_one(order_doc)
        order_doc["_id"] = str(result.inserted_id)

        # Clear cart after order
        carts.update_one({"userId": uid}, {"$set": {"items": []}}, upsert=True)

        return jsonify({"order": order_doc}), 201

    # ---------- Appointments ----------

    @app.get("/api/appointments")
    @jwt_required()
    def get_appointments():
        uid = current_user_id()
        user_appointments = list(
            appointments.find({"userId": uid}).sort("date", -1)
        )
        for a in user_appointments:
            a["_id"] = str(a["_id"])
        return jsonify({"appointments": user_appointments}), 200

    @app.get("/api/admin/appointments")
    @jwt_required()
    def get_all_appointments():
        if not require_admin():
            return jsonify({"message": "Admin privileges required"}), 403

        all_appointments = list(appointments.find().sort("date", -1))
        for a in all_appointments:
            a["_id"] = str(a["_id"])
        return jsonify({"appointments": all_appointments}), 200

    @app.post("/api/appointments")
    @jwt_required()
    def create_appointment():
        uid = current_user_id()
        data = request.get_json() or {}

        required_fields = ["name", "email", "phone", "date", "time", "service"]
        if any(not data.get(field) for field in required_fields):
            return jsonify({"message": "Please complete all required fields"}), 400

        appointment_doc = {
            "userId": uid,
            "name": data.get("name"),
            "email": data.get("email"),
            "phone": data.get("phone"),
            "date": data.get("date"),
            "time": data.get("time"),
            "service": data.get("service"),
            "address": data.get("address"),
            "storeLocation": data.get("storeLocation"),
            "paymentMethod": data.get("paymentMethod"),
            "notes": data.get("notes"),
            "createdAt": db.command("serverStatus")["localTime"],
        }

        result = appointments.insert_one(appointment_doc)
        appointment_doc["_id"] = str(result.inserted_id)

        return jsonify({"appointment": appointment_doc}), 201

    @app.get("/api/health")
    def health():
        return jsonify({"status": "ok"}), 200

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5011, debug=True)


