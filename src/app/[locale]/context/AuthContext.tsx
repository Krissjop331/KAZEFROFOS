'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (token: string) => void;
  logout: () => void;
}

interface DecodedToken {
  username: string;
  role: string;
  exp: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setIsAuthenticated(true);
        setIsAdmin(decoded.role === 'admin');
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  }, []);

  const login = (token: string) => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      setIsAdmin(decoded.role === 'admin');
      router.push('/');
    } catch (error) {
      console.error('Invalid token:', error);
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setIsAdmin(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};