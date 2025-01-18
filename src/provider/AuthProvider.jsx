import { auth } from '@/firebase/firebase.config';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, {  createContext, useEffect, useState } from 'react';



export const AuthContext = createContext()
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const provider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic()
    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginUser = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logoutUser = () =>{
        setLoading(true)
        return signOut(auth)
    }
    const updateUserProfile = (name, photoURL)=>{
       return  updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL 
        })
    }
    const loginWithGoogle = () =>{
        return signInWithPopup(auth, provider)
    }
    
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
            if(currentUser){
                const userInfo = {email: currentUser.email}
                axiosPublic.post('/jwt', userInfo)
                .then(res=>{
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                    }

                    
                })
                setLoading(false)
            }
            else{
                localStorage.removeItem('access-token')
                setLoading(false)
            }
            // setLoading(false)
           
        })
        return  () =>{
             return unsubscribe();
        }
     },[])              //eikhane axios public hobe 
    const info = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        loginUser,
        logoutUser,
        updateUserProfile,
        loginWithGoogle
    }
    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;