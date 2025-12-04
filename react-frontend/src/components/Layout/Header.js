import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: var(--white);
  box-shadow: var(--shadow-sm);
  animation: fadeInDown 0.6s ease;

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const HeaderTop = styled.div`
  background: var(--gradient-pink);
  color: var(--white);
  padding: 10px 0;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
`;

const Navbar = styled.nav`
  padding: 1rem 0;
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-pink);

  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
    transition: transform var(--transition-normal);
  }

  &:hover img {
    transform: rotate(360deg) scale(1.1);
  }
`;

const NavMenu = styled.ul`
  display: flex;
  gap: 2rem;

  @media (max-width: 900px) {
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    position: fixed;
    top: 110px;
    left: 0;
    width: 100%;
    height: calc(100vh - 110px);
    background: var(--white);
    flex-direction: column;
    padding: 1.5rem;
    box-shadow: var(--shadow-lg);
    overflow-y: auto;
    z-index: 999;
  }
`;

const NavLink = styled(Link)`
  color: var(--primary-black);
  font-weight: 500;
  position: relative;
  padding: 0.5rem 0;
  font-size: clamp(0.9rem, 2vw, 1rem);

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--gradient-pink);
    transition: width var(--transition-normal);
  }

  &:hover::after,
  &.active::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 0;
    font-size: 1rem;
  }
`;

const NavIcons = styled.div`
  display: flex;
  gap: 1rem;
`;

const IconBtn = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--off-white);
  color: var(--primary-black);
  position: relative;
  transition: all var(--transition-normal);
  font-size: clamp(0.9rem, 2vw, 1.1rem);

  &:hover {
    background: var(--gradient-pink);
    color: var(--white);
    transform: translateY(-3px);
    box-shadow: var(--shadow-pink);
  }

  @media (max-width: 480px) {
    width: 38px;
    height: 38px;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: var(--secondary-pink);
  color: var(--white);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

const MobileToggle = styled.button`
  display: none;
  flex-direction: column;
  gap: 5px;
  background: transparent;

  span {
    width: 25px;
    height: 3px;
    background: var(--primary-pink);
    border-radius: 3px;
    transition: all var(--transition-normal);
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const ProfileWrapper = styled.div`
  position: relative;
`;

const ProfileBtn = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-pink);
  color: var(--white);
  position: relative;
  transition: all var(--transition-normal);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-pink);
  }
`;

const ProfileDropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: var(--white);
  border-radius: 15px;
  box-shadow: var(--shadow-lg);
  padding: 0.5rem 0;
  min-width: 200px;
  opacity: ${props => props.$isOpen ? '1' : '0'};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all var(--transition-fast);
  z-index: 1001;

  &::before {
    content: '';
    position: absolute;
    top: -8px;
    right: 12px;
    width: 16px;
    height: 16px;
    background: var(--white);
    transform: rotate(45deg);
    box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.05);
  }
`;

const DropdownHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid var(--off-white);

  p {
    font-weight: 600;
    color: var(--primary-black);
    margin-bottom: 0.25rem;
  }

  span {
    font-size: 0.85rem;
    color: var(--gray);
  }
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: var(--primary-black);
  transition: all var(--transition-fast);
  position: relative;
  z-index: 1;

  i {
    width: 20px;
    color: var(--primary-pink);
  }

  &:hover {
    background: var(--off-white);
    padding-left: 1.25rem;
  }
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: var(--primary-black);
  transition: all var(--transition-fast);
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  cursor: pointer;

  i {
    width: 20px;
    color: var(--primary-pink);
  }

  &:hover {
    background: var(--off-white);
    padding-left: 1.25rem;
  }

  &.logout {
    color: #dc3545;
    border-top: 1px solid var(--off-white);
    margin-top: 0.5rem;

    i {
      color: #dc3545;
    }
  }
`;

const Header = ({ cartCount }) => {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, isAdmin, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavLinkClick = () => {
    setIsOpen(false);
    // Scroll to top with smooth behavior
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate('/');
  };

  return (
    <HeaderWrapper>
      <HeaderTop>
        <div className="container">
          <span>✨ FREE SHIPPING ON ALL ORDERS ✨</span>
        </div>
      </HeaderTop>
      <Navbar>
        <NavContainer>
          <Logo to="/">
            <img src="/Image/Zoies logo.png" alt="Zoie's" />
            <span>Zoe's Accessories</span>
          </Logo>
          
          <MobileToggle onClick={() => setIsOpen(!isOpen)}>
            <span />
            <span />
            <span />
          </MobileToggle>

          <NavMenu $isOpen={isOpen}>
            <li><NavLink to="/" onClick={handleNavLinkClick}>Home</NavLink></li>
            <li><NavLink to="/shop" onClick={handleNavLinkClick}>Shop</NavLink></li>
            <li><NavLink to="/reviews" onClick={handleNavLinkClick}>Reviews</NavLink></li>
            <li><NavLink to="/about" onClick={handleNavLinkClick}>About</NavLink></li>
            <li><NavLink to="/contact" onClick={handleNavLinkClick}>Contact</NavLink></li>
          </NavMenu>

          <NavIcons>
            <IconBtn title="Search">
              <i className="fas fa-search"></i>
            </IconBtn>
            
            {isAuthenticated ? (
              <ProfileWrapper ref={dropdownRef}>
                <ProfileBtn onClick={() => setProfileOpen(!profileOpen)} title={currentUser?.username}>
                  {currentUser?.profilePicture ? (
                    <img src={currentUser.profilePicture} alt={currentUser.username} />
                  ) : (
                    <i className="fas fa-user"></i>
                  )}
                </ProfileBtn>
                
                <ProfileDropdown $isOpen={profileOpen}>
                  <DropdownHeader>
                    <p>{currentUser?.username}</p>
                    <span>{currentUser?.email}</span>
                  </DropdownHeader>
                  
                  <DropdownItem to="/profile" onClick={() => { setProfileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    <i className="fas fa-user-edit"></i>
                    <span>Update Profile</span>
                  </DropdownItem>
                  
                  {isAdmin && (
                    <DropdownItem to="/admin" onClick={() => { setProfileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                      <i className="fas fa-tachometer-alt"></i>
                      <span>Admin Dashboard</span>
                    </DropdownItem>
                  )}
                  
                  <DropdownButton onClick={handleLogout} className="logout">
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                  </DropdownButton>
                </ProfileDropdown>
              </ProfileWrapper>
            ) : (
              <IconBtn as={Link} to="/login" title="Login">
                <i className="fas fa-user"></i>
              </IconBtn>
            )}
            
            <IconBtn as={Link} to="/cart" title="Cart">
              <i className="fas fa-shopping-cart"></i>
              {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
            </IconBtn>
          </NavIcons>
        </NavContainer>
      </Navbar>
    </HeaderWrapper>
  );
};

export default Header;
