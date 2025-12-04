import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ForgotPasswordWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(255,127,169,0.1), rgba(255,226,236,0.3));
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 105, 180, 0.15), transparent);
  }

  &::before {
    width: 500px;
    height: 500px;
    top: -200px;
    left: -200px;
    animation: float 8s ease-in-out infinite;
  }

  &::after {
    width: 400px;
    height: 400px;
    bottom: -150px;
    right: -150px;
    animation: float 6s ease-in-out infinite reverse;
  }
`;

const Card = styled.div`
  background: var(--white);
  border-radius: 25px;
  box-shadow: var(--shadow-3d);
  padding: 3rem;
  max-width: 450px;
  width: 100%;
  position: relative;
  z-index: 1;
  animation: scaleIn 0.5s ease;

  @media (max-width: 480px) {
    padding: 2rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: clamp(1.8rem, 5vw, 2.5rem);
    font-weight: 800;
    background: var(--gradient-pink);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--gray);
    font-size: 0.95rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--primary-black);
  margin-bottom: 0.5rem;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  i {
    position: absolute;
    left: 1rem;
    color: var(--gray);
    font-size: 1rem;
    transition: color var(--transition-fast);
  }

  &:focus-within i {
    color: var(--primary-pink);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1rem 0.9rem 2.8rem;
  border: 2px solid var(--off-white);
  border-radius: 12px;
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

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: var(--gradient-pink);
  color: var(--white);
  border: none;
  border-radius: 12px;
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
    width: 400px;
    height: 400px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const BackLink = styled(Link)`
  text-align: center;
  color: var(--primary-pink);
  text-decoration: none;
  font-weight: 500;
  margin-top: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: color var(--transition-fast);

  &:hover {
    color: var(--secondary-pink);
  }
`;

const BackButton = styled.button`
  text-align: center;
  color: var(--primary-pink);
  text-decoration: none;
  font-weight: 500;
  margin-top: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: color var(--transition-fast);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    color: var(--secondary-pink);
  }
`;

const ErrorMessage = styled.div`
  background: #fee;
  color: #c33;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
  border: 1px solid #fcc;
`;

const SuccessMessage = styled.div`
  background: #efe;
  color: #3c3;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
  border: 1px solid #cfc;
  white-space: pre-line;
  line-height: 1.6;
  font-family: 'Courier New', monospace;

  strong {
    display: block;
    font-size: 1.1rem;
    margin-top: 0.5rem;
    font-family: 'Courier New', monospace;
    letter-spacing: 2px;
  }
`;

const InfoMessage = styled.div`
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
  border: 1px solid #90caf9;
`;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('email'); // email, verify, reset
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [storedCode, setStoredCode] = useState(''); // Store code temporarily

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Check if email exists in localStorage users
      const users = JSON.parse(localStorage.getItem('zoiesUsers') || '[]');
      const userExists = users.some(u => u.email === email);

      if (!userExists) {
        setError('No account found with this email address.');
        setIsLoading(false);
        return;
      }

      // Generate a verification code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setStoredCode(code);

      // Simulate sending email (in production, use a backend service)
      console.log(`🔐 Reset code for ${email}: ${code}`);
      
      setSuccess(`✓ Verification code sent!\n\nYour Code:\n${code}\n\n(Check browser console for details)`);
      setIsLoading(false);
      
      setTimeout(() => {
        setStep('verify');
        setSuccess('');
      }, 3000);
    } catch (err) {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (verificationCode !== storedCode) {
      setError('Invalid verification code. Please check and try again.');
      return;
    }

    setSuccess('Code verified! Proceed to reset your password.');
    setTimeout(() => {
      setStep('reset');
      setSuccess('');
    }, 1500);
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Validation
      if (newPassword.length < 6) {
        setError('Password must be at least 6 characters long.');
        setIsLoading(false);
        return;
      }

      if (newPassword !== confirmPassword) {
        setError('Passwords do not match.');
        setIsLoading(false);
        return;
      }

      // Update password in localStorage
      const users = JSON.parse(localStorage.getItem('zoiesUsers') || '[]');
      const userIndex = users.findIndex(u => u.email === email);

      if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem('zoiesUsers', JSON.stringify(users));

        setSuccess('Password reset successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError('User not found.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ForgotPasswordWrapper>
      <Card>
        <Header>
          <h1>Reset Password</h1>
          <p>
            {step === 'email' && 'Enter your email address'}
            {step === 'verify' && 'Verify your code'}
            {step === 'reset' && 'Create new password'}
          </p>
        </Header>

        {step === 'email' && (
          <Form onSubmit={handleEmailSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}

            <FormGroup>
              <Label htmlFor="email">Email Address</Label>
              <InputWrapper>
                <i className="fas fa-envelope"></i>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your registered email"
                  autoComplete="email"
                  disabled={isLoading}
                  required
                />
              </InputWrapper>
            </FormGroup>

            <SubmitButton type="submit" disabled={isLoading}>
              <i className="fas fa-paper-plane"></i> {isLoading ? 'Sending...' : 'Send Reset Code'}
            </SubmitButton>
          </Form>
        )}

        {step === 'verify' && (
          <Form onSubmit={handleVerificationSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}
            <InfoMessage>
              <i className="fas fa-info-circle"></i> Check your email for the verification code
            </InfoMessage>

            <FormGroup>
              <Label htmlFor="code">Verification Code</Label>
              <InputWrapper>
                <i className="fas fa-key"></i>
                <Input
                  type="text"
                  id="code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  autoComplete="off"
                  disabled={isLoading}
                  required
                />
              </InputWrapper>
            </FormGroup>

            <SubmitButton type="submit" disabled={isLoading}>
              <i className="fas fa-check"></i> {isLoading ? 'Verifying...' : 'Verify Code'}
            </SubmitButton>

            <BackButton onClick={() => setStep('email')}>
              <i className="fas fa-arrow-left"></i> Back
            </BackButton>
          </Form>
        )}

        {step === 'reset' && (
          <Form onSubmit={handleResetSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}

            <FormGroup>
              <Label htmlFor="newPassword">New Password</Label>
              <InputWrapper>
                <i className="fas fa-lock"></i>
                <Input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  disabled={isLoading}
                  required
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <InputWrapper>
                <i className="fas fa-lock"></i>
                <Input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  disabled={isLoading}
                  required
                />
              </InputWrapper>
            </FormGroup>

            <SubmitButton type="submit" disabled={isLoading}>
              <i className="fas fa-sync-alt"></i> {isLoading ? 'Resetting...' : 'Reset Password'}
            </SubmitButton>
          </Form>
        )}

        <BackLink to="/login">
          <i className="fas fa-arrow-left"></i> Back to Login
        </BackLink>
      </Card>
    </ForgotPasswordWrapper>
  );
};

export default ForgotPassword;
