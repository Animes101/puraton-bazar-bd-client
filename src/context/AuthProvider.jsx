import React, { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, sendPasswordResetEmail, signInWithPopup,  } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import useAxiosPublic from "../hooks/useAxiosPublic";


 export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const axiosPublic =useAxiosPublic();

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

  //forget Password

  const forgatePassword=(email)=>{
   return  sendPasswordResetEmail(auth, email)
  }

  //logout user
  const logout = () => {
    return signOut(auth);
  };
   

  useEffect(() => {
  const unScrid = onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      setLoading(false);

      const email = { email: user.email };
      axiosPublic.post('/jwt', email)
        .then(res => {
          if (res.data.token) {
            localStorage.setItem('ac-token', res.data.token);
          }
        });
    } else {
      setUser(null);
      setLoading(false);
      localStorage.removeItem('ac-token');
    }
  });

  // cleanup MUST be here ⤵️
  return () => unScrid();
}, [axiosPublic]);


  return (
    <AuthContext.Provider
      value={{ user, loading, logout, createUser, loginUser ,googleLogin, forgatePassword}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;