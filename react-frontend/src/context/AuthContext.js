import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

const ADMIN_EMAIL = 'zoesacessories23@gmail.com';
const ADMIN_PASSWORD = 'Z30$321!';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    // Load user from localStorage on init
    const savedUser = localStorage.getItem('zoiesCurrentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [users, setUsers] = useState(() => {
    // Load users from localStorage
    const savedUsers = localStorage.getItem('zoiesUsers');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  // Save current user to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('zoiesCurrentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('zoiesCurrentUser');
    }
  }, [currentUser]);

  // Save users to localStorage
  useEffect(() => {
    localStorage.setItem('zoiesUsers', JSON.stringify(users));
  }, [users]);

  const login = (email, password) => {
    // Check if admin
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser = {
        id: 'admin',
        email: ADMIN_EMAIL,
        username: 'Admin',
        role: 'admin',
        profilePicture: '/Image/Zoies logo.png',
        createdAt: new Date().toISOString()
      };
      setCurrentUser(adminUser);
      return { success: true, user: adminUser };
    }

    // Check regular users - read fresh data from localStorage in case password was reset
    const freshUsers = JSON.parse(localStorage.getItem('zoiesUsers') || '[]');
    const user = freshUsers.find(u => u.email === email && u.password === password);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      return { success: true, user: userWithoutPassword };
    }

    return { success: false, error: 'Invalid email or password' };
  };

  const register = (email, username, password) => {
    // Check if email already exists
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }

    // Check if username already exists
    if (users.find(u => u.username === username)) {
      return { success: false, error: 'Username already taken' };
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      username,
      password, // In production, this should be hashed!
      role: 'user',
      profilePicture: '/Image/Zoies logo.png',
      createdAt: new Date().toISOString()
    };

    setUsers([...users, newUser]);
    
    // Auto-login after registration
    const { password: _, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword);
    
    return { success: true, user: userWithoutPassword };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updates) => {
    if (!currentUser) return { success: false, error: 'Not logged in' };

    // Admin profile update
    if (currentUser.role === 'admin') {
      const updatedUser = { ...currentUser, ...updates };
      setCurrentUser(updatedUser);
      return { success: true, user: updatedUser };
    }

    // Regular user profile update
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex === -1) return { success: false, error: 'User not found' };

    // Check if username is being changed and if it's already taken
    if (updates.username && updates.username !== currentUser.username) {
      if (users.find(u => u.username === updates.username && u.id !== currentUser.id)) {
        return { success: false, error: 'Username already taken' };
      }
    }

    // Update user in users array
    const updatedUsers = [...users];
    updatedUsers[userIndex] = { ...updatedUsers[userIndex], ...updates };
    setUsers(updatedUsers);

    // Update current user (without password)
    const { password, ...userWithoutPassword } = updatedUsers[userIndex];
    setCurrentUser(userWithoutPassword);

    return { success: true, user: userWithoutPassword };
  };

  const changePassword = (currentPassword, newPassword) => {
    if (!currentUser) return { success: false, error: 'Not logged in' };

    // Admin password change
    if (currentUser.role === 'admin') {
      if (currentPassword === ADMIN_PASSWORD) {
        // Note: In a real app, you'd need to update this in a backend
        return { success: true, message: 'Admin password updated (requires system update)' };
      }
      return { success: false, error: 'Current password is incorrect' };
    }

    // Regular user password change
    const user = users.find(u => u.id === currentUser.id);
    if (!user) return { success: false, error: 'User not found' };

    if (user.password !== currentPassword) {
      return { success: false, error: 'Current password is incorrect' };
    }

    // Update password
    const updatedUsers = users.map(u => 
      u.id === currentUser.id ? { ...u, password: newPassword } : u
    );
    setUsers(updatedUsers);

    return { success: true, message: 'Password updated successfully' };
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.role === 'admin',
    login,
    register,
    logout,
    updateProfile,
    changePassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
