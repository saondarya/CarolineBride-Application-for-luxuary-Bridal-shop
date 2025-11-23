import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiPlay, FiMapPin, FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';


const PageContainer = styled.div`
  padding-top: 80px;
  
  @media (max-width: 768px) {
    padding-top: 70px;
  }
`;

// Hero Section with Video
const HeroSection = styled.section`
  position: relative;
  height: 80vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.tertiary} 0%, 
    ${props => props.theme.colors.secondary} 50%, 
    ${props => props.theme.colors.champagne} 100%
  );
`;

const HeroVideo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.colors.dark};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${props => props.theme.transitions.medium};
  z-index: 1;
`;

const PlayButton = styled.div`
  width: 80px;
  height: 80px;
  background: ${props => props.theme.colors.accent};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  transition: ${props => props.theme.transitions.fast};
  box-shadow: 0 6px 25px rgba(107, 142, 35, 0.3);
  
  &:hover {
    background: ${props => props.theme.colors.deepOlive};
    transform: scale(1.1);
    box-shadow: 0 8px 30px rgba(107, 142, 35, 0.4);
  }
`;

const HeroContent = styled.div`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  color: #1c3b04ff;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(15, 15, 15, 0.8);
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  color:  #1b4b10ff;
  margin-bottom: 2rem;
  font-style: italic;
`;

// Collection Exploration Section
const ExploreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 400px;
  gap: 20px;
  max-width: 1400px;
  max-height:1000px;
  margin: 0 auto;

  & > a:nth-child(1) {
    grid-column: span 1; /* wide card */
  }

  & > a:nth-child(2) {
    grid-row: span 2; /* tall card */
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 400px;

    & > a:nth-child(1),
    & > a:nth-child(2) {
      grid-column: span 1;
      grid-row: span 1;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-auto-rows: 350px;
  }
`;


const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.dark};
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.gray};
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;


// Styled Components
const SectionWrapper = styled.section`
  padding: 6rem 2rem;
  background: #fff;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;



const CollectionCard = styled(Link)`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  background: url(${(props) => props.$image}) top center/cover no-repeat;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 1rem 1.2rem;
  background: rgba(255, 255, 255, 0.7);
  text-align: center;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: #222;
  margin: 0;
`;

const CardDescription = styled.p`
  font-size: 0.95rem;
  color: #444;
  margin: 0.3rem 0 0;
`;

// How to Become a Caroline Bride Section
const BecomeSection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.secondary} 0%, 
    ${props => props.theme.colors.tertiary} 50%,
    ${props => props.theme.colors.champagne} 100%
  );
`;

const BecomeGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const BecomeCard = styled.div`
  background: ${props => props.theme.colors.white};
  padding: 3rem;
  border-radius: 20px;
  box-shadow: ${props => props.theme.shadows.medium};
  text-align: center;
  transition: ${props => props.theme.transitions.medium};
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const BecomeIcon = styled.div`
  width: 80px;
  height: 80px;
  background: ${props => props.theme.colors.accent};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  font-size: 2rem;
  color: white;
  box-shadow: 0 6px 20px rgba(107, 142, 35, 0.3);
`;

const BecomeTitle = styled.h3`
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.dark};
`;

const BecomeDescription = styled.p`
  color: ${props => props.theme.colors.gray};
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const LuxuryButton = styled(Link)`
  display: inline-block;
  background: ${props => props.theme.colors.accent};
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: ${props => props.theme.transitions.fast};
  box-shadow: 0 4px 15px rgba(107, 142, 35, 0.2);
  
  &:hover {
    background: ${props => props.theme.colors.deepOlive};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(107, 142, 35, 0.4);
  }
`;

// Bridal Styles Section
const StylesSection = styled.section`
  padding: 6rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
`;

const StylesHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const MoreStylesLink = styled(Link)`
  color: ${props => props.theme.colors.accent};
  text-decoration: none;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: ${props => props.theme.transitions.fast};
  
  &:hover {
    color: ${props => props.theme.colors.deepOlive};
    transform: translateX(2px);
  }
`;

const CarouselArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => (props.$left ? 'left: 10px;' : 'right: 10px;')}
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.1);
  background: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.soft};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  z-index: 3;
  
  &:hover {
    transform: translateY(-50%) scale(1.05);
  }
