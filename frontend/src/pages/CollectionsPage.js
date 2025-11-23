import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BRIDAL_LOOKS } from '../data/products';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.white};
`;

const HeroSection = styled.section`
  padding: 8rem 2rem 5rem;
  text-align: center;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.secondary} 0%, 
    ${props => props.theme.colors.white} 100%
  );
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    padding: 6rem 1.5rem 4rem;
  }
`;

const MainTitle = styled.h1`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 4rem;
  font-weight: 400;
  letter-spacing: 3px;
  text-transform: none;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 1.5rem;
  line-height: 1.2;
  font-style: italic;
  
  @media (max-width: 768px) {
    font-size: 2.8rem;
    letter-spacing: 2px;
  }
`;

const Subtitle = styled.p`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.1rem;
  color: ${props => props.theme.colors.gray};
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const CollectionsSection = styled.section`
  width: 100%;
  margin: 0;
  padding: 2rem 0;
  box-sizing: border-box;
`;

const SectionTitle = styled.h2`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 2.5rem;
  font-weight: 400;
  text-align: center;
  margin-bottom: 3rem;
  color: ${props => props.theme.colors.dark};
  position: relative;
  padding-bottom: 1rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 2px;
    background: ${props => props.theme.colors.primary};
  }
`;

const CollectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const CustomGridRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr; /* Separates smaller, Accessories larger */
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const CollectionItem = styled.div`
  position: relative;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background: linear-gradient(135deg, 
    rgba(143, 188, 143, 0.1) 0%, 
    rgba(240, 242, 236, 0.8) 100%
  );
  border: 1px solid rgba(143, 188, 143, 0.2);
  transition: all ${props => props.theme.transitions.medium};
  box-shadow: ${props => props.theme.shadows.soft};
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.theme.shadows.medium};
    
    .collection-overlay {
      opacity: 1;
    }
    
    .collection-image {
      transform: scale(1.05);
    }
  }
`;

const CollectionImage = styled.div`
  width: 100%;
  height: 350px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: top;
  background-color: ${props => props.theme.colors.lightGray};
  position: relative;

`;

const CollectionOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity ${props => props.theme.transitions.medium};
  z-index: 2;
`;

const CollectionTitle = styled.h3`
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.8rem;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${props => props.theme.colors.dark};
  z-index: 3;
  text-align: center;
  background: rgba(255, 255, 255, 0.95);
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(143, 188, 143, 0.2);
  white-space: nowrap;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 0.6rem 1.2rem;
  }
`;

const PlaceholderIcon = styled.div`
  font-size: 4rem;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(143, 188, 143, 0.3);
  z-index: 2;
  position: relative;
  filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.2));
`;

const CollectionCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  transition: all 0.3s ease;
  border: 1px solid #e0f2e1;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 0;
  width: 100%;
  max-width: 100%;
  
  @media (min-width: 768px) {
    grid-column: ${props => props.wide ? 'span 1.5' : 'auto'};
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    border-color: #c8e6c9;
  }
`;

const CollectionCardImage = styled.div`
  width: 100%;
  height: 300px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  margin: -1.5rem -1.5rem 1.5rem -1.5rem;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 100%);
  }
  
  ${CollectionCard}:hover & {
    transform: scale(1.02);
  }
`;

