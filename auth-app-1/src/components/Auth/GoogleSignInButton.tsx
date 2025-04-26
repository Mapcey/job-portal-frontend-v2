import React from 'react';

const GoogleSignInButton = () => {
  const handleGoogleSignIn = () => {
    // Logic for Google Sign-In goes here
    console.log("Google Sign-In initiated");
  };

  return (
    <button onClick={handleGoogleSignIn} className="google-sign-in-button">
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;