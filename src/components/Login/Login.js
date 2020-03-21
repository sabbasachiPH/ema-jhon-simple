import React from "react";
import Auth from "./use-auth";

const Login = () => {
  const auth = Auth();
  console.log(auth.user);
  return (
    <div>
      <h1>Join The Party !!!!!</h1>
      {auth.user ? (
        <button onClick={auth.signOut}>Sign Out </button>
      ) : (
        <button onClick={auth.signInWithGoolge}>Sign In With Google</button>
      )}
    </div>
  );
};

export default Login;
