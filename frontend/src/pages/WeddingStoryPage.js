import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const PageContainer = styled.div`
  padding: 8rem 0 6rem;
  min-height: 100vh;
  background: ${props => props.theme.colors.champagne};
`;

const StoryWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  background: #fffaf4;
  border-radius: 32px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const HeroImage = styled.div`
  width: 100%;
  height: 500px;
  background-size: cover;
  background-position: center 20%;

  position: relative;

  @media (max-width: 768px) {
    height: 280px;
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.55)
  );
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 3rem 2rem;
`;

const HeroTitleBlock = styled.div`
  text-align: center;
  color: white;
  max-width: 680px;
`;

const StoryLabel = styled.div`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 0.85rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0.9;
  margin-bottom: 0.75rem;
`;

const CoupleNames = styled.h1`
  font-size: 2.8rem;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2.1rem;
  }
`;

const MetaLine = styled.p`
  font-size: 0.95rem;
  opacity: 0.9;
`;

const StoryBody = styled.div`
  padding: 3.5rem 3rem 3rem;
  background: #fff6ec;

  @media (max-width: 768px) {
    padding: 2.5rem 1.75rem 2.5rem;
  }
`;

const IntroRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1.1fr);
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const IntroCol = styled.div`
  font-size: 0.98rem;
  color: ${props => props.theme.colors.dark};
  line-height: 1.9;

  p + p {
    margin-top: 1.2rem;
  }
`;

const Label = styled.div`
  font-weight: 600;
  margin-bottom: 0.35rem;
  color: ${props => props.theme.colors.dark};
`;

const Muted = styled.p`
  font-size: 0.96rem;
  color: ${props => props.theme.colors.gray};
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.dark};
`;

const SectionText = styled.p`
  font-size: 0.98rem;
  line-height: 1.9;
  color: ${props => props.theme.colors.gray};
`;

const GalleryRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
  margin-top: 2.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;


const GalleryImage = styled.div`
  height: 300px;
  border-radius: 24px;
  background: url(${props => props.image})  center/cover no-repeat;
`;

const ScriptLine = styled.p`
  font-family: ${props => props.theme.fonts.script};
  font-size: 1.4rem;
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-top: 2.5rem;
`;

