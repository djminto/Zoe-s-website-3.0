import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { products as staticProducts } from '../data/products';

const HomeWrapper = styled.div`
  margin-top: 120px;
`;

const Hero = styled.section`
  padding: 4.2rem 0;
  background: linear-gradient(120deg, rgba(255,127,169,0.08), rgba(255,226,236,0.3));
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(255, 105, 180, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;
  }
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const HeroText = styled.div`
  animation: slideInLeft 0.8s ease;

  h1 {
    font-size: clamp(2.1rem, 4.5vw, 3.6rem);
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    color: var(--primary-black);
  }

  p {
    font-size: 1.2rem;
    color: var(--gray);
    margin-bottom: 2rem;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 14px 32px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-normal);
  text-align: center;
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

  &:hover::before {
    width: 300px;
    height: 300px;
  }

  &.primary {
    background: var(--gradient-pink);
    color: var(--white);
    box-shadow: var(--shadow-pink);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 32px rgba(255, 105, 180, 0.5);
    }
  }

  &.outline {
    background: transparent;
    color: var(--primary-pink);
    border: 2px solid var(--primary-pink);

    &:hover {
      background: var(--gradient-pink);
      color: var(--white);
      transform: translateY(-3px);
    }
  }
`;

const HeroImage = styled.div`
  animation: slideInRight 0.8s ease;

  .floating-card {
    animation: float3d 4s ease-in-out infinite;
    transform-style: preserve-3d;

    img {
      border-radius: 20px;
      box-shadow: var(--shadow-3d);
      width: 100%;
    }
  }
`;

const Features = styled.section`
  padding: 3rem 0;
  background: var(--white);
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: 2rem;
  border-radius: 20px;
  background: var(--off-white);
  transition: all var(--transition-normal);
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-lg);
    background: var(--white);
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  background: var(--gradient-pink);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 2rem;
  transition: all var(--transition-normal);

  ${FeatureCard}:hover & {
    transform: rotateY(360deg);
  }
`;

const Products = styled.section`
  padding: 4rem 0;
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

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const TextCenter = styled.div`
  text-align: center;
`;

const Home = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  // Load products from both static data and localStorage
  useEffect(() => {
    const dynamicProducts = JSON.parse(localStorage.getItem('zoiesProducts') || '[]');
    const allProducts = [...staticProducts, ...dynamicProducts];
    setProducts(allProducts);
  }, []);

  const featuredProducts = products.slice(0, 4);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <HomeWrapper>
      <Hero>
        <div className="container">
          <HeroContent>
            <HeroText>
              <h1>Discover Your Perfect <span className="gradient-text">Accessory</span></h1>
              <p>Handcrafted bracelets, scrunchies, silk bows, and candles made with love. Each piece tells a unique story.</p>
              <HeroButtons>
                <Button to="/shop" className="primary">
                  <i className="fas fa-shopping-bag"></i> Shop Now
                </Button>
                <Button to="/shop" className="outline">
                  <i className="fas fa-eye"></i> View Collection
                </Button>
              </HeroButtons>
            </HeroText>
            <HeroImage>
              <div className="floating-card">
                <img src="/Image/banner_4.png" alt="Zoie's Accessories" />
              </div>
            </HeroImage>
          </HeroContent>
        </div>
      </Hero>

      <Features>
        <div className="container">
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon><i className="fas fa-shipping-fast"></i></FeatureIcon>
              <h3>Free Shipping</h3>
              <p>Enjoy free delivery on all orders island-wide</p>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon><i className="fas fa-headset"></i></FeatureIcon>
              <h3>24/7 Support</h3>
              <p>Our team is always here to help you</p>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon><i className="fas fa-shield-alt"></i></FeatureIcon>
              <h3>Secure Payment</h3>
              <p>100% secure and encrypted transactions</p>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon><i className="fas fa-gem"></i></FeatureIcon>
              <h3>Premium Quality</h3>
              <p>Handcrafted with premium materials</p>
            </FeatureCard>
          </FeaturesGrid>
        </div>
      </Features>

      <Products>
        <div className="container">
          <SectionHeader>
            <h2>Featured Products</h2>
            <p>Discover our handpicked collection</p>
          </SectionHeader>
          <ProductsGrid>
            {featuredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product}
                onAddToCart={handleAddToCart}
                onQuickView={() => {}}
              />
            ))}
          </ProductsGrid>
          <TextCenter>
            <Button to="/shop" className="primary">View All Products</Button>
          </TextCenter>
        </div>
      </Products>
    </HomeWrapper>
  );
};

export default Home;
