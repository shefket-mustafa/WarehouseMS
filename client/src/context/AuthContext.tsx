import { useState, type ReactNode } from 'react';
import { AuthContext } from './authContext-hook';

interface User {
  id: string;
  email: string;
  companyName: string
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firmName: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}



export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('wms_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string) => {
    console.log(email, password);
    
    // // Simulate login - in real app, this would call an API
    // const userData = { id: '1', email };
    // setUser(userData);
    // localStorage.setItem('wms_user', JSON.stringify(userData));
  };

  const register = async (email: string, password: string, companyName: string) => {
    console.log(email, password, companyName);
    
    // // Simulate registration - in real app, this would call an API
    // const userData = { id: '1', email, firmName };
    // setUser(userData);
    // localStorage.setItem('wms_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wms_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};


