import React from 'react'
import Register from '../../../Components/auth/Register/Register'
import { useSelector } from 'react-redux'
import Home from '../../Home/Home'
const RegisterPage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>
    {!isAuthenticated ? <Register /> : <Home />}
  </>
  )
}

export default RegisterPage