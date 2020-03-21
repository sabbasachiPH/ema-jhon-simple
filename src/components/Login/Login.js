import React from "react";
import Auth from "./useAuth";

const Login = () => {
  const auth = Auth();
  const handleSignIn = () => {
    auth.signInWithGoolge().then(res => (window.location.pathname = "/review"));
  };

  const handleSignOut = () => {
    auth.signOut().then(res => (window.location.pathname = "/"));
  };
  console.log(auth.user);
  return (
    <div>
      <h1>Please Sign In Before Shipment </h1>
      {auth.user ? (
        <button onClick={handleSignOut}>Sign Out </button>
      ) : (
        <button onClick={handleSignIn}>Sign In With Google</button>
      )}
    </div>
  );
};

export default Login;
