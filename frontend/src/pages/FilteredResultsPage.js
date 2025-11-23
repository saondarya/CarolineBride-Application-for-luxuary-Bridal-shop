import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { products as PRODUCT_CATALOG } from '../data/products';

const PageContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem 3rem;
`;

const Title = styled.h1`
  margin: 2rem 0 0.25rem;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.gray};
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.soft};
`;

const Img = styled.div`
  height: 320px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: top;
`;

const Info = styled.div`
  padding: 1rem 1.25rem 1.25rem;
`;

const Name = styled.h3`
  font-size: 1.05rem;
  margin-bottom: 0.25rem;
`;

const Meta = styled.div`
  color: ${props => props.theme.colors.gray};
  font-size: 0.9rem;
`;

export default function FilteredResultsPage() {
  const [params] = useSearchParams();
  const category = params.get('category');
  const bridalLook = params.get('bridalLook');

  const items = useMemo(() => {
    return PRODUCT_CATALOG.filter(p => {
      const categoryMatch = !category || p.category === category;
      const lookMatch = !bridalLook || p.bridalLook === bridalLook;
      return categoryMatch && lookMatch;
    });
  }, [category, bridalLook]);

  const titleBits = [category && category.replace(/\b\w/g, c => c.toUpperCase()), bridalLook && bridalLook.replace(/\b\w/g, c => c.toUpperCase())].filter(Boolean);

  return (
    <PageContainer>
      <Container>
        <Title>{titleBits.length ? titleBits.join(' · ') : 'Results'}</Title>
        <Subtitle>{items.length} result{items.length !== 1 ? 's' : ''}</Subtitle>
        <Grid>
          {items.map(p => (
            <Card key={p.id}>
              <Img image={p.image} />
              <Info>
                <Name>{p.name}</Name>
                <Meta>{p.style} · {p.category} · {p.bridalLook}</Meta>
              </Info>
            </Card>
          ))}
        </Grid>
      </Container>
    </PageContainer>
  );
}



