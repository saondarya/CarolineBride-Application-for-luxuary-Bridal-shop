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
  max-width: 1100px;
  background: #fffaf4;
  border-radius: 32px;
  box-shadow: ${props => props.theme.shadows.medium};
  padding: 3rem;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2.5rem;
  gap: 1rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.dark};
  margin: 0;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.gray};
  margin: 0.25rem 0 0;
  font-size: 0.95rem;
`;

const Email = styled.p`
  color: ${props => props.theme.colors.gray};
  font-size: 0.9rem;
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
  max-height: 420px;
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

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchData = async () => {
      try {
        const [ordersRes, appointmentsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/orders`),
          axios.get(`${API_BASE_URL}/appointments`),
        ]);
        setOrders(ordersRes.data.orders || []);
        setAppointments(appointmentsRes.data.appointments || []);
      } catch {
        // fail silently for now
      }
    };

    fetchData();
  }, [isAuthenticated]);

  return (
    <PageContainer>
      <Card>
        <HeaderRow>
          <div>
            <Title>My Profile</Title>
            <Subtitle>
              Your saved orders and bridal appointments, curated in one place.
            </Subtitle>
          </div>
          {user && (
            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  fontWeight: 500,
                  color: '#2F3E2F',
                  marginBottom: '0.25rem',
                }}
              >
                {user.name}
              </div>
              <Email>{user.email}</Email>
            </div>
          )}
        </HeaderRow>

        {!isAuthenticated ? (
          <EmptyState>
            Please log in to view your orders and appointment history.
          </EmptyState>
        ) : (
          <Layout>
            <Section>
              <SectionTitle>Previous Orders</SectionTitle>
              {orders.length === 0 ? (
                <EmptyState>
                  Once you confirm an order, it will appear here with a full
                  summary of your pieces.
                </EmptyState>
              ) : (
                orders.map(order => (
                  <Item key={order._id}>
                    <ItemTitle>
                      Order total: £{(order.total || 0).toFixed(2)}
                    </ItemTitle>
                    <ItemMeta>
                      {order.items?.length || 0} items · Status:{' '}
                      {order.status || 'confirmed'}
                    </ItemMeta>
                  </Item>
                ))
              )}
            </Section>

            <Section>
              <SectionTitle>Appointments</SectionTitle>
              {appointments.length === 0 ? (
                <EmptyState>
                  Your future and past bridal appointments will be shown here.
                </EmptyState>
              ) : (
                appointments.map(app => (
                  <Item key={app._id}>
                    <ItemTitle>{app.service}</ItemTitle>
                    <ItemMeta>
                      {app.date} at {app.time} ·{' '}
                      {app.storeLocation || 'Atelier visit'}
                    </ItemMeta>
                  </Item>
                ))
              )}
            </Section>
          </Layout>
        )}
      </Card>
    </PageContainer>
  );
};

export default ProfilePage;
