import React from 'react';
import styled from 'styled-components';
import AppointmentForm from '../components/AppointmentForm';

const PageContainer = styled.div`
  padding: 6rem 1rem 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.dark} 0%, 
    ${props => props.theme.colors.deepOlive} 50%,
    ${props => props.theme.colors.accent} 100%
  );
  color: ${props => props.theme.colors.white};
  
  @media (min-width: 768px) {
    padding: 8rem 2rem 2rem;
  }
`;

const Title = styled.h1`
  color: #2e7d32;
  margin-bottom: 1.5rem;
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Button = styled.button`
  padding: 0.8rem 2rem;
  margin: 0.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Playfair Display', serif;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
`;

const LoginButton = styled(Button)`
  background-color: #2e7d32;
  color: white;
  
  &:hover {
    background-color: #1b5e20;
  }
`;

const RegisterButton = styled(Button)`
  background-color: transparent;
  color: #2e7d32;
  border: 2px solid #2e7d32;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const Message = styled.p`
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 1rem;
  }
`;

const AppointmentPage = () => {
  // Directly show the appointment form without login check
  return (
    <PageContainer>
      <AppointmentForm />
    </PageContainer>
  );
};

export default AppointmentPage;