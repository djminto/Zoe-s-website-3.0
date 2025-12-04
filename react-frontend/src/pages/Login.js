import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { handleGoogleLogin, handleFacebookLogin } from '../services/socialAuthService';

const LoginWrapper = styled.div`
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

const LoginCard = styled.div`
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

const ForgotPassword = styled(Link)`
  text-align: right;
  font-size: 0.85rem;
  color: var(--primary-pink);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--transition-fast);

  &:hover {
    color: var(--secondary-pink);
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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

const SignUpPrompt = styled.div`
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

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSocialLogin = async (provider) => {
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      let user;
      
      if (provider === 'google') {
        user = await handleGoogleLogin(setError, setSuccess);
      } else if (provider === 'facebook') {
        user = await handleFacebookLogin(setError, setSuccess);
      }

      if (user) {
        // Login with the social auth user
        const result = login(user.email, user.password);
        
        if (result.success) {
          setSuccess(`Welcome back, ${result.user.firstName}!`);
          setTimeout(() => {
            if (result.user.role === 'admin') {
              navigate('/admin');
            } else {
              navigate('/');
            }
          }, 1000);
        } else {
          // If login fails, the user was created but not logged in
          setSuccess(`Account created! Logging you in...`);
          const loginRetry = login(user.email, user.password);
          if (loginRetry.success) {
            setTimeout(() => {
              navigate('/');
            }, 1000);
          }
        }
      }
    } catch (err) {
      setError('Social login failed. Please try again.');
      console.error('Social login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const result = login(formData.email, formData.password);
      
      if (result.success) {
        setSuccess(`Welcome back, ${result.user.username}!`);
        setTimeout(() => {
          if (result.user.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/');
          }
        }, 1000);
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginWrapper>
      <LoginCard>
        <Logo>
          <h1>Welcome Back</h1>
          <p>Login to access your account</p>
        </Logo>

        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
          
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
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={isLoading}
                required
              />
            </InputWrapper>
          </FormGroup>

          <ForgotPassword to="/forgot-password">Forgot Password?</ForgotPassword>

          <SubmitButton type="submit" disabled={isLoading}>
            <i className="fas fa-sign-in-alt"></i> {isLoading ? 'Logging in...' : 'Login'}
          </SubmitButton>
        </Form>

        <Divider>
          <span>OR</span>
        </Divider>

        <SocialButtons>
          <SocialButton 
            className="google" 
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
            type="button"
          >
            <i className="fab fa-google"></i> Google
          </SocialButton>
          <SocialButton 
            className="facebook" 
            onClick={() => handleSocialLogin('facebook')}
            disabled={isLoading}
            type="button"
          >
            <i className="fab fa-facebook-f"></i> Facebook
          </SocialButton>
        </SocialButtons>

        <SignUpPrompt>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </SignUpPrompt>
      </LoginCard>
    </LoginWrapper>
  );
};

export default Login;
