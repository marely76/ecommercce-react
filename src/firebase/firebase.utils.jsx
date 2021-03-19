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
    const userRef= firestore.doc(`users/${userAuth.uid}`);
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
       

export const addCollectionsAndDocuments = async (collectionKey, objectsToAdd)=> {
const collectionRef = firestore.collection(collectionKey);
const batch = firestore.batch();
objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set( newDocRef, obj);
});
return await batch.commit();
}


export const convertCollectionsSnapshotToMap = (collections) => {
    const transformCollections = collections.docs.map(doc => {
        const { title, items } = doc.data();
        return{
            routName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
        
    });
   
    return transformCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()]= collection;
    return accumulator;
    }, {})


}

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider= new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle =()=> auth.signInWithPopup(provider);