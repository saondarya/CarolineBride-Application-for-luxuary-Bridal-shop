import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config';

const PageContainer = styled.div`
  padding: 8rem 2rem 6rem;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background: ${props => props.theme.colors.champagne};
`;

const Card = styled.div`
  width: 100%;
  max-width: 1200px;
  background: #fffaf4;
  border-radius: 32px;
  box-shadow: ${props => props.theme.shadows.medium};
  padding: 3rem;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.dark};
  margin-bottom: 0.75rem;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.gray};
  margin-bottom: 2.5rem;
  font-size: 0.95rem;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1.1fr);
  gap: 2rem;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: 24px;
  padding: 1.75rem 1.5rem;
  max-height: 460px;
  overflow-y: auto;
`;

const SectionTitle = styled.h2`
  font-size: 1.15rem;
  margin-bottom: 1.25rem;
  color: ${props => props.theme.colors.dark};
`;

const Item = styled.div`
  padding: 0.75rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.tertiary};

  &:last-child {
    border-bottom: none;
  }
`;

const ItemTitle = styled.div`
  font-size: 0.96rem;
  font-weight: 500;
  color: ${props => props.theme.colors.dark};
`;

const ItemMeta = styled.div`
  font-size: 0.85rem;
  color: ${props => props.theme.colors.gray};
  margin-top: 0.2rem;
`;

const EmptyState = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.gray};
`;

const STATUS_OPTIONS = [
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'dispatched', label: 'Dispatched' },
  { value: 'completed', label: 'Completed' }
];

const AdminDashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const isAdmin = Boolean(user?.isAdmin);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) return;

    const fetchData = async () => {
      try {
        const [ordersRes, appointmentsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/admin/orders`),
          axios.get(`${API_BASE_URL}/admin/appointments`),
        ]);
        setOrders(ordersRes.data.orders || []);
        setAppointments(appointmentsRes.data.appointments || []);
        setError('');
      } catch {
        setError('Unable to load admin data. Please check your permissions.');
      }
    };

    fetchData();
  }, [isAuthenticated, isAdmin]);

  const handleStatusChange = async (orderId, status) => {
    try {
      setUpdatingOrderId(orderId);
      const res = await axios.patch(`${API_BASE_URL}/admin/orders/${orderId}`, {
        status,
      });
      const updated = res.data.order;
      setOrders(prev =>
        prev.map(order => (order._id === orderId ? updated : order))
      );
      setError('');
    } catch {
      setError('Unable to update order status right now.');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  if (!isAuthenticated || !isAdmin) {
    return (
      <PageContainer>
        <Card>
          <Title>Admin Access</Title>
          <Subtitle>
            This area is reserved for CarolineBride admin only. Please sign in
            with an admin account to view all orders and appointments.
          </Subtitle>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Card>
        <Title>Admin Dashboard</Title>
        <Subtitle>
          A consolidated view of every CarolineBride order and appointment.
        </Subtitle>

        {error && (
          <p style={{ color: '#b00020', fontSize: '0.9rem', marginBottom: '1rem' }}>
            {error}
          </p>
        )}

        <Layout>
          <Section>
            <SectionTitle>All Orders</SectionTitle>
            {orders.length === 0 ? (
              <EmptyState>No orders have been placed yet.</EmptyState>
            ) : (
              orders.map(order => (
                <Item key={order._id}>
                  <ItemTitle>
                    Total: £{(order.total || 0).toFixed(2)} ·{' '}
                    <select
                      value={order.status || 'confirmed'}
                      onChange={e => handleStatusChange(order._id, e.target.value)}
                      disabled={updatingOrderId === order._id}
                      style={{
                        border: '1px solid #ccc',
                        borderRadius: '6px',
                        padding: '0.2rem 0.5rem',
                        marginLeft: '0.5rem',
                        fontSize: '0.85rem',
                      }}
                    >
                      {STATUS_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {updatingOrderId === order._id && (
                      <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem' }}>
                        Saving...
                      </span>
                    )}
                  </ItemTitle>
                  <ItemMeta>
                    Items: {order.items?.length || 0}
                    {order.userId && ` · User ID: ${order.userId}`}
                  </ItemMeta>
                </Item>
              ))
            )}
          </Section>

          <Section>
            <SectionTitle>All Appointments</SectionTitle>
            {appointments.length === 0 ? (
              <EmptyState>No appointments have been booked yet.</EmptyState>
            ) : (
              appointments.map(app => (
                <Item key={app._id}>
                  <ItemTitle>
                    {app.name} · {app.service}
                  </ItemTitle>
                  <ItemMeta>
                    {app.date} at {app.time}
                    {app.email && ` · ${app.email}`}
                  </ItemMeta>
                </Item>
              ))
            )}
          </Section>
        </Layout>
      </Card>
    </PageContainer>
  );
};

export default AdminDashboardPage;


