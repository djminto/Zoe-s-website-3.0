import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';

const CartWrapper = styled.div`
  margin-top: 120px;
  padding: 3rem 0;
  min-height: 60vh;
`;

const CartTitle = styled.h1`
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  font-weight: 700;
  color: var(--primary-black);
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  i {
    color: var(--primary-pink);
  }

  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
  }
`;

const CartContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 350px;
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 1.5rem;
  background: var(--white);
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
  align-items: center;

  &:hover {
    box-shadow: var(--shadow-lg);
  }

  @media (max-width: 768px) {
    grid-template-columns: 100px 1fr auto;
    gap: 1rem;
    padding: 1rem;
  }

  @media (max-width: 568px) {
    grid-template-columns: 80px 1fr;
    gap: 0.8rem;
    padding: 0.8rem;
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: contain;
  border-radius: 10px;
  background: var(--off-white);
  padding: 10px;

  @media (max-width: 768px) {
    height: 100px;
  }

  @media (max-width: 568px) {
    height: 80px;
    padding: 8px;
  }
`;

const ItemInfo = styled.div`
  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--primary-black);
    margin-bottom: 0.5rem;
  }

  .price {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--primary-pink);
    margin-bottom: 0.75rem;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--off-white);
  padding: 0.5rem;
  border-radius: 50px;

  button {
    width: 32px;
    height: 32px;
    border: none;
    background: var(--white);
    color: var(--primary-pink);
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 600;
    transition: all var(--transition-fast);

    &:hover {
      background: var(--gradient-pink);
      color: var(--white);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  span {
    min-width: 35px;
    text-align: center;
    font-weight: 600;
    color: var(--primary-black);
  }
`;

const ItemActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;

  @media (max-width: 568px) {
    grid-column: 2;
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: var(--gray);
  cursor: pointer;
  font-size: 1.5rem;
  transition: all var(--transition-fast);

  &:hover {
    color: #ff4444;
    transform: scale(1.1);
  }
`;

const ItemTotal = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--primary-black);
`;

const CartSummary = styled.div`
  background: var(--white);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: var(--shadow-lg);
  height: fit-content;
  position: sticky;
  top: 140px;
`;

const SummaryTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-black);
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--off-white);
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: var(--primary-black);

  &.total {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-pink);
    padding-top: 1rem;
    border-top: 2px solid var(--off-white);
    margin-top: 1rem;
  }
`;

const CheckoutButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 16px;
  background: var(--gradient-pink);
  color: var(--white);
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-pink);
  margin-top: 1.5rem;
  text-decoration: none;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(255, 105, 180, 0.5);
  }
`;

const ContinueShoppingButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 14px;
  background: transparent;
  color: var(--primary-pink);
  border: 2px solid var(--primary-pink);
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-normal);
  margin-top: 1rem;
  text-decoration: none;

  &:hover {
    background: var(--primary-pink);
    color: var(--white);
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 4rem 2rem;

  i {
    font-size: 5rem;
    color: var(--primary-pink);
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary-black);
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    color: var(--gray);
    margin-bottom: 2rem;
  }
`;

const ShopButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 14px 32px;
  background: var(--gradient-pink);
  color: var(--white);
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-pink);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(255, 105, 180, 0.5);
  }
`;

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, getCartCount } = useCart();

  if (cartItems.length === 0) {
    return (
      <CartWrapper>
        <div className="container">
          <EmptyCart>
            <i className="fas fa-shopping-cart"></i>
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added anything to your cart yet</p>
            <ShopButton to="/shop">
              <i className="fas fa-shopping-bag"></i> Continue Shopping
            </ShopButton>
          </EmptyCart>
        </div>
      </CartWrapper>
    );
  }

  return (
    <CartWrapper>
      <div className="container">
        <CartTitle>
          <i className="fas fa-shopping-cart"></i>
          Shopping Cart ({getCartCount()} items)
        </CartTitle>

        <CartContainer>
          <CartItems>
            {cartItems.map(item => (
              <CartItem key={item.id}>
                <ItemImage src={item.image} alt={item.name} />
                <ItemInfo>
                  <h3>{item.name}</h3>
                  <div className="price">${item.price.toFixed(2)}</div>
                  <QuantityControl>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      +
                    </button>
                  </QuantityControl>
                </ItemInfo>
                <ItemActions>
                  <RemoveButton onClick={() => removeFromCart(item.id)}>
                    <i className="fas fa-trash-alt"></i>
                  </RemoveButton>
                  <ItemTotal>${(item.price * item.quantity).toFixed(2)}</ItemTotal>
                </ItemActions>
              </CartItem>
            ))}
          </CartItems>

          <CartSummary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryRow>
              <span>Subtotal ({getCartCount()} items)</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </SummaryRow>
            <SummaryRow className="total">
              <span>Total</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </SummaryRow>
            <CheckoutButton to="/checkout">
              <i className="fas fa-lock"></i> Proceed to Checkout
            </CheckoutButton>
            <ContinueShoppingButton to="/shop">
              <i className="fas fa-arrow-left"></i> Continue Shopping
            </ContinueShoppingButton>
          </CartSummary>
        </CartContainer>
      </div>
    </CartWrapper>
  );
};

export default Cart;
