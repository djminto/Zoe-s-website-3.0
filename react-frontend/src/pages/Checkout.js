import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { sendOrderEmails } from '../services/emailService';

const CheckoutWrapper = styled.div`
  margin-top: 120px;
  padding: 3rem 0;
  min-height: 60vh;
`;

const CheckoutTitle = styled.h1`
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

const CheckoutContainer = styled.div`
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

const CheckoutForm = styled.div`
  background: var(--white);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: var(--shadow-md);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const Section = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }

  h2 {
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    font-weight: 600;
    color: var(--primary-black);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    i {
      color: var(--primary-pink);
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 568px) {
    grid-template-columns: 1fr;
  }

  &.full {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    font-weight: 500;
    color: var(--primary-black);
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }

  input, textarea {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid var(--off-white);
    border-radius: 10px;
    font-size: 1rem;
    transition: all var(--transition-fast);
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: var(--primary-pink);
    }

    &::placeholder {
      color: var(--gray);
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }
`;

const PaymentOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PaymentOption = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  border: 2px solid ${props => props.$selected ? 'var(--primary-pink)' : 'var(--off-white)'};
  border-radius: 15px;
  cursor: pointer;
  transition: all var(--transition-fast);
  background: ${props => props.$selected ? 'rgba(255, 105, 180, 0.05)' : 'transparent'};

  &:hover {
    border-color: var(--primary-pink);
  }

  input[type="radio"] {
    margin-top: 0.25rem;
    width: 20px;
    height: 20px;
    accent-color: var(--primary-pink);
    cursor: pointer;
  }
`;

const OptionContent = styled.div`
  flex: 1;

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--primary-black);
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    i {
      color: var(--primary-pink);
    }
  }

  p {
    font-size: 0.9rem;
    color: var(--gray);
    line-height: 1.6;
  }
`;

const PaymentInstructions = styled.div`
  margin-top: 1rem;
  padding: 1.5rem;
  background: var(--off-white);
  border-radius: 10px;
  border-left: 4px solid var(--primary-pink);

  h4 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--primary-black);
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
    
    li {
      padding: 0.5rem 0;
      color: var(--primary-black);
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      font-size: 0.95rem;

      i {
        color: var(--primary-pink);
        margin-top: 0.25rem;
      }
    }
  }

  .bank-details {
    background: var(--white);
    padding: 1rem;
    border-radius: 8px;
    margin-top: 1rem;

    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--off-white);

      &:last-child {
        border-bottom: none;
      }

      strong {
        color: var(--primary-black);
      }

      span {
        color: var(--primary-pink);
        font-weight: 600;
      }
    }
  }
`;

const OrderSummary = styled.div`
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

const OrderItem = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--off-white);

  img {
    width: 60px;
    height: 60px;
    object-fit: contain;
    border-radius: 8px;
    background: var(--off-white);
    padding: 5px;
  }
`;

const ItemDetails = styled.div`
  flex: 1;

  h4 {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--primary-black);
    margin-bottom: 0.25rem;
  }

  .quantity {
    font-size: 0.85rem;
    color: var(--gray);
  }

  .price {
    font-size: 1rem;
    font-weight: 600;
    color: var(--primary-pink);
    margin-top: 0.25rem;
  }
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

const PlaceOrderButton = styled.button`
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(255, 105, 180, 0.5);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const EmptyCheckout = styled.div`
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

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 14px 32px;
    background: var(--gradient-pink);
    color: var(--white);
    border-radius: 50px;
    text-decoration: none;
    font-weight: 500;
    transition: all var(--transition-normal);

    &:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-pink);
    }
  }
