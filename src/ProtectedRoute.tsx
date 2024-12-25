import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface ProtectedRouteProps {
    component: React.ComponentType<any>; 
  }

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state: any) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
