import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(400px);
    opacity: 0;
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 120px;
  right: 20px;
  z-index: 9999;
  animation: ${props => props.$isClosing ? slideOut : slideIn} 0.3s ease-out;
`;

const ToastWrapper = styled.div`
  background: var(--white);
  border-radius: 15px;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 10px 40px rgba(255, 105, 180, 0.3);
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 320px;
  max-width: 400px;
  border-left: 4px solid var(--primary-pink);

  @media (max-width: 480px) {
    min-width: 280px;
    right: 10px;
  }
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--gradient-pink);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const ToastContent = styled.div`
  flex: 1;

  h4 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--primary-black);
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 0.9rem;
    color: var(--gray);
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--gray);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color var(--transition-fast);

  &:hover {
    color: var(--primary-black);
  }
`;

const Toast = ({ message, productName, onClose }) => {
  const [isClosing, setIsClosing] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <ToastContainer $isClosing={isClosing}>
      <ToastWrapper>
        <IconWrapper>
          <i className="fas fa-check"></i>
        </IconWrapper>
        <ToastContent>
          <h4>{message}</h4>
          <p>{productName}</p>
        </ToastContent>
        <CloseButton onClick={handleClose}>
          <i className="fas fa-times"></i>
        </CloseButton>
      </ToastWrapper>
    </ToastContainer>
  );
};

export default Toast;
