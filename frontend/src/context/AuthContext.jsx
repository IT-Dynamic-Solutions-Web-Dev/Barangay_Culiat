import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      console.log('🔐 AuthContext: Checking authentication...');
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      console.log('🎫 Token exists:', !!token);
      console.log('👤 User data exists:', !!userData);
      
      if (token && userData) {
        try {
          // Set axios default header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          console.log('📡 Fetching fresh user data from /api/auth/me...');
          // Verify token is still valid by fetching user data
          const response = await axios.get(`${API_URL}/api/auth/me`);
          const currentUser = response.data.data;
          
          console.log('✅ Received user data from server:', currentUser);
          
          // Preserve token from localStorage, use all other data from server
          const oldData = JSON.parse(userData);
          const updatedUser = {
            ...currentUser,  // Use fresh data from server as base
            token: oldData.token || token,  // Preserve the token
          };
          
          console.log('💾 Setting user in context:', updatedUser);
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (error) {
          // Token is invalid, clear storage
          console.error('❌ Token validation failed:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          delete axios.defaults.headers.common['Authorization'];
          setUser(null);
        }
      } else {
        console.log('📭 No token or user data found');
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      console.log('🔑 AuthContext: Attempting login for:', username);
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        username,
        password,
      });

      const { data } = response.data;
      console.log('✅ Login successful, basic user data:', data);
      
      // Save token and set authorization header
      localStorage.setItem('token', data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
      // Immediately fetch complete user profile
      console.log('📡 Fetching complete user profile from /api/auth/me...');
      try {
        const meResponse = await axios.get(`${API_URL}/api/auth/me`);
        const completeUser = meResponse.data.data;
        console.log('✅ Received complete user data:', completeUser);
        
        // Combine complete user data with token
        const fullUserData = {
          ...completeUser,
          token: data.token,
        };
        
        console.log('💾 Setting complete user in context:', fullUserData);
        localStorage.setItem('user', JSON.stringify(fullUserData));
        setUser(fullUserData);
        
        return { success: true, user: fullUserData };
      } catch (meError) {
        console.error('⚠️ Failed to fetch complete profile, using basic data:', meError);
        // Fallback to basic user data if /me fails
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        return { success: true, user: data };
      }
    } catch (error) {
      console.error('❌ Login failed:', error.response?.data || error);
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const register = async (userData) => {
    try {
      console.log('=== FRONTEND REGISTER FUNCTION ===');
      // Check if userData is FormData (for file upload registration)
      const isFormData = userData instanceof FormData;
      console.log('Is FormData:', isFormData);
      
      // Log FormData contents if it's FormData
      if (isFormData) {
        console.log('FormData contents:');
        for (let [key, value] of userData.entries()) {
          console.log(`${key}:`, value instanceof File ? `File: ${value.name}` : value);
        }
      } else {
        console.log('User Data:', userData);
      }
      
      const config = isFormData ? {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      } : {};
      
      console.log('Sending registration request to:', `${API_URL}/api/auth/register`);
      const response = await axios.post(`${API_URL}/api/auth/register`, userData, config);
      console.log('Registration response:', response.data);
      const { data } = response.data;
      
      // For pending registration, don't log in automatically
      if (data.registrationStatus === 'pending') {
        console.log('Registration pending approval');
        return { success: true, pending: true, data };
      }
      
      // For approved/auto-approved registrations
      if (data.token) {
        console.log('Registration approved, logging in...');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        setUser(data);
      }
      
      return { success: true };
    } catch (error) {
      console.error('=== REGISTRATION ERROR (FRONTEND) ===');
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      console.error('Full error:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.response?.data?.error || 'Registration failed',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('documentRequestForm'); // Clear saved form data
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  // Check if user is Admin or SuperAdmin
  const isAdmin = () => {
    if (!user) return false;
    // Check role name or role code
    return user.role === 'Admin' || user.role === 'SuperAdmin' || user.roleCode === 74933 || user.roleCode === 74932;
  };

  const value = {
    user,
    setUser,
    loading,
    login,
    register,
    logout,
    isAdmin: isAdmin(),
    isResident: user?.role === 'Resident' || user?.roleCode === 74934,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
