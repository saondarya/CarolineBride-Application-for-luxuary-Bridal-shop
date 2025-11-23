import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
  padding: 6rem 2rem 4rem;
  max-width: 1000px;
  margin: 0 auto;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.dark};
  text-align: center;
  margin-bottom: 3rem;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 2.5rem;
  font-weight: 400;
`;

const Content = styled.div`
  text-align: justify;
  line-height: 1.8;
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 4rem;
  
  p {
    margin-bottom: 1.5rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

// Story Section
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
  font-family: ${props => props.theme.fonts.primary};
  font-size: 2.2rem;
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
  display: block;
  margin: 2rem 0;
`;

// Couples Grid
const CouplesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const CoupleCard = styled(Link)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.soft};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const CoupleImage = styled.div`
  width: 100%;
  height: 250px;
  background-size: cover;
  background-position: top center;
  background-color: #f5f5f5;
`;

const CoupleInfo = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

const CoupleNames = styled.h3`
  color: ${props => props.theme.colors.dark};
  margin-bottom: 0.5rem;
  font-family: ${props => props.theme.fonts.primary};
`;

const CoupleStory = styled.p`
  color: ${props => props.theme.colors.gray};
  font-size: 0.95rem;
  margin-bottom: 1rem;
`;

const ReadMore = styled.span`
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
  font-size: 0.9rem;
`;

// Couples data
const couples = [
  {
    names: 'Nicole & Lewis',
    story: 'Barefoot vows on a Greek shoreline with sun‑kissed CarolineBride separates.',
    link: '/wedding-story/1',
    image: "/images/emma_and_james.jpg"
  },
  {
    names: 'Sophia & Michael',
    story: 'A modern Tuscan celebration in a sculpted crepe gown and pearl‑dusted veil.',
    link: '/wedding-story/2',
    image: "/images/sophia_and_michael.jpg"
  },
  {
    names: 'Isabella & David',
    story: 'A grand London ballroom affair in a crystal‑embroidered couture ballgown.',
    link: '/wedding-story/3',
    image: "/images/isabella_and_david.jpg"
  },
  {
    names: 'Angella & Brown',
    story: 'A joy‑filled courtyard wedding wrapped in colour, music and soft lace.',
    link: '/wedding-story/4',
    image: "/images/angellaandBrown.jpg"
  }
];

const AboutPage = () => {
  return (
    <PageContainer>
      <Title>About Us</Title>
      <Content>
        <p>Welcome to CarolineBride, where luxury meets legacy in the world of bridal couture.
        We create masterpieces for brides who seek more than an outfit—those who desire an experience of elegance, grandeur, and timeless sophistication.
        Every ensemble in our collection is meticulously designed with the finest fabrics, handcrafted embellishments, and couture-level detailing. Our artisans blend royal aesthetics with contemporary finesse, ensuring each piece reflects unmatched craftsmanship and exclusivity.
        At CarolineBride, we believe a bridal outfit is not just worn—it is felt. It is a symbol of love, grace, and the beginning of a new chapter. That's why we work closely with each bride, understanding her vision and transforming it into a bespoke creation that exudes opulence and individuality.
        From magnificent lehengas to regal sarees and modern luxury gowns, every design is curated to make you feel extraordinary, confident, and unforgettable on your special day.
        Indulge in the art of couture.
        Embrace the elegance of exclusivity.
        Step into a world where your bridal dreams are crafted to perfection.</p>
      </Content>

      <StorySection>
        <StoryContent>
          <StoryTitle>Our Love Stories</StoryTitle>
          <StoryText>
            Every bride has a unique story, and we're honored to be part of so many beautiful journeys.
            Here are just a few of the love stories we've had the privilege to be part of.
          </StoryText>
          <ScriptText>Love stories begin here...</ScriptText>
          
          <CouplesGrid>
            {couples.map((couple, index) => (
              <CoupleCard key={index} to={couple.link}>
                <CoupleImage style={{ backgroundImage: `url(${couple.image})` }} />
                <CoupleInfo>
                  <CoupleNames>{couple.names}</CoupleNames>
                  <CoupleStory>{couple.story}</CoupleStory>
                  <ReadMore>Read their story →</ReadMore>
                </CoupleInfo>
              </CoupleCard>
            ))}
          </CouplesGrid>
        </StoryContent>
      </StorySection>
    </PageContainer>
  );
};

export default AboutPage;