const stories = {
  '1': {
    coupleNames: 'Nicole & Lewis',
    heroImage: '/images/emma_and_james.jpg',
    date: '11th June 2024',
    style: 'Beachfront, intimate and joy-filled',
    location: 'Koroni Beach, Kefalonia – Greece',
    gown: 'Silk crepe skirt with a soft lace bodice and detachable tulle overskirt',
    intro:
      'Nicole and Lewis always said that the sea felt like home. When they escaped to Kefalonia for a New Year’s Eve getaway, they had no idea they were standing on the very sand where they would one day share their vows. Years later, as the sun dipped into the Ionian Sea, that promise finally came to life.',
    introSecondary:
      'Their wedding day was everything they had imagined – barefoot, unhurried and surrounded only by the people who knew their story from the very beginning.',
    engagement:
      'Lewis had secretly carried the ring all day, tucked safely in the pocket of his linen trousers as they wandered through the cobbled streets of Bath. They ended their evening at their favourite boutique hotel, where the city lights shimmered in the windows. Just as midnight approached, he asked Nicole to marry him in the quiet of their room, the fireworks outside echoing the butterflies in her chest.',
    dressStory:
      'Nicole knew she wanted something she could move, dance and breathe in – a look that felt like her favourite love song, not a costume. When she slipped into her CarolineBride separates, the room went silent. The delicate lace and soft drape of the silk felt effortless, and the detachable overskirt meant she could float down the aisle and later dance barefoot under the stars.',
    venue:
      'The ceremony took place on a wooden deck overlooking Koroni Beach. A square arch of wild white roses, eucalyptus and olive branches framed the sea, while parasols hand‑woven by local artisans cast dappled shade over their guests. As Nicole walked towards Lewis to the gentle strum of a ukulele, the waves seemed to keep time with each step.',
    weddingStyle:
      'They chose a palette of sand, sage and soft sky blue to mirror the landscape around them. Nothing felt over‑styled; instead, it was as if the island itself had decorated the day. The result was a quietly luxurious celebration that felt both organic and deeply personal.',
    honeymoon:
      'Rather than leaving the island, Nicole and Lewis turned their wedding week into a roaming honeymoon. Each day they explored a different hidden cove, driving through pine‑framed mountain roads and stopping at tiny tavernas where the owners toasted their marriage with homemade wine.',
    moment:
      'Their favourite moment came just after the ceremony, when they stole a few minutes alone on the shoreline. With their shoes in their hands and the surf curling around their ankles, they watched their loved ones laughing together on the deck and realised that this – right here – was the beginning of everything.',
    gallery: ['/images/nic.jpg', '/images/wed4.jpg']
  },
  '2': {
    coupleNames: 'Sophia & Michael',
    heroImage: '/images/sophia_and_michael.jpg',
    date: '23rd September 2024',
    style: 'Modern, minimalist and quietly glamorous',
    location: 'Tuscan hilltop villa, Italy',
    gown:
      'Clean‑cut crepe gown with architectural neckline and a pearl‑dusted veil',
    intro:
      'Sophia and Michael fell in love in a city of glass and steel, where late‑night coffees and rain‑soaked taxi rides became their love language. When it came to their wedding, they dreamed of something slower – a place where time could stretch and every moment could be savoured.',
    introSecondary:
      'They chose a sun‑kissed villa in Tuscany, surrounded by olive groves and cypress trees, where the days melted into golden evenings and the air smelled of lemons and warm stone.',
    engagement:
      'On a foggy winter morning, Michael suggested a walk along the river that had witnessed so many of their firsts. When Sophia turned to comment on the city lights ghosting through the mist, he was already on one knee, holding out a simple diamond that sparkled like a quiet promise.',
    dressStory:
      'Sophia wanted a dress that felt modern yet timeless – something that would look as elegant in photographs decades from now as it did the moment she first tried it on. The clean lines of her CarolineBride gown, paired with a whisper‑thin pearl veil, felt like an exact reflection of her: understated, luminous and strong.',
    venue:
      'The ceremony terrace overlooked rolling Tuscan hills painted in soft greens and golds. Long wooden tables were dressed with linen runners, scattered figs and clouds of white blooms. As the sun dipped low, their guests gathered under strings of lights while a jazz trio played re‑imagined love songs.',
    weddingStyle:
      'Their aesthetic was all about contrast – raw stone and polished cutlery, wild foliage and sleek silhouettes. A palette of ivory, olive and deep caramel tied every detail together, from the stationery to the espresso martinis served after dinner.',
    honeymoon:
      'After the wedding, they boarded a slow train through Italy, stopping only when a town or café caught their eye. They shared gelato on quiet piazzas, watched the sunrise over silent canals and promised to carry this same sense of curiosity into their marriage.',
    moment:
      'As the final song drifted into the night, Michael spun Sophia under the fairy lights, her veil catching the warm breeze. For a brief second the whole room blurred and it felt like they were the only two people in the world.',
    gallery: ['/images/wed5.jpg', '/images/reception.jpg']
  },
  '3': {
    coupleNames: 'Isabella & David',
    heroImage: '/images/isabella_and_david.jpg',
    date: '14th February 2025',
    style: 'Black‑tie romance with ballroom grandeur',
    location: 'Historic heritage ballroom, London',
    gown:
      'Hand‑embroidered ballgown with cascading tulle and crystal embellishment',
    intro:
      'From their very first date at a candlelit jazz bar, Isabella and David had a flair for the dramatic. They adored late‑night theatre, grand staircases and the magic of getting dressed up just to sit across from each other and talk.',
    introSecondary:
      'Their wedding was a love letter to classic romance – sweeping, sparkling and unforgettable, yet grounded in the quiet tenderness they shared when the music faded.',
    engagement:
      'David reserved the tiny balcony of the theatre where they had shared their first slow dance. After the curtain fell, the lights dimmed to a soft glow and a single string quartet appeared onstage to play their song. With the city glittering beneath them, he asked Isabella to be his forever.',
    dressStory:
      'Isabella had always dreamed of a gown that would take her breath away. When she saw the CarolineBride ballgown on the mannequin, she felt the world still. Layers of feather‑light tulle floated as she moved, while hand‑sewn crystals caught every glimmer of light, making her feel like the heroine of her own story.',
    venue:
      'They chose a restored London ballroom with gilded ceilings, towering windows and a chandelier that scattered light like champagne bubbles. The aisle was lined with candlelit glass columns and clouds of roses, creating a runway of soft glow for Isabella’s entrance.',
    weddingStyle:
      'A refined palette of ivory, blush and antique gold set the tone. Guests arrived in black tie, greeted by strings playing modern songs in classical arrangements. The reception unfolded beneath the chandelier, with a live band, towering floral arrangements and a dessert table that looked like a work of art.',
    honeymoon:
      'Their honeymoon began in Paris, where they spent sunlit mornings on balconies and evenings wandering along the Seine. From there they travelled to a quiet village in the south of France, trading glitz for countryside charm and learning the art of doing absolutely nothing together.',
    moment:
      'Their most treasured memory is the private last dance they shared after everyone had left the ballroom. Shoes abandoned, foreheads pressed together, they swayed in the darkened room lit only by the afterglow of candles.',
    gallery: ['/images/wed2.jpg', '/images/glamour_bride.jpg']
  },
  '4': {
    coupleNames: 'Angella & Brown',
    heroImage: '/images/angellaandBrown.jpg',
    date: '7th August 2025',
    style: 'Lush garden celebration with joyful colour',
    location: 'Hidden courtyard venue, Cape Town',
    gown:
      'Two‑piece lace bodice with flowing organza skirt and hand‑beaded cape',
    intro:
      'Angella and Brown’s love story was written between boarding gates and video calls, stitched together through years of long‑distance flights and tearful airport goodbyes. When they finally chose a wedding date, they knew it had to feel like a homecoming for everyone who had cheered them on from afar.',
    introSecondary:
      'They found a hidden courtyard wrapped in bougainvillea and climbing jasmine, where the walls seemed to hold the echoes of laughter and music from celebrations long past.',
    engagement:
      'Brown proposed on the rooftop of the first apartment they ever shared, surrounded by potted herbs and fairy lights they had strung up together. As the city buzzed below them, he unfolded a handwritten letter before dropping to one knee, his voice shaking more than the paper in his hands.',
    dressStory:
      'Angella wanted movement – something that would catch the light when she danced and still feel effortless when she hugged each of her guests. The CarolineBride two‑piece gave her exactly that: delicate lace that skimmed her shoulders and a skirt that swirled like soft cloud around her ankles, finished with a beaded cape that shimmered as she walked.',
    venue:
      'Their courtyard venue was transformed into a green oasis, with hanging lanterns, overflowing flower boxes and long tables dressed in linen the colour of warm sand. A local choir surprised guests by singing Angella down the aisle, weaving their harmonies through the rustle of leaves overhead.',
    weddingStyle:
      'They embraced joyful colour – deep coral, soft peach and touches of sage – translating their personalities into every petal and place card. Hand‑painted signs guided guests through the space, while a bar cart served signature cocktails named after the cities that had held chapters of their story.',
    honeymoon:
      'Rather than leaving immediately, they gifted themselves a “citymoon,” spending a week rediscovering their own city as newlyweds. They visited favourite brunch spots, watched the sunrise from Table Mountain and ended each evening on the same rooftop where their engagement began.',
    moment:
      'Their favourite memory is the spontaneous circle that formed on the dance floor when Angella’s grandmother joined them, cape swirling as she taught everyone the traditional steps of her youth. In that moment, past and future felt beautifully intertwined.',
    gallery: ['/images/wed3.jpg', '/images/romantic_bride.jpg']
  }
};

