import React from 'react';
import styled from 'styled-components';

const AboutWrapper = styled.div`
  margin-top: 120px;
`;

const Hero = styled.section`
  padding: 4rem 0;
  background: linear-gradient(120deg, rgba(255,127,169,0.08), rgba(255,226,236,0.3));
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 700px;
  margin: 0 auto;
  animation: fadeInUp 0.8s ease;

  h1 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 800;
    margin-bottom: 1.5rem;
    color: var(--primary-black);
  }

  p {
    font-size: 1.2rem;
    color: var(--gray);
    line-height: 1.8;
  }
`;

const Story = styled.section`
  padding: 4rem 0;
`;

const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const StoryImage = styled.div`
  animation: slideInLeft 0.8s ease;

  img {
    width: 100%;
    border-radius: 20px;
    box-shadow: var(--shadow-3d);
  }
`;

const StoryText = styled.div`
  animation: slideInRight 0.8s ease;

  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--primary-black);
  }

  p {
    font-size: 1.1rem;
    color: var(--gray);
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }

  .highlight {
    color: var(--primary-pink);
    font-weight: 600;
  }
`;

const Values = styled.section`
  padding: 4rem 0;
  background: var(--off-white);
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--primary-black);
  }

  p {
    font-size: 1.1rem;
    color: var(--gray);
  }
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const ValueCard = styled.div`
  background: var(--white);
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-md);
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-lg);
  }
`;

const ValueIcon = styled.div`
  width: 90px;
  height: 90px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  background: var(--gradient-pink);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 2.5rem;
  transition: all var(--transition-normal);

  ${ValueCard}:hover & {
    transform: rotateY(360deg);
  }
`;

const ValueTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--primary-black);
`;

const ValueDescription = styled.p`
  font-size: 1rem;
  color: var(--gray);
  line-height: 1.6;
`;

const Team = styled.section`
  padding: 4rem 0;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const TeamMember = styled.div`
  text-align: center;
  transition: all var(--transition-normal);

  &:hover {
    transform: translateY(-10px);
  }
`;

const TeamImage = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid var(--primary-pink);
  box-shadow: var(--shadow-pink);
  transition: all var(--transition-normal);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${TeamMember}:hover & {
    transform: scale(1.1);
    box-shadow: 0 15px 40px rgba(255, 105, 180, 0.6);
  }
`;

const TeamName = styled.h4`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--primary-black);
`;

const TeamRole = styled.p`
  font-size: 1rem;
  color: var(--primary-pink);
  font-weight: 500;
`;

const About = () => {
  return (
    <AboutWrapper>
      <Hero>
        <div className="container">
          <HeroContent>
            <h1>About <span className="gradient-text">Zoe's Accessories</span></h1>
            <p>
              Welcome to Zoe's Accessories, where creativity meets craftsmanship. 
              We're passionate about creating unique, handmade accessories that add 
              a touch of elegance to your everyday style.
            </p>
          </HeroContent>
        </div>
      </Hero>

      <Story>
        <div className="container">
          <StoryGrid>
            <StoryImage>
              <img src="/Image/banner_4.png" alt="Our Story" />
            </StoryImage>
            <StoryText>
              <h2>Our Story</h2>
              <p>
                Founded with a love for creativity and design, <span className="highlight">Zoe's Accessories</span> began 
                as a small passion project in 2020. What started as handcrafting bracelets for friends 
                and family quickly grew into a beloved brand known for quality and style.
              </p>
              <p>
                Every piece we create is made with care, attention to detail, and premium materials. 
                We believe that accessories should be more than just fashion—they should tell your story 
                and reflect your unique personality.
              </p>
              <p>
                Today, we're proud to offer a diverse collection of bracelets, scrunchies, silk bows, 
                and scented candles, all designed to bring joy and beauty to your daily life.
              </p>
            </StoryText>
          </StoryGrid>
        </div>
      </Story>

      <Values>
        <div className="container">
          <SectionHeader>
            <h2>Our Values</h2>
            <p>What drives us every day</p>
          </SectionHeader>
          <ValuesGrid>
            <ValueCard>
              <ValueIcon><i className="fas fa-heart"></i></ValueIcon>
              <ValueTitle>Handcrafted with Love</ValueTitle>
              <ValueDescription>
                Every product is carefully handmade with passion and attention to detail, 
                ensuring you receive something truly special.
              </ValueDescription>
            </ValueCard>
            <ValueCard>
              <ValueIcon><i className="fas fa-gem"></i></ValueIcon>
              <ValueTitle>Premium Quality</ValueTitle>
              <ValueDescription>
                We use only the finest materials to create accessories that are beautiful, 
                durable, and made to last.
              </ValueDescription>
            </ValueCard>
            <ValueCard>
              <ValueIcon><i className="fas fa-leaf"></i></ValueIcon>
              <ValueTitle>Sustainable Practices</ValueTitle>
              <ValueDescription>
                We're committed to eco-friendly practices and sustainable sourcing to 
                protect our planet for future generations.
              </ValueDescription>
            </ValueCard>
            <ValueCard>
              <ValueIcon><i className="fas fa-users"></i></ValueIcon>
              <ValueTitle>Customer First</ValueTitle>
              <ValueDescription>
                Your satisfaction is our priority. We're here to ensure you have an 
                exceptional experience from start to finish.
              </ValueDescription>
            </ValueCard>
          </ValuesGrid>
        </div>
      </Values>

      <Team>
        <div className="container">
          <SectionHeader>
            <h2>Meet Our Team</h2>
            <p>The creative minds behind Zoe's Accessories</p>
          </SectionHeader>
          <TeamGrid>
            <TeamMember>
              <TeamImage>
                <img src="/Image/Mahalia Moore.jpeg" alt="Zoe" />
              </TeamImage>
              <TeamName>Zoe</TeamName>
              <TeamRole>Founder & Lead Designer</TeamRole>
            </TeamMember>
            <TeamMember>
              <TeamImage>
                <img src="/Image/Minto professional.png" alt="Minto" />
              </TeamImage>
              <TeamName>Daniel Minto</TeamName>
              <TeamRole>Web Developer</TeamRole>
            </TeamMember>
            <TeamMember>
              <TeamImage>
                <img src="/Image/Zoies logo.png" alt="Team Member" />
              </TeamImage>
              <TeamName>Unknown</TeamName>
              <TeamRole>Unknown</TeamRole>
            </TeamMember>
          </TeamGrid>
        </div>
      </Team>
    </AboutWrapper>
  );
};

export default About;
