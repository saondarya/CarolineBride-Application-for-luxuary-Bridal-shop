import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiMail, FiInstagram, FiYoutube } from 'react-icons/fi';
import { FaPinterest } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.dark} 0%, 
    ${props => props.theme.colors.deepOlive} 50%,
    ${props => props.theme.colors.accent} 100%
  );
  color: ${props => props.theme.colors.white};
  padding: 4rem 0 2rem;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterSection = styled.div`
  h4 {
    font-family: ${props => props.theme.fonts.primary};
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
    color: ${props => props.theme.colors.gold};
  }
`;

const FooterLink = styled(Link)`
  display: block;
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
  transition: ${props => props.theme.transitions.fast};
  opacity: 0.9;
  
  &:hover {
    color: ${props => props.theme.colors.gold};
    opacity: 1;
    padding-left: 0.5rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border: 2px solid ${props => props.theme.colors.gold};
  border-radius: 50%;
  color: ${props => props.theme.colors.gold};
  text-decoration: none;
  font-size: 1.2rem;
  transition: ${props => props.theme.transitions.fast};
  background: rgba(184, 166, 130, 0.1);
  
  &:hover {
    background: ${props => props.theme.colors.gold};
    color: ${props => props.theme.colors.dark};
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(184, 166, 130, 0.3);
  }
`;

const Newsletter = styled.div`
  p {
    margin-bottom: 1rem;
    opacity: 0.9;
    line-height: 1.6;
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const EmailInput = styled.input`
  flex: 1;
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 30px;
  font-size: 0.9rem;
  outline: none;
  background: rgba(255, 255, 255, 0.1);
  color: ${props => props.theme.colors.white};
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    border-color: ${props => props.theme.colors.gold};
    background: rgba(255, 255, 255, 0.2);
  }
`;

const SubscribeButton = styled.button`
  background: ${props => props.theme.colors.gold};
  color: ${props => props.theme.colors.dark};
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  white-space: nowrap;
  font-weight: 600;
  
  &:hover {
    background: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.white};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(184, 166, 130, 0.3);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 2rem;
  text-align: center;
`;

const LogoFooter = styled.div`
  font-family: ${props => props.theme.fonts.script};
  font-size: 2rem;
  color: ${props => props.theme.colors.gold};
  margin-bottom: 1rem;
  text-shadow: 0 2px 8px rgba(184, 166, 130, 0.3);
`;

const Copyright = styled.p`
  margin: 0;
  opacity: 0.8;
  font-size: 0.9rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterTop>
          <FooterSection>
            <h4>Collections</h4>
            <FooterLink to="/collections?category=gowns">Wedding Gowns</FooterLink>
            <FooterLink to="/collections?category=separates">Separates</FooterLink>
            <FooterLink to="/collections?category=jumpsuits">Jumpsuits</FooterLink>
            <FooterLink to="/collections?category=accessories">Accessories</FooterLink>
            <FooterLink to="/collections?featured=true">Our Favourites</FooterLink>
          </FooterSection>
          
          <FooterSection>
            <h4>Services</h4>
            <FooterLink to="/appointment">Book Appointment</FooterLink>
            <FooterLink to="/stockists">Find a Stockist</FooterLink>
            <FooterLink to="/alterations">Alterations</FooterLink>
            <FooterLink to="/styling">Personal Styling</FooterLink>
            <FooterLink to="/virtual-try-on">Virtual Try-On</FooterLink>
          </FooterSection>
          
          <FooterSection>
            <h4>Support</h4>
            <FooterLink to="/faq">FAQ</FooterLink>
            <FooterLink to="/size-guide">Size Guide</FooterLink>
            <FooterLink to="/care-guide">Care Instructions</FooterLink>
            <FooterLink to="/returns">Returns & Exchanges</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
          </FooterSection>
          
          <FooterSection>
            <Newsletter>
              <h4>Stay Connected</h4>
              <p>Subscribe to receive the latest collections, exclusive offers, and bridal inspiration.</p>
              <NewsletterForm>
                <EmailInput 
                  type="email" 
                  placeholder="Enter your email" 
                  required 
                />
                <SubscribeButton type="submit">Subscribe</SubscribeButton>
              </NewsletterForm>
              <SocialLinks>
                <SocialLink href="mailto:info@carolinebride.com" aria-label="Email">
                  <FiMail />
                </SocialLink>
                <SocialLink href="https://instagram.com/carolinebride" aria-label="Instagram">
                  <FiInstagram />
                </SocialLink>
                <SocialLink href="https://youtube.com/carolinebride" aria-label="YouTube">
                  <FiYoutube />
                </SocialLink>
                <SocialLink href="https://pinterest.com/carolinebride" aria-label="Pinterest">
                  <FaPinterest />
                </SocialLink>
              </SocialLinks>
            </Newsletter>
          </FooterSection>
        </FooterTop>
        
        <FooterBottom>
          <LogoFooter>CarolineBride</LogoFooter>
          <Copyright>
            © 2024 CarolineBride. All rights reserved. | Privacy Policy | Terms of Service
          </Copyright>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;