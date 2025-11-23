import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CollectionsPage from './pages/CollectionsPage';
import AppointmentPage from './pages/AppointmentPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import WeddingStoryPage from './pages/WeddingStoryPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import FilteredResultsPage from './pages/FilteredResultsPage';
import { AuthProvider } from './context/AuthContext';

// Luxury Theme - Olive Collection
const luxuryTheme = {
  colors: {
    primary: '#8FBC8F', // Sage Green
    secondary: '#F7F8F5', // Soft ivory
    tertiary: '#E8F0E8', // Light sage
    accent: '#6B8E23', // Olive Drab
    dark: '#2F3E2F', // Dark Forest
    white: '#FFFFFF',
    lightGray: '#F5F5F5',
    gray: '#7A8471', // Muted olive gray
    rose: '#F0F2EC', // Pale sage
    champagne: '#F2F5ED', // Soft sage cream
    gold: '#B8A682', // Muted gold accent
    deepOlive: '#556B2F' // Deep olive
  },
  fonts: {
    primary: "'Playfair Display', serif",
    secondary: "'Lato', sans-serif",
    script: "'Dancing Script', cursive"
  },
  shadows: {
    soft: '0 4px 20px rgba(0,0,0,0.08)',
    medium: '0 8px 30px rgba(0,0,0,0.12)',
    strong: '0 15px 40px rgba(0,0,0,0.15)'
  },
  transitions: {
    fast: '0.3s ease',
    medium: '0.5s ease',
    slow: '0.8s ease'
  }
};

// Global Styles with luxury feeling
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700&family=Lato:wght@300;400;700&family=Dancing+Script:wght@400;500;600;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: ${props => props.theme.fonts.secondary};
    line-height: 1.6;
    color: ${props => props.theme.colors.dark};
    background: ${props => props.theme.colors.white};
    overflow-x: hidden;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.primary};
    font-weight: 400;
    letter-spacing: 0.5px;
  }
  
  h1 {
    font-size: 3.5rem;
    line-height: 1.2;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }
  
  h2 {
    font-size: 2.8rem;
    line-height: 1.3;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  h3 {
    font-size: 2.2rem;
    line-height: 1.3;
    
    @media (max-width: 768px) {
      font-size: 1.6rem;
    }
  }
  
  .luxury-script {
    font-family: ${props => props.theme.fonts.script};
    color: ${props => props.theme.colors.primary};
  }
  
  .fade-in {
    animation: fadeIn 1s ease-in;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .hover-gold:hover {
    color: ${props => props.theme.colors.primary} !important;
    transition: ${props => props.theme.transitions.fast};
  }
  
  // Smooth scrolling
  html {
    scroll-behavior: smooth;
  }
  
  // Selection styling
  ::selection {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, 
      ${props => props.theme.colors.white} 0%, 
      ${props => props.theme.colors.secondary} 50%, 
      ${props => props.theme.colors.champagne} 100%
    );
    opacity: 0.03;
    z-index: -1;
    pointer-events: none;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 0;
`;

function App() {
  return (
    <ThemeProvider theme={luxuryTheme}>
      <GlobalStyle />
      <AuthProvider>
        <Router>
          <AppContainer>
            <Header />
            <MainContent>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/collections" element={<CollectionsPage />} />
                <Route path="/results" element={<FilteredResultsPage />} />
                <Route path="/appointment" element={<AppointmentPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/stockists" element={<ContactPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/wedding-story/:id" element={<WeddingStoryPage />} />
                <Route path="/admin" element={<AdminDashboardPage />} />
              </Routes>
            </MainContent>
            <Footer />
          </AppContainer>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