`;

const Dots = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  margin-top: 1.25rem;
`;

const Dot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${props => (props.$active ? props.theme.colors.primary : 'rgba(0,0,0,0.2)')};
  cursor: pointer;
`;

const StylesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4,1fr);
  margin: 2rem 0;
  gap: 1.5rem;
`;

const StyleCard = styled(Link)`
  position: relative;
  height: 430px;
  overflow: hidden;
  text-decoration: none;
  background-image: ${(props) => props.$image ? `url(${props.$image})` : 'none'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: ${(props) => props.$image ? 'transparent' : 'linear-gradient(135deg, #8FBC8F 0%, #F7F8F5 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${props => props.theme.transitions.medium};
  box-shadow: ${props => props.theme.shadows.soft};
  border: 1px solid rgba(143, 188, 143, 0.2);
  
  &:hover {
    transform: scale(1.05);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;


const StyleTitle = styled.div`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.2rem;
  color: white;
  text-align: center;
  font-weight: 500;
  background: rgba(0, 0, 0, 0.5);
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

// Our Brides Section
const BridesSection = styled.section`
  padding: 6rem 2rem;
  background: url(${(props) => props.$image}) top center/cover no-repeat;
`;

const BridesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const BrideCard = styled(Link)`
  background: ${props => props.theme.colors.white};
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  box-shadow: ${props => props.theme.shadows.medium};
  transition: ${props => props.theme.transitions.medium};
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.theme.shadows.strong};
  }
`;

const BrideImage = styled.div`
  height: 300px;
  background: url(${props => props.image}) top center/cover no-repeat;
`;


const BrideContent = styled.div`
  padding: 2rem;
`;

const BrideNames = styled.h4`
  color: ${props => props.theme.colors.dark};
  margin-bottom: 0.5rem;
`;

const BrideStory = styled.p`
  color: ${props => props.theme.colors.gray};
  font-size: 0.95rem;
  line-height: 1.5;
`;

// Our Story Section
const StorySection = styled.section`
  padding: 6rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
`;

const StoryContent = styled.div`
  background: ${props => props.theme.colors.white};
  padding: 4rem;
  border-radius: 30px;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const StoryTitle = styled.h2`
  color: ${props => props.theme.colors.dark};
  margin-bottom: 2rem;
`;

const StoryText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.gray};
  margin-bottom: 1.5rem;
`;

const ScriptText = styled.span`
  font-family: ${props => props.theme.fonts.script};
  font-size: 1.3em;
  color: ${props => props.theme.colors.primary};
`;

// Reviews Section
const ReviewsSection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.secondary} 0%, 
    ${props => props.theme.colors.rose} 100%
  );
`;

const ReviewsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ReviewCard = styled.div`
  background: ${props => props.theme.colors.white};
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: ${props => props.theme.shadows.medium};
  text-align: center;
`;

const Stars = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ReviewText = styled.p`
  font-style: italic;
  color: ${props => props.theme.colors.gray};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ReviewerName = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.dark};
