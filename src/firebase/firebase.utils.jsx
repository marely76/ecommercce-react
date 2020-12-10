import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config ={
    apiKey: "AIzaSyBfYvE8Hjc8jSTSqNrF6OysWqWYALXLxzk",
    authDomain: "ecommerce-1b56a.firebaseapp.com",
    projectId: "ecommerce-1b56a",
    storageBucket: "ecommerce-1b56a.appspot.com",
    messagingSenderId: "727386318435",
    appId: "1:727386318435:web:4accfb656b93cc5ecaba56",
    measurementId: "G-KPBGPREG31"


};

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef= firestone.doc(`users/${userAuth.uid}`);
    const snapShot= await userRef.get();
    
    if(!snapShot.exists){
        const {displayName, email}= userAuth;
        const createAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        } 
    }
    return userRef;
    };
       



firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestone = firebase.firestore();

const provider= new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle =()=> auth.signInWithPopup(provider);