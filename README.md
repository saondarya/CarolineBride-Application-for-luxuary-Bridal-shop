CarolineBride - Luxury Bridal Collection

A full-stack luxury bridal website built with React and Node.js, featuring an elegant design and premium user experience.

Features

Frontend (React)
- Luxury Design: Premium styling with elegant gold theme, luxury fonts, and sophisticated animations
- Responsive Layout: Mobile-first design that works on all devices
- Video Showcase: Featured video section for latest bride gown designs
- Collection Explorer: Categories including separates, gowns, jumpsuits, accessories, and favorites
- Bridal Style Guide: Browse by different bridal styles (boho, modern, classic, glamour, romantic, destination, courthouse, reception)
- User Authentication: Login/registration with JWT tokens
- Shopping Cart: Add items to cart for authenticated users
- Wedding Stories: Featured couple profiles and wedding stories
- Appointment Booking: Schedule consultations with stylists
- Stockist Finder: Locate nearby authorized retailers

Backend (Node.js/Express)
- MongoDB Integration: Database for users, products, appointments, reviews, and wedding stories
- RESTful API: Clean API endpoints for all functionality
- User Management: Profile management and cart functionality
- Product Catalog: Manage bridal collection with categories and styles
- Review System: Customer reviews and ratings
- Appointment System: Booking and management system

Getting Started

Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd CarolineBride
   ```

2. Install Backend Dependencies
   ```bash
   cd backend
   pip install flask
   ```

3. Install Frontend Dependencies
   ```bash
   cd ../frontend
   npm install
   ```

4. Environment Setup
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/carolinebride
   PORT=5000
   NODE_ENV=development
   ```

Running the Application

1. Start the Backend Server
   ```bash
   cd backend
   npm start
   ```
   Server runs on `http://localhost:5000`

2. Start the Frontend Development Server
   ```bash
   cd frontend
   npm start
   ```
   Application runs on `http://localhost:3000`

Design Philosophy

CarolineBride embodies luxury through:

- Color Palette: Gold (#D4AF37), Cream (#F8F6F0), and sophisticated neutrals
- Typography: Playfair Display for headings, Lato for body text, Dancing Script for script elements
- Animations: Subtle hover effects, smooth transitions, and elegant interactions
- Layout: Clean, spacious design with premium feel and attention to detail

Responsive Design

The application is fully responsive with breakpoints for:
- Mobile: < 768px
- Tablet: 768px - 968px  
- Desktop: > 968px

Navigation Structure

- Homepage: Hero video, collection explorer, bridal styles, wedding stories, reviews
- Shop: Product catalog with filtering and search
- Collections: Browse by category (separates, gowns, jumpsuits, accessories)
- Book Appointment: Schedule consultations
- About Us: Company story and values
- Contact: Get in touch form
- Profile: User account management (authenticated users)
- Cart: Shopping cart functionality (authenticated users)


Database Schema

 Users
- Personal information, authentication, cart items, preferences

 Products  
- Name, description, price, category, style, images, sizes, availability

 Appointments
- User booking information, dates, times, messages, status

 Reviews
- User feedback, ratings, comments, wedding stories

 Wedding Stories
- Couple profiles, wedding details, photos, dress information

 Stockists
- Authorized retailer locations and contact information

Future Enhancements

- Payment integration (Stripe/PayPal)
- Virtual try-on functionality
- Advanced product filtering
- Email notifications
- Admin dashboard
- Inventory management
- Multi-language support
- SEO optimization


Luxury Experience
CarolineBride is designed to provide a premium online experience that matches the luxury of high-end bridal boutiques, combining sophisticated design with modern functionality to create an unforgettable journey for every bride.# CarolineBride-Application-for-luxuary-Bridal-shop.