`;

const HomePage = () => {
  const collections = [
    {
      title: "Separates",
      description: "Mix and match pieces for your perfect look",
      link: "/shop?category=separates",
      image: "images/Bride_seperates.jpg",
    },
    {
      title: 'Gowns',
      description: 'Timeless elegance for your special day',
      link: '/shop?category=gowns',
      image: "images/gowns.jpg",
    },
    {
      title: 'Our Favourites',
      description: 'Handpicked pieces we absolutely adore',
      link: '/shop?featured=true',
      image: "images/fav.jpeg",
    },
    {
      title: 'Jumpsuits',
      description: 'Modern sophistication redefined',
      link: '/shop?category=jumpsuits',
      image: "images/jumpsuits.jpg",
    },
    {
      title: 'Accessories',
      description: 'Perfect finishing touches',
      link: '/shop?category=accessories',
      image: "images/accessories.jpeg",
    }
  ];

  const bridalStyles = [
    { name: 'Boho Bride', link: '/shop?style=boho', image: "/images/boho.jpg" },
    { name: 'Separates', link: '/shop?category=separates', image: "/images/Bride_seperates.jpg" },
    { name: 'Modern Bride', link: '/shop?style=modern', image: "/images/modern.jpg" },
    { name: 'Classic Bride', link: '/shop?style=classic', image: "/images/classic.jpg" },
    { name: 'Glamour Bride', link: '/shop?style=glamour', image: "/images/glamour_bride.jpg" },
    { name: 'Romantic Bride', link: '/shop?style=romantic', image: "/images/romantic_bride.jpg" },
    { name: 'Destination Bride', link: '/shop?style=destination', image: "/images/destination.jpg" },
    { name: 'Court House Bride', link: '/shop?style=courthouse', image: "/images/courthouse.jpg" },
    { name: 'Reception Bride', link: '/shop?style=reception', image: "/images/reception.jpg" }
  ];

  const couples = [
    {
      names: 'Emma & James',
      story: 'A dreamy garden wedding with our signature lace gown...',
      link: '/wedding-story/1',
      image: "/images/emma_and_james.jpg"
    },
    {
      names: 'Sophia & Michael',
      story: 'An intimate ceremony by the sea with modern separates...',
      link: '/wedding-story/2',
      image: "/images/sophia_and_michael.jpg"
    },
    {
      names: 'Isabella & David',
      story: 'A glamorous ballroom celebration in our luxury collection...',
      link: '/wedding-story/3',
      image: "/images/isabella_and_david.jpg"
      
    }
  ];
function BridalStylesSection() {
  return (
    <StylesSection>
      <StylesGrid>
        {bridalStyles.map((style, index) => (
          <StyleCard 
            key={index} 
            to={style.link} 
            $image={style.image}   // ✅ pass image here
          >
            <StyleTitle>{style.name}</StyleTitle>
          </StyleCard>
        ))}
      </StylesGrid>
    </StylesSection>
  );
}

  const reviews = [
    {
      text: "CarolineBride made my dreams come true. The attention to detail and luxury quality is unmatched.",
      name: "Sarah Thompson",
      stars: "★★★★★"
    },
    {
      text: "From consultation to alterations, the entire experience was seamless and luxurious.",
      name: "Emily Rodriguez",
      stars: "★★★★★"
    },
    {
      text: "The most beautiful gown and incredible service. I felt like a princess on my wedding day.",
      name: "Charlotte Davis",
      stars: "★★★★★"
    }
  ];

  const [styleStartIndex, setStyleStartIndex] = useState(0);
  const totalStyles = bridalStyles.length;
  const visibleStyles = Array.from({ length: 4 }, (_, i) => bridalStyles[(styleStartIndex + i) % totalStyles]);

  const goPrevStyles = () => {
    setStyleStartIndex((prev) => (prev - 1 + totalStyles) % totalStyles);
  };

  const goNextStyles = () => {
    setStyleStartIndex((prev) => (prev + 1) % totalStyles);
  };

  return (
    <PageContainer>
      {/* Hero Section with Video */}
      <HeroSection>
        <HeroVideo>
          <video autoPlay loop muted playsInline>
            <source src="/images/video.mp4" type="video/mp4" />
          </video>
          <PlayButton>
            <FiPlay />
          </PlayButton>
        </HeroVideo>
        <HeroContent>
          <HeroTitle>Latest Bride Gown Design</HeroTitle>
          <HeroSubtitle>Discover our newest luxury collection</HeroSubtitle>
        </HeroContent>
      </HeroSection>

      {/* Explore Collection Section */}
    <SectionWrapper>
      <SectionHeader>
        <SectionTitle>Explore <ScriptText>CarolineBride</ScriptText> Collections</SectionTitle>
        <SectionSubtitle>
          Discover timeless gowns, separates, and accessories crafted for your
          moments.
        </SectionSubtitle>
      </SectionHeader>

      <ExploreGrid>
        {collections.map((collection, index) => (
          <CollectionCard
            key={index}
            to={collection.link}
            $image={collection.image}
          >
            <CardOverlay>
              <CardTitle>{collection.title}</CardTitle>
              <CardDescription>{collection.description}</CardDescription>
            </CardOverlay>
          </CollectionCard>
        ))}
      </ExploreGrid>
    </SectionWrapper>

      {/* How to Become a Caroline Bride */}
      <BecomeSection>
        <SectionTitle>How to Become a <ScriptText>Caroline Bride</ScriptText></SectionTitle>
        <SectionSubtitle>Your journey to the perfect gown begins here</SectionSubtitle>
        
        <BecomeGrid>
          <BecomeCard>
            <BecomeIcon>
              <FiCalendar />
            </BecomeIcon>
            <BecomeTitle>Book an Appointment</BecomeTitle>
            <BecomeDescription>
              Schedule a private consultation with our expert stylists to discover your perfect look.
            </BecomeDescription>
            <LuxuryButton to="/appointment">Book Now</LuxuryButton>
          </BecomeCard>
          
          <BecomeCard>
            <BecomeIcon>
              <FiMapPin />
            </BecomeIcon>
            <BecomeTitle>Find a Stockist</BecomeTitle>
            <BecomeDescription>
              Locate authorized CarolineBride stockists near you for an in-person experience.
            </BecomeDescription>
            <LuxuryButton to="/contact">Find Stockist</LuxuryButton>
          </BecomeCard>
        </BecomeGrid>
      </BecomeSection>

      {/* Shop by Bridal Style */}
      <StylesSection>
        <StylesHeaderRow>
          <SectionTitle>Shop by Bridal Style</SectionTitle>
        </StylesHeaderRow>
        <SectionSubtitle>Find your signature look from our curated styles</SectionSubtitle>
        
        <CarouselArrow aria-label="Previous styles" onClick={goPrevStyles} $left>
          <FiChevronLeft />
        </CarouselArrow>
        <CarouselArrow aria-label="Next styles" onClick={goNextStyles}>
          <FiChevronRight />
        </CarouselArrow>

        <StylesGrid>
          {visibleStyles.map((style, index) => (
          <StyleCard key={index} to={style.link} $image={style.image}>
              <StyleTitle>{style.name}</StyleTitle>
            </StyleCard>
          ))}
        </StylesGrid>
        <Dots>
          {bridalStyles.map((_, i) => (
            <Dot
              key={i}
              aria-label={`Go to styles starting at ${i + 1}`}
              $active={i === styleStartIndex}
              onClick={() => setStyleStartIndex(i)}
            />
          ))}
        </Dots>
      </StylesSection>

      {/* Our Brides Section */}
      <BridesSection>
        <SectionTitle>Our <ScriptText>Brides</ScriptText></SectionTitle>
        <SectionSubtitle>Celebrating love stories in CarolineBride</SectionSubtitle>
        
        <BridesGrid>
          {couples.map((couple, index) => (
            <BrideCard key={index} to={couple.link}>
              <BrideImage image={couple.image} /> 
              <BrideContent>
                <BrideNames>{couple.names}</BrideNames>
                <BrideStory>{couple.story}</BrideStory>
              </BrideContent>
            </BrideCard>
          ))}
        </BridesGrid>
      </BridesSection>

      {/* Our Story Section */}
      <StorySection>
        <StoryContent>
          <StoryTitle>Our <ScriptText>Story</ScriptText></StoryTitle>
          <StoryText>
            Founded with a passion for creating unforgettable bridal experiences, 
            <ScriptText> CarolineBride</ScriptText> has been crafting luxury wedding gowns 
            that embody elegance, sophistication, and timeless beauty.
          </StoryText>
          <StoryText>
            Each piece in our collection is meticulously designed and crafted using the finest materials, 
            ensuring that every bride feels extraordinary on her special day. From intimate ceremonies to 
            grand celebrations, we create gowns that tell your unique love story.
          </StoryText>
          <StoryText>
            Our commitment to luxury, attention to detail, and personalized service has made us 
            the destination of choice for discerning brides who demand nothing but the best.
          </StoryText>
        </StoryContent>
      </StorySection>

      {/* Reviews Section */}
      <ReviewsSection>
        <SectionTitle>What Our <ScriptText>Brides</ScriptText> Say</SectionTitle>
        
        <ReviewsGrid>
          {reviews.map((review, index) => (
            <ReviewCard key={index}>
              <Stars>{review.stars}</Stars>
              <ReviewText>"{review.text}"</ReviewText>
              <ReviewerName>- {review.name}</ReviewerName>
            </ReviewCard>
          ))}
        </ReviewsGrid>
      </ReviewsSection>
    </PageContainer>
  );
};

export default HomePage;