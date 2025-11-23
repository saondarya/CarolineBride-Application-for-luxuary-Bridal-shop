import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaChevronDown, FaStore, FaMapMarkedAlt, FaShoppingBag } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config';

const FormContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem 2rem 4rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  width: calc(100% - 2rem);
  box-sizing: border-box;
  
  @media (max-width: 1200px) {
    max-width: 95%;
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1.25rem 3rem;
    margin: 1rem auto;
    width: calc(100% - 2rem);
  }
`;

const FormTitle = styled.h1`
  color: #000;
  text-align: center;
  margin-bottom: 0.5rem;
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FormSubtitle = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 3rem;
  font-size: 1.1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  background-color: #f9f9f9;
  color: #333;
  
  &::placeholder {
    color: #999;
  }
  
  &:focus {
    outline: none;
    border-color: #000;
    background-color: #fff;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.95rem;
  background-color: #f9f9f9;
  color: #333;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 0.7em top 50%;
  background-size: 0.65em auto;
  
  &::-ms-expand {
    display: none;
  }
  
  &:focus {
    outline: none;
    border-color: #000;
    background-color: #fff;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
  
  option {
    padding: 0.5rem;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
`;

const Button = styled.button`
  background-color: #000;
  color: white;
  border: none;
  padding: 1rem 4rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  font-family: 'Arial', sans-serif;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #333;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const PaymentMethod = styled.label`
  border: 1px solid ${props => props.selected ? '#000' : '#e0e0e0'};
  border-radius: 4px;
  padding: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.selected ? '#f5f5f5' : 'white'};
  margin: 0;
  
  &:hover {
    border-color: #999;
  }
`;

const Radio = styled.input`
  margin-right: 0.75rem;
  width: 18px;
  height: 18px;
  accent-color: #000;
  cursor: pointer;
`;

const AppointmentForm = () => {
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: 'Bridal Consultation',
    address: '',
    storeLocation: '',
    paymentMethod: 'cash',
    termsAccepted: false
  });
  
  const storeLocations = [
    {
      id: 'main',
      name: 'Main Store',
      address: '123 Fashion Street, City Center',
      icon: <FaStore />,
      hours: 'Mon-Sat: 10am - 8pm',
      phone: '(555) 123-4567'
    },
    {
      id: 'bridal-boutique',
      name: 'Bridal Boutique',
      address: '456 Wedding Lane, Downtown',
      icon: <FaShoppingBag />,
      hours: 'Tue-Sat: 11am - 7pm',
      phone: '(555) 234-5678'
    },
    {
      id: 'designer-studio',
      name: 'Designer Studio',
      address: '789 Couture Ave, Uptown',
      icon: <FaMapMarkedAlt />,
      hours: 'Wed-Sun: 10am - 6pm',
      phone: '(555) 345-6789'
    },
    {
      id: 'bridal-suite',
      name: 'Bridal Suite',
      address: '101 Bridal Way, Fashion District',
      icon: <FaStore />,
      hours: 'Mon-Fri: 10am - 7pm',
      phone: '(555) 456-7890'
    },
    {
      id: 'couture-house',
      name: 'Couture House',
      address: '202 Designers Row, Arts District',
      icon: <FaShoppingBag />,
      hours: 'Thu-Sun: 12pm - 8pm',
      phone: '(555) 567-8901'
    },
    {
      id: 'elite-bridal',
      name: 'Elite Bridal',
      address: '303 Luxury Lane, Uptown',
      icon: <FaMapMarkedAlt />,
      hours: 'Mon-Sat: 9am - 9pm',
      phone: '(555) 678-9012'
    }
  ];
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const services = [
    'Bridal Consultation',
    'Wedding Dress Fitting',
    'Bridal Accessories',
    'Custom Design',
    'Makeup Trial'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert('Please accept the terms and conditions');
      return;
    }
    if (!isAuthenticated) {
      alert('Please log in to book an appointment.');
      return;
    }
    try {
      setError('');
      await axios.post(`${API_BASE_URL}/appointments`, formData);
      setIsSubmitted(true);
    } catch (err) {
      setError('Unable to book your appointment right now. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <FormContainer>
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: '#f0f9f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
            fontSize: '48px',
            color: '#2e7d32'
          }}>
            ✓
          </div>
          <h2 style={{ 
            color: '#000', 
            marginBottom: '1rem',
            fontSize: '2rem',
            fontFamily: 'Playfair Display, serif',
            fontWeight: '500'
          }}>
            Thank You!
          </h2>
          <p style={{ 
            color: '#666', 
            marginBottom: '2.5rem',
            fontSize: '1.1rem',
            lineHeight: '1.6',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Your appointment has been booked successfully. We will contact you shortly to confirm your appointment.
          </p>
          <button 
            onClick={() => navigate('/')}
            style={{
              backgroundColor: '#000',
              color: 'white',
              border: 'none',
              padding: '1rem 2.5rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontFamily: 'sans-serif'
            }}
          >
            Back to Home
          </button>
        </div>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <FormTitle>Book an Appointment</FormTitle>
      <FormSubtitle>Please fill out the form below to book your appointment</FormSubtitle>
      
      <form onSubmit={handleSubmit}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <FormGroup>
            <Label><FaUser style={{ marginRight: '8px', color: '#999' }} />Full Name</Label>
            <Input 
              type="text" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <Label><FaPhone style={{ marginRight: '8px', color: '#999' }} />Phone Number</Label>
            <Input 
              type="tel" 
              name="phone" 
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <Label><FaEnvelope style={{ marginRight: '8px', color: '#999' }} />Email</Label>
            <Input 
              type="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <Label><FaMapMarkerAlt style={{ marginRight: '8px', color: '#999' }} />Address</Label>
            <Input 
              type="text" 
              name="address" 
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <Label style={{ marginBottom: '1rem' }}>Select Store Location</Label>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '1.25rem',
              marginTop: '0.5rem',
              width: '100%',
              boxSizing: 'border-box',
              '@media (max-width: 768px)': {
                gridTemplateColumns: '1fr',
                gap: '1rem'
              },
              '@media (max-width: 480px)': {
                gap: '0.75rem'
              }
            }}>
              {storeLocations.map(store => (
                <div 
                  key={store.id}
                  onClick={() => setFormData(prev => ({ ...prev, storeLocation: store.id }))}
                  style={{
                    border: `2px solid ${formData.storeLocation === store.id ? '#000' : '#e0e0e0'}`,
                    borderRadius: '8px',
                    padding: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: formData.storeLocation === store.id ? '#f9f9f9' : 'white',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    width: '100%',
                    boxSizing: 'border-box',
                    '@media (max-width: 480px)': {
                      padding: '0.75rem'
                    }
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: formData.storeLocation === store.id ? '#000' : '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: formData.storeLocation === store.id ? 'white' : '#666',
                    flexShrink: 0,
                    fontSize: '1.1rem'
                  }}>
                    {store.icon}
                  </div>
                  <div>
                    <div style={{ 
                      fontWeight: '500', 
                      marginBottom: '0.25rem',
                      color: formData.storeLocation === store.id ? '#000' : '#333'
                    }}>
                      {store.name}
                    </div>
                    <div style={{ 
                      fontSize: '0.85rem', 
                      color: formData.storeLocation === store.id ? '#555' : '#777',
                      lineHeight: '1.4',
                      marginBottom: '0.25rem'
                    }}>
                      {store.address}
                    </div>
                    <div style={{ 
                      fontSize: '0.8rem', 
                      color: formData.storeLocation === store.id ? '#666' : '#888',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.15rem',
                      wordBreak: 'break-word',
                      width: '100%'
                    }}>
                      <span>{store.hours}</span>
                      <span>{store.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FormGroup>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <FormGroup>
            <Label><FaCalendarAlt style={{ marginRight: '8px', color: '#999' }} />Date</Label>
            <Input 
              type="date" 
              name="date" 
              value={formData.date}
              onChange={handleChange}
              required 
              style={{ paddingRight: '1.5rem' }}
            />
          </FormGroup>
          
          <FormGroup>
            <Label><FaClock style={{ marginRight: '8px', color: '#999' }} />Time</Label>
            <Input 
              type="time" 
              name="time" 
              value={formData.time}
              onChange={handleChange}
              required 
              style={{ paddingRight: '1.5rem' }}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Service</Label>
            <div style={{ position: 'relative' }}>
              <Select 
                name="service" 
                value={formData.service}
                onChange={handleChange}
                style={{
                  appearance: 'none',
                  paddingRight: '2.5rem',
                  backgroundImage: 'none'
                }}
              >
                {services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </Select>
              <FaChevronDown style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#666',
                pointerEvents: 'none'
              }} />
            </div>
          </FormGroup>
        </div>
        
        <div style={{ margin: '2rem 0' }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            marginBottom: '1rem',
            color: '#333',
            fontWeight: '500',
            fontFamily: 'Playfair Display, serif'
          }}>
            Payment Method
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <PaymentMethod selected={formData.paymentMethod === 'cash'}>
              <Radio 
                type="radio" 
                name="paymentMethod" 
                value="cash" 
                checked={formData.paymentMethod === 'cash'}
                onChange={handleChange}
              />
              <div>
                <div style={{ fontWeight: '500' }}>Cash on Delivery</div>
              </div>
            </PaymentMethod>
            
            <PaymentMethod selected={formData.paymentMethod === 'card'}>
              <Radio 
                type="radio" 
                name="paymentMethod" 
                value="card" 
                checked={formData.paymentMethod === 'card'}
                onChange={handleChange}
              />
              <div>
                <div style={{ fontWeight: '500' }}>Credit/Debit Card</div>
              </div>
            </PaymentMethod>
            
            <PaymentMethod selected={formData.paymentMethod === 'upi'}>
              <Radio 
                type="radio" 
                name="paymentMethod" 
                value="upi" 
                checked={formData.paymentMethod === 'upi'}
                onChange={handleChange}
              />
              <div>
                <div style={{ fontWeight: '500' }}>UPI</div>
              </div>
            </PaymentMethod>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-start',
            margin: '1.5rem 0',
            padding: '1rem',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px'
          }}>
            <input 
              type="checkbox" 
              id="terms" 
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              style={{
                marginRight: '0.75rem',
                marginTop: '0.25rem',
                width: '18px',
                height: '18px',
                accentColor: '#000'
              }}
            />
            <label htmlFor="terms" style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.5' }}>
              I agree to the terms and conditions and privacy policy. I understand that my data will be processed in accordance with the privacy policy.
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
          <Button type="submit">
            Book Appointment
          </Button>
        </div>
        {error && (
          <p style={{ marginTop: '1rem', textAlign: 'center', color: '#b00020', fontSize: '0.9rem' }}>
            {error}
          </p>
        )}
      </form>
    </FormContainer>
  );
};

export default AppointmentForm;
