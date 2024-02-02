import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [uid, setUid] = useState(null);
    const [email, setEmail] = useState(null);
    const [isVerified, setIsVerified] = useState(false);
    const [firstTime, setFirstTime] = useState(true);
    
    const addUid = (uid) => {
        setUid(uid);
        localStorage.setItem('neza_creator_uid', uid);
    }

    const addEmail = (email) => {
        setEmail(email);
        localStorage.setItem('neza_creator_email',email);
    }

    const addIsVerified = (isVerified) => {
        setIsVerified(isVerified);
        localStorage.setItem('neza_creator_verification',isVerified);
    }

    const addFirstTime = (firstTime) => {
        setFirstTime(firstTime);
        localStorage.setItem('neza_creator_first_time',firstTime);
    }

    const logout = () => {
        setEmail(null);
        setUid(null);
        setIsVerified(false);
        setFirstTime(true);

        localStorage.removeItem('neza_creator_email');
        localStorage.removeItem('neza_creator_uid');
        localStorage.removeItem('neza_creator_verification');
        localStorage.removeItem('neza_creator_first_time');
    }


    const isEmailSet = async () => {
        try{
            let email = localStorage.getItem('neza_creator_email');

            if(email){
                setEmail(email);
            }
        }
        catch(e){
            console.log('error setting email');
        }
    }


    const isUidSet = async () => {
        try{
            let uid = localStorage.getItem('neza_creator_uid');

            if(uid){
                setUid(uid);
            }
        }
        catch(e){
            console.log('error setting uid');
        }
    }

    const isVerifiedSet = async () => {
        try{
            let neza_creator_verification = localStorage.getItem('neza_creator_verification');

            if(neza_creator_verification){
                setIsVerified(neza_creator_verification);
            }
        }
        catch(e){
            console.log('error setting neza_creator_verification');
        }
    }

    const isFirstTimeSet = async () => {
        try{
            let neza_creator_first_time = localStorage.getItem('neza_creator_first_time');

            if(neza_creator_first_time){
                setFirstTime(neza_creator_first_time);
            }
        }
        catch(e){
            console.log('error setting neza_creator_first_time');
        }
    }

    useEffect(()=>{
        isUidSet();
        isEmailSet();
        isVerifiedSet();
        isFirstTimeSet();
    },[])

    return (
        <AuthContext.Provider value={{ uid, email, isVerified, firstTime, addEmail, addUid, addIsVerified, addFirstTime, logout}}>
            { children }
        </AuthContext.Provider>
    )
}