import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const ProfileWrapper = styled.div`
  min-height: 100vh;
  padding: 6rem 1rem 3rem;
  background: linear-gradient(135deg, rgba(255,127,169,0.1), rgba(255,226,236,0.3));
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const ProfileCard = styled.div`
  background: var(--white);
  border-radius: 25px;
  box-shadow: var(--shadow-3d);
  padding: 3rem;
  animation: scaleIn 0.5s ease;

  @media (max-width: 480px) {
    padding: 2rem;
  }
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

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

const ProfilePictureSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
`;

const ProfilePicture = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid var(--primary-pink);
  box-shadow: var(--shadow-pink);
  margin-bottom: 1rem;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent, rgba(255, 105, 180, 0.2));
  }
`;

const UploadButton = styled.label`
  padding: 0.75rem 1.5rem;
  background: var(--gradient-pink);
  color: var(--white);
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-pink);
  }

  input {
    display: none;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Section = styled.div`
  border-bottom: 2px solid var(--off-white);
  padding-bottom: 2rem;

  h2 {
    font-size: 1.5rem;
    color: var(--primary-black);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    i {
      color: var(--primary-pink);
    }
  }

  &:last-child {
    border-bottom: none;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 0.9rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;

  &.primary {
    background: var(--gradient-pink);
    color: var(--white);
    border: none;
    box-shadow: var(--shadow-pink);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 32px rgba(255, 105, 180, 0.5);
    }
  }

  &.secondary {
    background: var(--white);
    color: var(--primary-black);
    border: 2px solid var(--off-white);

    &:hover {
      border-color: var(--primary-pink);
      transform: translateY(-2px);
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`;

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, updateProfile, changePassword } = useAuth();
  
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    profilePicture: ''
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (currentUser) {
      setProfileData({
        username: currentUser.username || '',
        email: currentUser.email || '',
        profilePicture: currentUser.profilePicture || ''
      });
    }
  }, [currentUser, isAuthenticated, navigate]);

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you'd upload to a server
      // For now, we'll use a local URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({
          ...profileData,
          profilePicture: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const result = updateProfile({
        username: profileData.username,
        profilePicture: profileData.profilePicture
      });

      if (result.success) {
        setSuccess('Profile updated successfully!');
      } else {
        setError(result.error || 'Failed to update profile');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const result = changePassword(passwordData.currentPassword, passwordData.newPassword);

      if (result.success) {
        setSuccess(result.message);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        setError(result.error || 'Failed to change password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser) return null;

  return (
    <ProfileWrapper>
      <Container>
        <ProfileCard>
          <ProfileHeader>
            <h1>My Profile</h1>
            <p>Manage your account settings</p>
          </ProfileHeader>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          <ProfilePictureSection>
            <ProfilePicture>
              <img 
                src={profileData.profilePicture || '/Image/Zoies logo.png'} 
                alt={profileData.username} 
              />
            </ProfilePicture>
            <UploadButton>
              <i className="fas fa-camera"></i>
              Change Picture
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                disabled={isLoading}
              />
            </UploadButton>
          </ProfilePictureSection>

          <Form onSubmit={handleProfileUpdate}>
            <Section>
              <h2>
                <i className="fas fa-user"></i>
                Personal Information
              </h2>
              
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <InputWrapper>
                  <i className="fas fa-user"></i>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    value={profileData.username}
                    onChange={handleProfileChange}
                    placeholder="Enter your username"
                    autoComplete="username"
                    disabled={isLoading}
                    required
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email Address</Label>
                <InputWrapper>
                  <i className="fas fa-envelope"></i>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    disabled
                    readOnly
                  />
                </InputWrapper>
              </FormGroup>

              <ButtonGroup>
                <Button type="button" className="secondary" onClick={() => navigate('/')}>
                  <i className="fas fa-times"></i>
                  Cancel
                </Button>
                <Button type="submit" className="primary" disabled={isLoading}>
                  <i className="fas fa-save"></i>
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </ButtonGroup>
            </Section>
          </Form>

          <Form onSubmit={handlePasswordUpdate}>
            <Section>
              <h2>
                <i className="fas fa-lock"></i>
                Change Password
              </h2>
              
              <FormGroup>
                <Label htmlFor="currentPassword">Current Password</Label>
                <InputWrapper>
                  <i className="fas fa-lock"></i>
                  <Input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                    autoComplete="current-password"
                    disabled={isLoading}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="newPassword">New Password</Label>
                <InputWrapper>
                  <i className="fas fa-lock"></i>
                  <Input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password (min 6 characters)"
                    disabled={isLoading}
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <InputWrapper>
                  <i className="fas fa-lock"></i>
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                    disabled={isLoading}
                  />
                </InputWrapper>
              </FormGroup>

              <ButtonGroup>
                <Button 
                  type="submit" 
                  className="primary" 
                  disabled={isLoading || !passwordData.currentPassword || !passwordData.newPassword}
                >
                  <i className="fas fa-key"></i>
                  {isLoading ? 'Updating...' : 'Update Password'}
                </Button>
              </ButtonGroup>
            </Section>
          </Form>
        </ProfileCard>
      </Container>
    </ProfileWrapper>
  );
};

export default Profile;
