import React from 'react';
import styled from 'styled-components';
import StockBadge from './StockBadge';

const CardWrapper = styled.div`
  background: var(--white);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  position: relative;
  transform-style: preserve-3d;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px) rotateX(5deg);
    box-shadow: var(--shadow-3d);
  }
`;

const ProductImage = styled.div`
  position: relative;
  overflow: hidden;
  height: 300px;
  background: var(--off-white);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform var(--transition-slow);
    padding: 15px;
  }

  ${CardWrapper}:hover & img {
    transform: scale(1.1);
  }
`;

const ProductBadge = styled.span`
  position: absolute;
  top: 15px;
  right: 15px;
  background: var(--gradient-pink);
  color: var(--white);
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  box-shadow: var(--shadow-pink);
  z-index: 2;
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--primary-black);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductPrice = styled.p`
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--primary-pink);
  margin-bottom: 1rem;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const AddToCartBtn = styled.button`
  flex: 1;
  padding: 12px;
  background: var(--gradient-pink);
  color: var(--white);
  border: none;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-pink);
  }
`;

const QuickViewBtn = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid var(--primary-pink);
  background: var(--white);
  color: var(--primary-pink);
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: var(--gradient-pink);
    color: var(--white);
  }
`;

const ProductCard = ({ product, onAddToCart, onQuickView }) => {
  return (
    <CardWrapper onClick={() => onQuickView && onQuickView(product)}>
      <ProductImage>
        {product.badge && <ProductBadge>{product.badge}</ProductBadge>}
        <img src={product.image} alt={product.name} />
      </ProductImage>
      <ProductInfo>
        <ProductTitle>{product.name}</ProductTitle>
        <ProductPrice>${product.price}</ProductPrice>
        <div style={{ marginBottom: '1rem' }}>
          <StockBadge stock={product.stock} />
        </div>
        <ProductActions>
          <AddToCartBtn onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}>
            <i className="fas fa-cart-plus"></i> Add to Cart
          </AddToCartBtn>
          <QuickViewBtn onClick={(e) => {
            e.stopPropagation();
            onQuickView && onQuickView(product);
          }}>
            <i className="fas fa-eye"></i>
          </QuickViewBtn>
        </ProductActions>
      </ProductInfo>
    </CardWrapper>
  );
};

export default ProductCard;
