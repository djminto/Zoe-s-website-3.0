import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background: var(--gradient-dark);
  color: var(--white);
  padding: 4rem 0 2rem;
  margin-top: 3rem;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr 1.2fr;
  gap: 2.2rem;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 1.8rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1.2rem;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.3rem;
    margin-bottom: 1.1rem;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.8;
    font-size: clamp(0.9rem, 2vw, 1rem);
  }

  ul {
    list-style: none;
    padding: 0;
    
    li {
      margin-bottom: 0.8rem;
      
      a {
        color: rgba(255, 255, 255, 0.8);
        transition: all var(--transition-fast) ease-in-out;
        font-size: clamp(0.85rem, 2vw, 0.95rem);

        &:hover {
          color: var(--primary-pink);
          padding-left: 5px;
          transform: translateX(3px);
        }
      }
    }
  }

  @media (max-width: 480px) {
    h3 {
      font-size: 1.1rem;
      margin-bottom: 0.8rem;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const SocialIcon = styled.a`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.13);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  transition: all var(--transition-normal);
  font-size: 1.15rem;

  &:hover {
    background: var(--gradient-pink);
    transform: translateY(-5px);
  }
`;

const FooterLinksGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem 2.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  @media (max-width: 480px) {
    gap: 0.3rem;
  }
`;

const ContactTight = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const ContactIcon = styled.a`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.13);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 1.1rem;
  transition: background 0.2s;

  &:hover {
    background: var(--gradient-pink);
    color: var(--white);
  }
`;

const ContactDetails = styled.div`
  font-size: 0.97rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.5;
  font-size: clamp(0.8rem, 2vw, 0.97rem);

  a {
    color: rgba(255, 255, 255, 0.85);
    transition: all 0.3s ease-in-out;

    &:hover {
      color: var(--primary-pink);
      text-decoration: underline;
    }
  }

  @media (max-width: 480px) {
    line-height: 1.4;
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
`;

// Transition Link Component
const TransitionLink = ({ to, children, ...props }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    
    // Add fade out effect
    document.body.style.opacity = '0.7';
    document.body.style.transition = 'opacity 0.3s ease-in-out';
    
    // Navigate after brief delay
    setTimeout(() => {
      navigate(to);
      // Scroll to top of page
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Fade back in
      document.body.style.opacity = '1';
    }, 150);
  };

  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

const Footer = () => {
  return (
    <FooterWrapper>
      <div className="container">
        <FooterContent>
          <FooterSection>
            <h3>About Zoe's</h3>
            <p>We create beautiful, handcrafted accessories that add elegance to your everyday style. Each piece is made with love and care.</p>
            <SocialLinks>
              <SocialIcon href="https://wa.me/18765440766" target="_blank" title="WhatsApp">
                <i className="fab fa-whatsapp"></i>
              </SocialIcon>
              <SocialIcon href="https://www.instagram.com/zoe._accessories/" target="_blank" title="Instagram">
                <i className="fab fa-instagram"></i>
              </SocialIcon>
              <SocialIcon href="mailto:zoesacessories23@gmail.com" title="Email">
                <i className="fas fa-envelope"></i>
              </SocialIcon>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <h3>Quick Links</h3>
            <FooterLinksGrid>
              <ul>
                <li><TransitionLink to="/">Home</TransitionLink></li>
                <li><TransitionLink to="/shop">Shop</TransitionLink></li>
                <li><TransitionLink to="/reviews">Reviews</TransitionLink></li>
                <li><TransitionLink to="/about">About Us</TransitionLink></li>
                <li><TransitionLink to="/contact">Contact</TransitionLink></li>
              </ul>
              <ul>
                <li><TransitionLink to="/faq">FAQ</TransitionLink></li>
                <li><TransitionLink to="/shipping">Shipping Policy</TransitionLink></li>
                <li><TransitionLink to="/returns">Returns & Refunds</TransitionLink></li>
                <li><TransitionLink to="/privacy">Privacy Policy</TransitionLink></li>
                <li><TransitionLink to="/terms">Terms & Conditions</TransitionLink></li>
              </ul>
            </FooterLinksGrid>
          </FooterSection>

          <FooterSection>
            <h3>Contact Us</h3>
            <ContactTight>
              <ContactIcon href="mailto:zoesacessories23@gmail.com" title="Email">
                <i className="fas fa-envelope"></i>
              </ContactIcon>
              <ContactIcon href="https://wa.me/18765440766" target="_blank" title="WhatsApp">
                <i className="fab fa-whatsapp"></i>
              </ContactIcon>
              <ContactIcon href="https://www.instagram.com/zoe._accessories/" target="_blank" rel="noreferrer" title="Instagram">
                <i className="fab fa-instagram"></i>
              </ContactIcon>
            </ContactTight>
            <ContactDetails>
              <span><a href="mailto:zoesacessories23@gmail.com">zoesacessories23@gmail.com</a></span><br />
              <span><a href="https://wa.me/18765440766" target="_blank" rel="noreferrer">+1876-544-0766</a></span><br />
              <span><a href="https://www.instagram.com/zoe._accessories/" target="_blank" rel="noreferrer">@zoe._accessories</a></span><br />
              <span><i className="fas fa-map-marker-alt"></i> Jamaica</span>
            </ContactDetails>
          </FooterSection>
        </FooterContent>

        <FooterBottom>
          <p>&copy; 2025 Zoe's Accessories. All rights reserved. Made with ❤️ in Jamaica</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
            Copyright &copy; 2025 by Minto's Web Design <i className="fa-solid fa-laptop-code" style={{ color: 'deepskyblue' }}></i> | All Rights Reserved.
          </p>
        </FooterBottom>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
