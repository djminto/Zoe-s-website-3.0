import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { products } from '../data/products';

const DetailWrapper = styled.div`
  margin-top: 120px;
  padding: 3rem 0;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageSection = styled.div`
  .main-image {
    width: 100%;
    border-radius: 20px;
    box-shadow: var(--shadow-lg);
    margin-bottom: 1rem;
  }
`;

const InfoSection = styled.div`
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary-black);
    margin-bottom: 1rem;
  }

  .price {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary-pink);
    margin-bottom: 1.5rem;
  }

  .description {
    font-size: 1.1rem;
    color: var(--gray);
    line-height: 1.8;
    margin-bottom: 2rem;
  }

  .category {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: rgba(255, 105, 180, 0.1);
    color: var(--primary-pink);
    border-radius: 20px;
    font-weight: 500;
    margin-bottom: 2rem;
  }
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 1.2rem;
  background: var(--gradient-pink);
  color: var(--white);
  border: none;
  border-radius: 15px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-pink);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(255, 105, 180, 0.5);
  }
`;

const NotFound = styled.div`
  text-align: center;
  padding: 4rem 2rem;

  h2 {
    font-size: 2rem;
    color: var(--primary-black);
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    color: var(--gray);
  }
`;

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <DetailWrapper>
        <div className="container">
          <NotFound>
            <h2>Product Not Found</h2>
            <p>The product you're looking for doesn't exist</p>
          </NotFound>
        </div>
      </DetailWrapper>
    );
  }

  return (
    <DetailWrapper>
      <div className="container">
        <ProductGrid>
          <ImageSection>
            <img src={product.image} alt={product.name} className="main-image" />
          </ImageSection>
          <InfoSection>
            <span className="category">{product.category}</span>
            {product.badge && <span className="category">{product.badge}</span>}
            <h1>{product.name}</h1>
            <div className="price">${product.price.toFixed(2)}</div>
            <p className="description">{product.description}</p>
            <AddToCartButton>
              <i className="fas fa-shopping-cart"></i> Add to Cart
            </AddToCartButton>
          </InfoSection>
        </ProductGrid>
      </div>
    </DetailWrapper>
  );
};

export default ProductDetail;