`;

const Checkout = () => {
  const { cartItems, getCartTotal, getCartCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('bank-transfer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Generate order ID
      const orderId = `ZOE${Date.now()}`;
      
      // Prepare order data
      const orderData = {
        orderId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        notes: formData.notes,
        paymentMethod: paymentMethod,
        items: cartItems,
        subtotal: getCartTotal(),
        total: getCartTotal(),
        status: 'pending'
      };

      // Save order to localStorage
      const existingOrders = JSON.parse(localStorage.getItem('zoiesOrders') || '[]');
      localStorage.setItem('zoiesOrders', JSON.stringify([...existingOrders, orderData]));

      // Send emails to both admin and customer
      const emailResult = await sendOrderEmails(orderData);

      if (emailResult.success) {
        alert(
          `✅ Order placed successfully!\n\n` +
          `Order ID: ${orderId}\n` +
          `Payment Method: ${paymentMethod === 'bank-transfer' ? 'Bank Transfer' : 'Cash on Delivery'}\n\n` +
          `📧 Confirmation emails have been sent to:\n` +
          `- You at ${formData.email}\n` +
          `- Zoe's Accessories Admin\n\n` +
          `Thank you for your order!`
        );
      } else {
        alert(
          `Order placed successfully!\n\n` +
          `Order ID: ${orderId}\n` +
          `Payment Method: ${paymentMethod === 'bank-transfer' ? 'Bank Transfer' : 'Cash on Delivery'}\n\n` +
          `⚠️ Note: Email notifications may have failed. Please check your email or contact us directly.\n\n` +
          `Thank you for your order!`
        );
      }
      
      // Clear cart and redirect
      clearCart();
      navigate('/');
    } catch (error) {
      console.error('Order submission error:', error);
      alert('There was an error processing your order. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <CheckoutWrapper>
        <div className="container">
          <EmptyCheckout>
            <i className="fas fa-shopping-cart"></i>
            <h2>Your Cart is Empty</h2>
            <p>Add some items to your cart before checking out</p>
            <a href="/shop">
              <i className="fas fa-shopping-bag"></i> Go to Shop
            </a>
          </EmptyCheckout>
        </div>
      </CheckoutWrapper>
    );
  }

  return (
    <CheckoutWrapper>
      <div className="container">
        <CheckoutTitle>
          <i className="fas fa-credit-card"></i>
          Checkout
        </CheckoutTitle>

        <CheckoutContainer>
          <CheckoutForm>
            <form onSubmit={handleSubmit}>
              <Section>
                <h2><i className="fas fa-user"></i> Contact Information</h2>
                <FormGrid>
                  <FormGroup>
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      autoComplete="given-name"
                      required
                      placeholder="John"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      autoComplete="family-name"
                      required
                      placeholder="Doe"
                    />
                  </FormGroup>
                </FormGrid>
                <FormGrid>
                  <FormGroup>
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      autoComplete="email"
                      required
                      placeholder="john@example.com"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="phone">Phone *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      autoComplete="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                    />
                  </FormGroup>
                </FormGrid>
              </Section>

              <Section>
                <h2><i className="fas fa-map-marker-alt"></i> Delivery Address</h2>
                <FormGrid className="full">
                  <FormGroup>
                    <label htmlFor="address">Street Address *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      autoComplete="street-address"
                      required
                      placeholder="123 Main Street"
                    />
                  </FormGroup>
                </FormGrid>
                <FormGrid>
                  <FormGroup>
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      autoComplete="address-level2"
                      required
                      placeholder="New York"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="postalCode">Postal Code *</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      autoComplete="postal-code"
                      required
                      placeholder="10001"
                    />
                  </FormGroup>
                </FormGrid>
                <FormGrid className="full">
                  <FormGroup>
                    <label htmlFor="notes">Order Notes (Optional)</label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Any special instructions for your order..."
                    />
                  </FormGroup>
                </FormGrid>
              </Section>

              <Section>
                <h2><i className="fas fa-wallet"></i> Payment Method</h2>
                <PaymentOptions>
                  <PaymentOption $selected={paymentMethod === 'bank-transfer'}>
                    <input
                      type="radio"
                      name="payment"
                      value="bank-transfer"
                      checked={paymentMethod === 'bank-transfer'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <OptionContent>
                      <h3><i className="fas fa-university"></i> Bank Transfer</h3>
                      <p>Transfer payment directly to our bank account</p>
                    </OptionContent>
                  </PaymentOption>

                  {paymentMethod === 'bank-transfer' && (
                    <PaymentInstructions>
                      <h4>Bank Transfer Instructions:</h4>
                      <div className="bank-details">
                        <div className="detail-row">
                          <strong>Bank Name:</strong>
                          <span>JN Bank</span>
                        </div>
                        <div className="detail-row">
                          <strong>Branch:</strong>
                          <span>Spanish Town</span>
                        </div>
                        <div className="detail-row">
                          <strong>Account Name:</strong>
                          <span>Mahalia Moore</span>
                        </div>
                        <div className="detail-row">
                          <strong>Account Number:</strong>
                          <span>2094834258</span>
                        </div>
                        <div className="detail-row">
                          <strong>Account Type:</strong>
                          <span>Savings</span>
                        </div>
                      </div>
                      <ul>
                        <li><i className="fas fa-check-circle"></i> Use your Order ID as the payment reference</li>
                        <li><i className="fas fa-check-circle"></i> Your order will be processed once payment is confirmed</li>
                        <li><i className="fas fa-check-circle"></i> Please allow 1-2 business days for verification</li>
                        <li><i className="fas fa-check-circle"></i> You'll receive a confirmation email with your Order ID</li>
                      </ul>
                    </PaymentInstructions>
                  )}

                  <PaymentOption $selected={paymentMethod === 'cash-on-delivery'}>
                    <input
                      type="radio"
                      name="payment"
                      value="cash-on-delivery"
                      checked={paymentMethod === 'cash-on-delivery'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <OptionContent>
                      <h3><i className="fas fa-money-bill-wave"></i> Cash on Delivery</h3>
                      <p>Pay with cash when your order is delivered</p>
                    </OptionContent>
                  </PaymentOption>

                  {paymentMethod === 'cash-on-delivery' && (
                    <PaymentInstructions>
                      <h4>Cash on Delivery Instructions:</h4>
                      <ul>
                        <li><i className="fas fa-check-circle"></i> Prepare the exact amount in cash for your order</li>
                        <li><i className="fas fa-check-circle"></i> Payment will be collected upon delivery</li>
                        <li><i className="fas fa-check-circle"></i> Please have someone available to receive the order</li>
                        <li><i className="fas fa-check-circle"></i> A delivery fee may apply to your location</li>
                        <li><i className="fas fa-check-circle"></i> Inspect your order before making payment</li>
                      </ul>
                    </PaymentInstructions>
                  )}
                </PaymentOptions>
              </Section>
            </form>
          </CheckoutForm>

          <OrderSummary>
            <SummaryTitle>Order Summary</SummaryTitle>
            {cartItems.map(item => (
              <OrderItem key={item.id}>
                <img src={item.image} alt={item.name} />
                <ItemDetails>
                  <h4>{item.name}</h4>
                  <div className="quantity">Qty: {item.quantity}</div>
                  <div className="price">${(item.price * item.quantity).toFixed(2)}</div>
                </ItemDetails>
              </OrderItem>
            ))}
            <SummaryRow>
              <span>Subtotal ({getCartCount()} items)</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Shipping</span>
              <span>Free</span>
            </SummaryRow>
            <SummaryRow className="total">
              <span>Total</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </SummaryRow>
            <PlaceOrderButton onClick={handleSubmit} disabled={isSubmitting}>
              <i className={isSubmitting ? "fas fa-spinner fa-spin" : "fas fa-check-circle"}></i> 
              {isSubmitting ? 'Processing Order...' : 'Place Order'}
            </PlaceOrderButton>
          </OrderSummary>
        </CheckoutContainer>
      </div>
    </CheckoutWrapper>
  );
};

export default Checkout;
