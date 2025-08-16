import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../firebase/firebase';

import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile, signOut } from 'firebase/auth';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const provider = new GoogleAuthProvider();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [modalType, setModalType] = useState(null);

    // This listener handles the auth state changes automatically
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUserData(currentUser);
            setLoading(false);
        });
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        }
    }, []);

    const signUpEmailAndPass = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInEmailAndPassword = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInGoogleHandle = () => {
        return signInWithPopup(auth, provider);
    };

    const logOut = () => {
        return signOut(auth);
    };

    const closeModal = () => setModalType(null);

    const authInfo = {
        signUpEmailAndPass,
        signInEmailAndPassword,
        signInGoogleHandle,
        userData,
        setUserData,
        errorMsg,
        setErrorMsg,
        closeModal,
        modalType,
        setModalType,
        loading,
        logOut,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;