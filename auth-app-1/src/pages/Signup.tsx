import React from 'react';
import EmailPasswordSignUpForm from '../components/Auth/EmailPasswordSignUpForm';
import GoogleSignInButton from '../components/Auth/GoogleSignInButton';
import Header from '../components/common/Header';

const Signup = () => {
  return (
    <div className="signup-container">
      <Header />
      <h2>Create an Account</h2>
      <GoogleSignInButton />
      <EmailPasswordSignUpForm />
    </div>
  );
};

export default Signup;