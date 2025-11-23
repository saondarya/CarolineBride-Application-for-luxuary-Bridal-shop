import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 8rem 2rem 6rem;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background: ${props => props.theme.colors.champagne};
`;

const ContactCard = styled.div`
  width: 100%;
  max-width: 1100px;
  background: #fffaf4;
  border-radius: 32px;
  box-shadow: ${props => props.theme.shadows.medium};
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.1fr);

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const LeftPane = styled.div`
  padding: 3.5rem 3rem;

  @media (max-width: 768px) {
    padding: 2.5rem 1.75rem;
  }
`;

const RightPane = styled.div`
  background: ${props => props.theme.colors.secondary};
  padding: 3.5rem 3rem;

  @media (max-width: 768px) {
    padding: 2.5rem 1.75rem;
  }
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.dark};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.gray};
  margin-bottom: 2.5rem;
  font-size: 0.98rem;
`;

const InfoRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.75rem;
  margin-bottom: 2.5rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const InfoBlock = styled.div`
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.tertiary};
`;

const Label = styled.div`
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: ${props => props.theme.colors.gray};
  margin-bottom: 0.35rem;
`;

const Value = styled.div`
  font-size: 1rem;
  color: ${props => props.theme.colors.dark};
  font-weight: 500;
`;

const SecondaryText = styled.p`
  font-size: 0.94rem;
  color: ${props => props.theme.colors.gray};
  margin-top: 0.75rem;
`;

const MapContainer = styled.div`
  width: 100%;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.soft};
  margin-bottom: 1.5rem;
  height: 260px;

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const LocationNote = styled.p`
  font-size: 0.95rem;
  color: ${props => props.theme.colors.gray};
  line-height: 1.8;
`;

const AppointmentHint = styled.div`
  margin-top: 1.75rem;
  padding: 1.25rem 1.5rem;
  border-radius: 18px;
  background: ${props => props.theme.colors.white};
  font-size: 0.9rem;
  color: ${props => props.theme.colors.dark};
`;

const ContactPage = () => {
  return (
    <PageContainer>
      <ContactCard>
        <LeftPane>
          <Title>Contact Us</Title>
          <Subtitle>
            We would be honoured to welcome you into the CarolineBride world.
            Share your questions, dreams and dates – our bridal stylists will
            be in touch with you shortly.
          </Subtitle>

          <InfoRow>
            <InfoBlock>
              <Label>Phone</Label>
              <Value>+44 (0) 20 1234 5678</Value>
              <SecondaryText>
                Call us Tuesday – Saturday, 10:00–18:00 (local time).
              </SecondaryText>
            </InfoBlock>

            <InfoBlock>
              <Label>Email</Label>
              <Value>hello@carolinebride.com</Value>
              <SecondaryText>
                For styling advice, appointments and bespoke enquiries.
              </SecondaryText>
            </InfoBlock>
          </InfoRow>

          <InfoBlock>
            <Label>Flagship Atelier</Label>
            <Value>CarolineBride Bridal Atelier</Value>
            <SecondaryText>
              21 Pulteney Bridge, Bath, BA2 4AT, United Kingdom
            </SecondaryText>
          </InfoBlock>
        </LeftPane>

        <RightPane>
          <Label>Find us</Label>
          <MapContainer>
            <iframe
              title="CarolineBride Atelier Location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2504.573962115262!2d-2.360949323502504!3d51.38281427178786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4871810ce0f25c15%3A0xf0a3f9b82fb5a1fd!2sPulteney%20Bridge!5e0!3m2!1sen!2suk!4v1700000000000"
            ></iframe>
          </MapContainer>

          <LocationNote>
            Our atelier is nestled moments away from the river, in a calm,
            light‑filled space designed for unhurried bridal appointments. Use
            the map above to plan your visit, or reach out to our team for
            tailored travel recommendations.
          </LocationNote>

          <AppointmentHint>
            Prefer to reserve a private styling session? Visit our{' '}
            <strong>Book Appointment</strong> page to select your date and time,
            and we will prepare a curated rail of CarolineBride looks just for
            you.
          </AppointmentHint>
        </RightPane>
      </ContactCard>
    </PageContainer>
  );
};

export default ContactPage;


