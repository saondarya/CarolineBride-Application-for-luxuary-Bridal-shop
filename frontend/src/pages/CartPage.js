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

const Title = styled.h1`
  color: ${props => props.theme.colors.dark};
  margin-bottom: 0.5rem;
  text-align: left;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.gray};
  margin-bottom: 2.5rem;
  font-size: 0.98rem;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
  gap: 2.5rem;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const ItemsList = styled.div`
  border-radius: 24px;
  background: ${props => props.theme.colors.white};
  padding: 1.75rem 1.5rem;
  max-height: 520px;
  overflow-y: auto;
`;

const ItemRow = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 0.7fr 1fr;
  gap: 1rem;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.tertiary};

  &:last-child {
    border-bottom: none;
  }
`;

const ItemName = styled.div`
  font-size: 0.97rem;
  color: ${props => props.theme.colors.dark};
`;

const ItemMeta = styled.div`
  font-size: 0.85rem;
  color: ${props => props.theme.colors.gray};
`;

const Qty = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.dark};
`;

const Price = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  text-align: right;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: ${props => props.theme.colors.gray};
  font-size: 0.98rem;
`;

const SummaryCard = styled.div`
  border-radius: 24px;
  background: ${props => props.theme.colors.white};
  padding: 1.75rem 1.5rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  color: ${props => props.theme.colors.dark};
`;

const SummaryLabel = styled.span`
  color: ${props => props.theme.colors.gray};
`;

const SummaryValue = styled.span`
  font-weight: 600;
`;

const TotalRow = styled(SummaryRow)`
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.tertiary};
  font-size: 1.05rem;
`;

const Button = styled.button`
  width: 100%;
  margin-top: 1.75rem;
  padding: 0.9rem 1.2rem;
  border-radius: 999px;
  border: none;
  background: ${props => props.theme.colors.accent};
  color: white;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    background: ${props => props.theme.colors.deepOlive};
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.soft};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const CartPage = () => {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchCart = async () => {
    if (!isAuthenticated) {
      setItems([]);
      setTotal(0);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/cart`);
      const cartItems = Array.isArray(res.data) ? res.data : res.data.items || [];
      const cartTotal = cartItems.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
        0
      );
      setItems(cartItems);
      setTotal(cartTotal);
      setError('');
    } catch (err) {
      setError('Unable to load your cart right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const handleCheckout = async () => {
    if (!items.length) return;
    try {
      setSaving(true);
      await axios.post(`${API_BASE_URL}/orders`, {
        items,
        total,
      });
      alert('Thank you. Your order has been noted by CarolineBride.');
    } catch (err) {
      setError('Unable to place your order. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageContainer>
      <Card>
        <Title>Your Bridal Selections</Title>
        <Subtitle>
          Review your curated pieces before confirming your order. Your cart and
          bill are saved securely to your CarolineBride profile.
        </Subtitle>

        <Layout>
          <ItemsList>
            {loading ? (
              <EmptyState>Loading your cart...</EmptyState>
            ) : !isAuthenticated ? (
              <EmptyState>
                Please log in to view your saved cart and billing details.
              </EmptyState>
            ) : items.length === 0 ? (
              <EmptyState>
                Your cart is waiting to be filled with something beautiful.
              </EmptyState>
            ) : (
              items.map(item => (
                <ItemRow key={`${item.productId}-${item.size || 'default'}`}>
                  <div>
                    <ItemName>{item.name}</ItemName>
                    <ItemMeta>
                      {item.size && <>Size {item.size} · </>}
                      £{item.price.toFixed(2)} each
                    </ItemMeta>
                  </div>
                  <Qty>Qty {item.quantity}</Qty>
                  <Price>£{(item.price * item.quantity).toFixed(2)}</Price>
                </ItemRow>
              ))
            )}
          </ItemsList>

          <SummaryCard>
            <SummaryRow>
              <SummaryLabel>Items</SummaryLabel>
              <SummaryValue>
                {items.reduce((sum, i) => sum + (i.quantity || 0), 0)}
              </SummaryValue>
            </SummaryRow>
            <SummaryRow>
              <SummaryLabel>Subtotal</SummaryLabel>
              <SummaryValue>£{total.toFixed(2)}</SummaryValue>
            </SummaryRow>
            <SummaryRow>
              <SummaryLabel>Luxury service</SummaryLabel>
              <SummaryValue>Complimentary</SummaryValue>
            </SummaryRow>
            <TotalRow>
              <SummaryLabel>Total</SummaryLabel>
              <SummaryValue>£{total.toFixed(2)}</SummaryValue>
            </TotalRow>

            {error && (
              <p
                style={{
                  marginTop: '1rem',
                  fontSize: '0.9rem',
                  color: '#b00020',
                }}
              >
                {error}
              </p>
            )}

            <Button
              onClick={handleCheckout}
              disabled={!items.length || saving || !isAuthenticated}
            >
              {saving ? 'Confirming your order...' : 'Confirm Order'}
            </Button>
          </SummaryCard>
        </Layout>
      </Card>
    </PageContainer>
  );
};

export default CartPage;
