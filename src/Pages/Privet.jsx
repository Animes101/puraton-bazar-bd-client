import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const Privet = ({ children }) => {
  const { user, loading } = useContext(AuthContext);


  const location=useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/login" replace />;
  }

  return children;
};

export default Privet