const WeddingStoryPage = () => {
  const { id } = useParams();
  const story = stories[id] || stories['1'];

  return (
    <PageContainer>
      <StoryWrapper>
        <HeroImage style={{ backgroundImage: `url(${story.heroImage})` }}>
          <HeroOverlay>
            <HeroTitleBlock>
              <StoryLabel>Our Brides</StoryLabel>
              <CoupleNames>{story.coupleNames}</CoupleNames>
              <MetaLine>
                Wedding date: {story.date} · {story.location}
              </MetaLine>
            </HeroTitleBlock>
          </HeroOverlay>
        </HeroImage>

        <StoryBody>
          <IntroRow>
            <IntroCol>
              <Label>Our love story</Label>
              <SectionText>{story.intro}</SectionText>
            </IntroCol>
            <IntroCol>
              <Label>Wedding style</Label>
              <Muted>{story.style}</Muted>
              <Label style={{ marginTop: '1.5rem' }}>The Bride Wore</Label>
              <Muted>{story.gown}</Muted>
            </IntroCol>
          </IntroRow>

          <Section>
            <SectionTitle>Our engagement story</SectionTitle>
            <SectionText>{story.engagement}</SectionText>
          </Section>

          <Section>
            <SectionTitle>Falling in love with my CarolineBride outfit</SectionTitle>
            <SectionText>{story.dressStory}</SectionText>
          </Section>

          <Section>
            <SectionTitle>Tell us about your wedding venue</SectionTitle>
            <SectionText>{story.venue}</SectionText>
          </Section>

          <Section>
            <SectionTitle>Wedding style in detail</SectionTitle>
            <SectionText>{story.weddingStyle}</SectionText>
          </Section>

          <Section>
            <SectionTitle>Our honeymoon</SectionTitle>
            <SectionText>{story.honeymoon}</SectionText>
          </Section>

          <Section>
            <SectionTitle>Our most memorable moment</SectionTitle>
            <SectionText>{story.moment}</SectionText>
          </Section>

          <GalleryRow>
            {story.gallery.map((src, index) => (
              <GalleryImage key={index} style={{ backgroundImage: `url(${src})` }} />
            ))}
          </GalleryRow>

          <ScriptLine>
            Every gown, every glance, every promise – lovingly styled by CarolineBride.
          </ScriptLine>
        </StoryBody>
      </StoryWrapper>
    </PageContainer>
  );
};

export default WeddingStoryPage;
