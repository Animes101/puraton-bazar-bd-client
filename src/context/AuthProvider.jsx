import React, { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";


 export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const provider = new GoogleAuthProvider();
  //create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //google login

  const googleLogin=()=>{

    return signInWithPopup(auth, provider);

  }

  //logout user
  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unScrid = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user

          setLoading(false);
          setUser(user);
          const email=user.email

          
          // ...
        } else {
          // User is signed out
          setUser(null);
          setLoading(false);
          localStorage.clear('ac-token')
          // ...
        }

        return () => {
          return unScrid();
        };
      },
      []
    );
  });
  return (
    <AuthContext.Provider
      value={{ user, loading, logout, createUser, loginUser ,googleLogin}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;