const CollectionsPage = () => {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);

  const bridalCollections = [
    {
      id: 'modern',
      title: 'Modern Muse',
      subtitle: 'Bridal Collection',
      description: 'Sleek, contemporary designs for the fashion-forward bride',
      imageUrl: '/images/modern.jpg',
      items: ['Clean lines', 'Minimalist details', 'Architectural silhouettes', 'Unexpected cutouts'],
      accentColor: '#2e7d32',
      filterValue: 'modern'
    },
    {
      id: 'glamour',
      title: 'The Luxe',
      subtitle: 'Bride Collection',
      description: 'Opulent designs with exquisite detailing',
      imageUrl: '/images/shopby/JewelJacket.jpg',
      items: ['Crystal embellishments', 'Beaded lace', 'Dramatic trains', 'Royal silhouettes'],
      accentColor: '#2e7d32',
      filterValue: 'glamour'
    },
    {
      id: 'romantic',
      title: 'Opulent Aura',
      subtitle: 'Bridal Collection',
      description: 'Romantic designs with dreamy details',
      imageUrl: '/images/shopby/seraphina.jpg',
      items: ['Delicate lace', 'Soft tulle', 'Floral appliqués', 'Illusion details'],
      accentColor: '#2e7d32',
      filterValue: 'romantic'
    },
    {
      id: 'boho',
      title: 'Velvet Vows',
      subtitle: 'Collection',
      description: 'Free-spirited designs with vintage charm',
      imageUrl: '/images/shopby/Aria_Jumpsuit.jpg',
      items: ['Flowing silhouettes', 'Lace details', 'Floral crowns', 'Ethereal layers'],
      accentColor: '#2e7d32',
      filterValue: 'boho'
    },
    {
      id: 'classic',
      title: 'Enchanted Eve',
      subtitle: 'Bridal Collection',
      description: 'Timeless elegance with modern sophistication',
      imageUrl: '/images/shopby/luna.jpg',
      items: ['A-line silhouettes', 'Sweetheart necklines', 'Chapel trains', 'Pearl details'],
      accentColor: '#2e7d32',
      filterValue: 'classic'
    }
  ];

  const handleCollectionClick = (filterValue) => {
    navigate(`/shop?bridalLook=${filterValue}`);
  };

  const collectionRows = [
    [
      {
        id: 1,
        title: 'Wedding Gowns',
        icon: '👰',
        description: 'Elegant and timeless bridal gowns',
        backgroundImage: `radial-gradient(circle at 20% 80%, rgba(245, 245, 220, 0.6) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(250, 240, 230, 0.5) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(255, 248, 240, 0.4) 0%, transparent 50%),
          linear-gradient(135deg, #f5f5dc 0%, #faf0e6 50%, #fff8f0 100%)`
      }
    ],
    // Row 2: Separates and Accessories
    [
      {
        id: 2,
        title: 'Bridal Separates',
        icon: '👗',
        description: 'Mix and match pieces for your perfect look',
        backgroundImage: `conic-gradient(from 45deg at 25% 75%, rgba(243, 229, 171, 0.3) 0deg, transparent 60deg),
          conic-gradient(from 225deg at 75% 25%, rgba(238, 214, 119, 0.4) 0deg, transparent 60deg),
          linear-gradient(45deg, #f3e5ab 0%, #eed677 50%, #ebce87 100%)`
      },
      {
        id: 3,
        title: 'Accessories',
        icon: '✨',
        description: 'Complete your bridal ensemble',
        backgroundImage: `repeating-radial-gradient(circle at 30% 30%, 
          rgba(221, 184, 146, 0.3) 0px, transparent 15px, rgba(210, 180, 140, 0.2) 30px),
          repeating-radial-gradient(circle at 70% 70%, 
          rgba(205, 175, 149, 0.2) 0px, transparent 20px),
          linear-gradient(135deg, #ddb892 0%, #d2b48c 50%, #cdaf95 100%)`
      }
    ]
  ];

  return (
    <PageContainer>
      <HeroSection>
        <MainTitle>Explore CarolineBride Collection</MainTitle>
        <Subtitle>
          From wedding dresses to bridal separates, discover our world of affordable luxury
        </Subtitle>
      </HeroSection>
      
      <CollectionsSection>
        <SectionTitle>Bridal Collections</SectionTitle>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          margin: '0 auto',
          width: '100%',
          maxWidth: '1600px',
          padding: '0 2rem',
          boxSizing: 'border-box',
          '& > :nth-child(n+4)': {
            gridColumn: 'span 1.5'
          }
        }}>
          {bridalCollections.map((collection) => {
            const look = BRIDAL_LOOKS.find(look => look.value === collection.filterValue) || {};
            return (
              <CollectionCard 
                key={collection.id}
                wide={bridalCollections.indexOf(collection) >= 3}
                backgroundImage={collection.backgroundImage}
                accentColor={collection.accentColor}
                onClick={() => handleCollectionClick(collection.filterValue)}
              >
              <CollectionImage 
                image={collection.imageUrl}
                title={`${collection.title} - ${collection.subtitle}`}
              />

                <h3 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.8rem',
                  color: collection.accentColor,
                  margin: '0 0 0.5rem',
                  fontWeight: '500',
                  textAlign: 'center'
                }}>
                  {collection.title}
                </h3>
                <p style={{
                  textAlign: 'center',
                  color: '#666',
                  marginBottom: '1.5rem',
                  fontStyle: 'italic',
                  fontSize: '0.9rem'
                }}>
                  {look.label || collection.subtitle}
                </p>
                <p style={{
                  textAlign: 'center',
                  color: '#555',
                  marginBottom: '1.5rem',
                  minHeight: '40px',
                  flexGrow: 1
                }}>
                  {collection.description}
                </p>
                <div style={{
                  borderTop: `1px dashed ${collection.accentColor}40`,
                  paddingTop: '1rem',
                  marginTop: 'auto'
                }}>
                  <p style={{
                    fontWeight: '500',
                    marginBottom: '0.75rem',
                    color: collection.accentColor,
                    textAlign: 'center'
                  }}>
                    Featured Styles:
                  </p>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    fontSize: '0.9rem',
                    color: '#555'
                  }}>
                    {collection.items.map((item, index) => (
                      <li 
                        key={index}
                        style={{
                          padding: '0.4rem 0',
                          borderBottom: `1px solid ${collection.accentColor}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center'
                        }}
                      >
                        <span style={{
                          display: 'inline-block',
                          width: '4px',
                          height: '4px',
                          backgroundColor: collection.accentColor,
                          borderRadius: '50%',
                          marginRight: '0.75rem',
                          flexShrink: 0
                        }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCollectionClick(collection.filterValue);
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      marginTop: '1rem',
                      padding: '0.75rem',
                      backgroundColor: 'transparent',
                      border: `1px solid ${collection.accentColor}`,
                      color: collection.accentColor,
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: collection.accentColor,
                        color: 'white'
                      }
                    }}
                  >
                    Shop {collection.title}
                  </button>
                </div>
              </CollectionCard>
            );
          })}
        </div>
      </CollectionsSection>
    </PageContainer>
  );
};

export default CollectionsPage;
