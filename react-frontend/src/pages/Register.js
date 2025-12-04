import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const RegisterWrapper = styled.div`
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
    right: -200px;
    animation: float 8s ease-in-out infinite;
  }

  &::after {
    width: 400px;
    height: 400px;
    bottom: -150px;
    left: -150px;
    animation: float 6s ease-in-out infinite reverse;
  }
`;

const RegisterCard = styled.div`
  background: var(--white);
  border-radius: 25px;
  box-shadow: var(--shadow-3d);
  padding: 3rem;
  max-width: 500px;
  width: 100%;
  position: relative;
  z-index: 1;
  animation: scaleIn 0.5s ease;

  @media (max-width: 480px) {
    padding: 2rem;
  }
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
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
  gap: 1.25rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
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

const CheckboxGroup = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--gray);
  cursor: pointer;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: var(--primary-pink);
  }

  a {
    color: var(--primary-pink);
    text-decoration: none;
    font-weight: 500;

    &:hover {
      color: var(--secondary-pink);
    }
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

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--off-white);
  }

  span {
    color: var(--gray);
    font-size: 0.85rem;
  }
`;

const SocialButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const SocialButton = styled.button`
  padding: 0.75rem;
  border: 2px solid var(--off-white);
  background: var(--white);
  border-radius: 10px;
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  font-weight: 500;

  &:hover {
    border-color: var(--primary-pink);
    transform: translateY(-2px);
  }

  i {
    font-size: 1.2rem;
  }

  &.google i {
    color: #ea4335;
  }

  &.facebook i {
    color: #1877f2;
  }
`;

const LoginPrompt = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.95rem;
  color: var(--gray);

  a {
    color: var(--primary-pink);
    text-decoration: none;
    font-weight: 600;
    transition: color var(--transition-fast);

    &:hover {
      color: var(--secondary-pink);
    }
  }
`;

const ErrorMessage = styled.div`
  background: #fee;
  color: #c33;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-align: center;
  border: 1px solid #fcc;
`;

const SuccessMessage = styled.div`
  background: #efe;
  color: #3c3;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-align: center;
  border: 1px solid #cfc;
`;

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const username = `${formData.firstName} ${formData.lastName}`;
      const result = register(formData.email, username, formData.password);
      
      if (result.success) {
        setSuccess('Account created successfully! Redirecting...');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegisterWrapper>
      <RegisterCard>
        <Logo>
          <h1>Create Account</h1>
          <p>Join us and start shopping!</p>
        </Logo>

        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
          
          <FormRow>
            <FormGroup>
              <Label htmlFor="firstName">First Name</Label>
              <InputWrapper>
                <i className="fas fa-user"></i>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  autoComplete="given-name"
                  disabled={isLoading}
                  required
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="lastName">Last Name</Label>
              <InputWrapper>
                <i className="fas fa-user"></i>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  autoComplete="family-name"
                  disabled={isLoading}
                  required
                />
              </InputWrapper>
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <InputWrapper>
              <i className="fas fa-envelope"></i>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                disabled={isLoading}
                required
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <InputWrapper>
              <i className="fas fa-lock"></i>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password (min 6 characters)"
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
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                autoComplete="new-password"
                disabled={isLoading}
                required
              />
            </InputWrapper>
          </FormGroup>

          <CheckboxGroup>
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
            <span>
              I agree to the <Link to="/terms">Terms & Conditions</Link>
            </span>
          </CheckboxGroup>

          <SubmitButton type="submit" disabled={isLoading}>
            <i className="fas fa-user-plus"></i> {isLoading ? 'Creating Account...' : 'Create Account'}
          </SubmitButton>
        </Form>

        <Divider>
          <span>OR</span>
        </Divider>

        <SocialButtons>
          <SocialButton className="google">
            <i className="fab fa-google"></i> Google
          </SocialButton>
          <SocialButton className="facebook">
            <i className="fab fa-facebook-f"></i> Facebook
          </SocialButton>
        </SocialButtons>

        <LoginPrompt>
          Already have an account? <Link to="/login">Login</Link>
        </LoginPrompt>
      </RegisterCard>
    </RegisterWrapper>
  );
};

export default Register;
