import { Navigate } from 'react-router';
import type { ReactNode } from 'react';
import { useAuth } from '../context/auth/authContext-hook';


interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRouteForLoggedUsers = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRouteForLoggedUsers;
