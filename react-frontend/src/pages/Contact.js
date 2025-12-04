import React, { useState } from 'react';
import styled from 'styled-components';

const ContactWrapper = styled.div`
  margin-top: 120px;
  padding: 3rem 0;
`;

const Hero = styled.section`
  padding: 3rem 0;
  background: linear-gradient(120deg, rgba(255,127,169,0.08), rgba(255,226,236,0.3));
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
  animation: fadeInUp 0.8s ease;

  h1 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 800;
    margin-bottom: 1rem;
    color: var(--primary-black);
  }

  p {
    font-size: 1.1rem;
    color: var(--gray);
    line-height: 1.8;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  padding: 3rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  animation: slideInLeft 0.8s ease;
`;

const InfoCard = styled.div`
  background: var(--white);
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
`;

const InfoIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--gradient-pink);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const InfoTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--primary-black);
`;

const InfoText = styled.p`
  font-size: 1rem;
  color: var(--gray);
  line-height: 1.6;

  a {
    color: var(--primary-pink);
    text-decoration: none;
    transition: color var(--transition-fast);

    &:hover {
      color: var(--secondary-pink);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialIcon = styled.a`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--gradient-pink);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 1.2rem;
  transition: all var(--transition-normal);

  &:hover {
    transform: translateY(-5px) rotate(360deg);
    box-shadow: var(--shadow-pink);
  }
`;

const FormSection = styled.div`
  animation: slideInRight 0.8s ease;
`;

const ContactForm = styled.form`
  background: var(--white);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: var(--shadow-lg);
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--primary-black);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--primary-black);
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1rem;
  border: 2px solid var(--off-white);
  border-radius: 10px;
  font-size: 1rem;
  transition: all var(--transition-fast);
  background: var(--off-white);

  &:focus {
    outline: none;
    border-color: var(--primary-pink);
    background: var(--white);
  }

  &::placeholder {
    color: var(--gray);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.9rem 1rem;
  border: 2px solid var(--off-white);
  border-radius: 10px;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  resize: vertical;
  min-height: 150px;
  transition: all var(--transition-fast);
  background: var(--off-white);

  &:focus {
    outline: none;
    border-color: var(--primary-pink);
    background: var(--white);
  }

  &::placeholder {
    color: var(--gray);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: var(--gradient-pink);
  color: var(--white);
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-pink);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(255, 105, 180, 0.5);
  }

  &:hover::before {
    width: 300px;
    height: 300px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div`
  padding: 1rem;
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  text-align: center;
  animation: fadeIn 0.5s ease;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1500);
  };

  return (
    <ContactWrapper>
      <Hero>
        <div className="container">
          <HeroContent>
            <h1>Get in <span className="gradient-text">Touch</span></h1>
            <p>
              Have a question or want to learn more about our products? 
              We'd love to hear from you!
            </p>
          </HeroContent>
        </div>
      </Hero>

      <div className="container">
        <ContentGrid>
          <ContactInfo>
            <InfoCard>
              <InfoIcon><i className="fas fa-map-marker-alt"></i></InfoIcon>
              <InfoTitle>Visit Us</InfoTitle>
              <InfoText>
                123 Main Street<br />
                Kingston, Jamaica
              </InfoText>
            </InfoCard>

            <InfoCard>
              <InfoIcon><i className="fas fa-phone-alt"></i></InfoIcon>
              <InfoTitle>Call Us</InfoTitle>
              <InfoText>
                <a href="tel:+1876-544-0766">+1 (876) 544-0766</a><br />
                Mon-Fri: 9AM - 6PM
              </InfoText>
            </InfoCard>

            <InfoCard>
              <InfoIcon><i className="fas fa-envelope"></i></InfoIcon>
              <InfoTitle>Email Us</InfoTitle>
              <InfoText>
                <a href="mailto:zoesacessories23@gmail.com">zoesacessories23@gmail.com</a><br />
                We reply within 24 hours
              </InfoText>
            </InfoCard>

            <InfoCard>
              <InfoIcon><i className="fas fa-clock"></i></InfoIcon>
              <InfoTitle>Business Hours</InfoTitle>
              <InfoText>
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: 10:00 AM - 4:00 PM<br />
                Sunday: Closed
              </InfoText>
            </InfoCard>

            <SocialLinks>
              <SocialIcon href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </SocialIcon>
              <SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </SocialIcon>
              <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </SocialIcon>
              <SocialIcon href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-pinterest-p"></i>
              </SocialIcon>
            </SocialLinks>
          </ContactInfo>

          <FormSection>
            <ContactForm onSubmit={handleSubmit}>
              <FormTitle>Send us a Message</FormTitle>
              
              {showSuccess && (
                <SuccessMessage>
                  <i className="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.
                </SuccessMessage>
              )}

              <FormGroup>
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  autoComplete="name"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Your Email *</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  autoComplete="off"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">Message *</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more..."
                  required
                />
              </FormGroup>

              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i> Send Message
                  </>
                )}
              </SubmitButton>
            </ContactForm>
          </FormSection>
        </ContentGrid>
      </div>
    </ContactWrapper>
  );
};

export default Contact;
