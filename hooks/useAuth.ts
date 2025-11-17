import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import type { User, GeneratedImage } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string, pass: string) => boolean;
  register: (username: string, pass: string) => boolean;
  logout: () => void;
  saveImage: (image: Omit<GeneratedImage, 'id' | 'createdAt'>) => void;
  getImages: () => GeneratedImage[];
  deleteImage: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = 'ai_image_gen_users';
const GALLERIES_KEY = 'ai_image_gen_galleries';
const CURRENT_USER_KEY = 'ai_image_gen_current_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username: string, pass: string): boolean => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    if (users[username] && users[username] === pass) {
      const loggedInUser = { username };
      setUser(loggedInUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(loggedInUser));
      return true;
    }
    return false;
  };

  const register = (username: string, pass: string): boolean => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    if (users[username]) {
      return false; // User already exists
    }
    users[username] = pass;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const newUser = { username };
    setUser(newUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const getGalleries = useCallback(() => {
    return JSON.parse(localStorage.getItem(GALLERIES_KEY) || '{}');
  }, []);
  
  const saveGalleries = useCallback((galleries: any) => {
    localStorage.setItem(GALLERIES_KEY, JSON.stringify(galleries));
  }, []);

  const saveImage = useCallback((image: Omit<GeneratedImage, 'id' | 'createdAt'>) => {
    if (!user) return;
    const galleries = getGalleries();
    if (!galleries[user.username]) {
      galleries[user.username] = [];
    }
    const newImage: GeneratedImage = {
      ...image,
      id: `img-${Date.now()}-${Math.random()}`,
      createdAt: new Date().toISOString(),
    };
    galleries[user.username].unshift(newImage); // Add to the beginning
    saveGalleries(galleries);
  }, [user, getGalleries, saveGalleries]);

  const getImages = useCallback((): GeneratedImage[] => {
    if (!user) return [];
    const galleries = getGalleries();
    return galleries[user.username] || [];
  }, [user, getGalleries]);
  
  const deleteImage = useCallback((id: string) => {
    if(!user) return;
    const galleries = getGalleries();
    if (galleries[user.username]) {
      galleries[user.username] = galleries[user.username].filter((img: GeneratedImage) => img.id !== id);
      saveGalleries(galleries);
    }
  }, [user, getGalleries, saveGalleries]);

  // FIX: Replaced JSX syntax with React.createElement to prevent parsing errors in a .ts file.
  return React.createElement(
    AuthContext.Provider,
    {
      value: { user, login, register, logout, saveImage, getImages, deleteImage },
    },
    children
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;