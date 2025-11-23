import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiUser, FiShoppingBag, FiMenu, FiX, FiHeart } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${props => props.theme.colors.tertiary};
  transition: ${props => props.theme.transitions.fast};
  
  &.scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: ${props => props.theme.shadows.soft};
  }
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
    height: 70px;
  }
`;

const Logo = styled(Link)`
  font-family: ${props => props.theme.fonts.script};
  font-size: 2.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.accent};
  text-decoration: none;
  transition: ${props => props.theme.transitions.fast};
  text-shadow: 0 1px 3px rgba(139, 142, 35, 0.1);
  
  &:hover {
    transform: scale(1.05);
    color: ${props => props.theme.colors.deepOlive};
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  
  @media (max-width: 968px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 0.95rem;
  font-weight: 400;
  color: ${props => props.theme.colors.dark};
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  padding: 0.5rem 0;
  transition: ${props => props.theme.transitions.fast};
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: ${props => props.theme.colors.primary};
    transition: ${props => props.theme.transitions.fast};
  }
  
  &:hover {
    color: ${props => props.theme.colors.accent};
    
    &::after {
      width: 100%;
    }
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.dark};
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: ${props => props.theme.transitions.fast};
  position: relative;
  
  &:hover {
    background: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.accent};
  }
  
  .badge {
    position: absolute;
    top: 0;
    right: 0;
    background: ${props => props.theme.colors.accent};
    color: white;
    font-size: 0.7rem;
    padding: 0.2rem 0.4rem;
    border-radius: 50%;
    min-width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.dark};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  
  @media (max-width: 968px) {
    display: block;
  }
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: ${props => props.isOpen ? '0' : '-400px'};
  width: 400px;
  height: 100vh;
  background: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.strong};
  z-index: 1001;
  padding: 2rem;
  transition: ${props => props.theme.transitions.medium};
  overflow-y: auto;
  
  @media (max-width: 480px) {
    width: 100vw;
    right: ${props => props.isOpen ? '0' : '-100vw'};
  }
`;

const SidebarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: ${props => props.isOpen ? '1' : '0'};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: ${props => props.theme.transitions.medium};
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.tertiary};
`;

const SidebarTitle = styled.h3`
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.dark};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.dark};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: ${props => props.theme.transitions.fast};
  
  &:hover {
    background: ${props => props.theme.colors.lightGray};
  }
`;

const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const SidebarLink = styled(Link)`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1rem;
  color: ${props => props.theme.colors.dark};
  text-decoration: none;
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  transition: ${props => props.theme.transitions.fast};
  
  &:hover {
    color: ${props => props.theme.colors.accent};
    padding-left: 1rem;
  }
`;

const UserSection = styled.div`
  padding: 1.5rem 0;
  border-top: 1px solid ${props => props.theme.colors.tertiary};
`;

const UserInfo = styled.div`
  margin-bottom: 1rem;
`;

const UserName = styled.div`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.2rem;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 0.5rem;
`;

const UserEmail = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.gray};
`;

const LogoutButton = styled.button`
  background: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 0.9rem;
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(107, 142, 35, 0.2);
  
  &:hover {
    background: ${props => props.theme.colors.deepOlive};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(107, 142, 35, 0.3);
  }
`;

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      if (!isAuthenticated) {
        setCartCount(0);
        return;
      }
      try {
        const res = await axios.get(`${API_BASE_URL}/cart`);
        const items = Array.isArray(res.data) ? res.data : res.data.items || [];
        const count = items.reduce(
          (sum, item) => sum + (item.quantity || 0),
          0
        );
        setCartCount(count);
      } catch {
        setCartCount(0);
      }
    };

    fetchCartCount();
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    setSidebarOpen(false);
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <Logo to="/">CarolineBride</Logo>
          
          <Navigation>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/collections">Collections</NavLink>
            <NavLink to="/appointment">Book Appointment</NavLink>
            <NavLink to="/about">About Us</NavLink>
            {user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}
            <NavLink to="/profile">My Profile</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </Navigation>
          
          <UserActions>
            <ActionButton onClick={toggleSidebar}>
              <FiHeart />
            </ActionButton>
            
            <ActionButton onClick={() => navigate('/cart')}>
              <FiShoppingBag />
              <span className="badge">{cartCount}</span>
            </ActionButton>
            
            <ActionButton onClick={toggleSidebar}>
              <FiUser />
            </ActionButton>
            
            <MobileMenuButton onClick={toggleSidebar}>
              <FiMenu />
            </MobileMenuButton>
          </UserActions>
        </HeaderContent>
      </HeaderContainer>
      
      <SidebarOverlay isOpen={sidebarOpen} onClick={closeSidebar} />
      
      <Sidebar isOpen={sidebarOpen}>
        <SidebarHeader>
          <SidebarTitle>Menu</SidebarTitle>
          <CloseButton onClick={closeSidebar}>
            <FiX />
          </CloseButton>
        </SidebarHeader>
        
        <SidebarNav>
          <SidebarLink to="/shop" onClick={closeSidebar}>Shop</SidebarLink>
          <SidebarLink to="/collections" onClick={closeSidebar}>Collections</SidebarLink>
          <SidebarLink to="/appointment" onClick={closeSidebar}>Book Appointment</SidebarLink>
          <SidebarLink to="/about" onClick={closeSidebar}>About Us</SidebarLink>
          <SidebarLink to="/profile" onClick={closeSidebar}>My Profile</SidebarLink>
          <SidebarLink to="/contact" onClick={closeSidebar}>Contact</SidebarLink>
        </SidebarNav>
        
        {isAuthenticated ? (
          <UserSection>
            <UserInfo>
              <UserName>Welcome, {user?.name}</UserName>
              <UserEmail>{user?.email}</UserEmail>
            </UserInfo>
            <SidebarLink to="/profile" onClick={closeSidebar}>My Profile</SidebarLink>
            <SidebarLink to="/cart" onClick={closeSidebar}>My Cart</SidebarLink>
            <br />
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </UserSection>
        ) : (
          <UserSection>
            <SidebarLink to="/login" onClick={closeSidebar}>Login / Register</SidebarLink>
          </UserSection>
        )}
      </Sidebar>
    </>
  );
};

export default Header;