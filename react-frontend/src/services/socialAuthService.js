// Social Authentication Service

// Generate a mock OAuth token
const generateMockToken = (provider, email, name) => {
  return {
    provider,
    email,
    name,
    id: Date.now().toString(),
    timestamp: new Date().toISOString()
  };
};

export const handleGoogleLogin = async (setError, setSuccess) => {
  try {
    // In production, you would use: @react-oauth/google package
    // and call: googleLogin() from the GoogleLogin component
    
    // For demo purposes, we'll simulate Google login
    const mockGoogleUser = {
      email: prompt('Enter email for demo Google login:') || 'user@gmail.com',
      name: prompt('Enter name for demo Google login:') || 'Google User'
    };

    if (!mockGoogleUser.email || mockGoogleUser.email === '') {
      setError('Google login cancelled');
      return null;
    }

    const token = generateMockToken('google', mockGoogleUser.email, mockGoogleUser.name);
    
    // Store the social login token
    localStorage.setItem('socialAuthToken', JSON.stringify(token));

    // Check if user exists, if not create new user
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    let user = users.find(u => u.email === mockGoogleUser.email);

    if (!user) {
      user = {
        id: Date.now().toString(),
        email: mockGoogleUser.email,
        username: mockGoogleUser.name.split(' ')[0],
        firstName: mockGoogleUser.name.split(' ')[0],
        lastName: mockGoogleUser.name.split(' ')[1] || '',
        password: Math.random().toString(36).substr(2, 9), // Random password
        role: 'user',
        profilePicture: null,
        createdAt: new Date().toISOString(),
        socialAuth: 'google'
      };

      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
    }

    setSuccess(`Welcome back, ${user.firstName}!`);
    return user;
  } catch (error) {
    setError('Google login failed. Please try again.');
    console.error('Google login error:', error);
    return null;
  }
};

export const handleFacebookLogin = async (setError, setSuccess) => {
  try {
    // In production, you would use: react-facebook-login package
    // and call: facebookLogin() from the FacebookLogin component
    
    // For demo purposes, we'll simulate Facebook login
    const mockFacebookUser = {
      email: prompt('Enter email for demo Facebook login:') || 'user@facebook.com',
      name: prompt('Enter name for demo Facebook login:') || 'Facebook User'
    };

    if (!mockFacebookUser.email || mockFacebookUser.email === '') {
      setError('Facebook login cancelled');
      return null;
    }

    const token = generateMockToken('facebook', mockFacebookUser.email, mockFacebookUser.name);
    
    // Store the social login token
    localStorage.setItem('socialAuthToken', JSON.stringify(token));

    // Check if user exists, if not create new user
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    let user = users.find(u => u.email === mockFacebookUser.email);

    if (!user) {
      user = {
        id: Date.now().toString(),
        email: mockFacebookUser.email,
        username: mockFacebookUser.name.split(' ')[0],
        firstName: mockFacebookUser.name.split(' ')[0],
        lastName: mockFacebookUser.name.split(' ')[1] || '',
        password: Math.random().toString(36).substr(2, 9), // Random password
        role: 'user',
        profilePicture: null,
        createdAt: new Date().toISOString(),
        socialAuth: 'facebook'
      };

      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
    }

    setSuccess(`Welcome back, ${user.firstName}!`);
    return user;
  } catch (error) {
    setError('Facebook login failed. Please try again.');
    console.error('Facebook login error:', error);
    return null;
  }
};

export const getSocialAuthToken = () => {
  const token = localStorage.getItem('socialAuthToken');
  return token ? JSON.parse(token) : null;
};

export const clearSocialAuthToken = () => {
  localStorage.removeItem('socialAuthToken');
};

// Production setup instructions for real OAuth:
/*
GOOGLE OAUTH SETUP:
1. Install: npm install @react-oauth/google
2. Get credentials from: https://console.cloud.google.com/
3. Wrap app with GoogleOAuthProvider in main App component
4. Use GoogleLogin component

FACEBOOK OAUTH SETUP:
1. Install: npm install react-facebook-login
2. Get App ID from: https://developers.facebook.com/
3. Add Facebook SDK to public/index.html
4. Use FacebookLogin component

Example production code:
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

// In component:
<GoogleLogin
  onSuccess={handleGoogleSuccess}
  onError={handleGoogleError}
/>

<FacebookLogin
  appId="YOUR_APP_ID"
  autoLoad={false}
  fields="name,email,picture"
  onClick={handleFacebookClick}
  callback={handleFacebookResponse}
/>
*/
