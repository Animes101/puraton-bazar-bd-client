
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import auth from "../../fire_base/firebase";
import { GoogleAuthProvider,onAuthStateChanged  } from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setUser]=useState(null);

    const googleProvider = new GoogleAuthProvider();

        const signUpUser=(email,password)=>{
            return createUserWithEmailAndPassword(auth, email, password)
        }

        const signInUser=(email,password)=>{
            return signInWithEmailAndPassword(auth, email, password)
        }

        const googleSignIn=()=>{
            return signInWithPopup(auth, googleProvider)
        }

        const logOUt=()=>{
            return signOut(auth)
        }


        const authInfo={
            signUpUser,
            signInUser,
            googleSignIn,
            logOUt,
            user,
            setUser
        }


            useEffect(()=>{
            const onSubscrib=   onAuthStateChanged(auth, (curentUser) => {
                    if (curentUser) {
                    console.log(curentUser)
                    } else {
                    // User is signed out
                    // ...

                    console.log('user log log out')
                    }
                })

                return ()=>{
                    onSubscrib();
                }
            })


            return (
                <div>
                <AuthContext.Provider value={authInfo}>
                    {children}
                </AuthContext.Provider>
                </div>
            );
            };

            export default AuthProvider;

