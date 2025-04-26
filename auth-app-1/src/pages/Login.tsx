import React from 'react';
import GoogleSignInButton from '../components/Auth/GoogleSignInButton';
import EmailPasswordSignInForm from '../components/Auth/EmailPasswordSignInForm';
import Header from '../components/common/Header';

const Login = () => {
  return (
    <div className="login-container">
      <Header />
      <h2>Login</h2>
      <GoogleSignInButton />
      <EmailPasswordSignInForm />
    </div>
  );
};

export default Login;