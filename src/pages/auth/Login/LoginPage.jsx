import React from 'react';
import Login from '../../../Components/auth/Login/Login';
import { useSelector } from 'react-redux';
import Home from '../../Home/Home'
const LoginPage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>
      {!isAuthenticated ? <Login /> : <Home />}
    </>
  );
};

export default LoginPage;
