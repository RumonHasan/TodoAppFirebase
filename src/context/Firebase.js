import React from 'react';
import firebase from 'firebase';
import 'firebase/firestore'; // firebase google signin authentification

const fireStoreDataBase = firebase.initializeApp(
    {
        apiKey: "AIzaSyCC03_18OgQWWKjwk9qTJdlfymE5r49fhU",
        authDomain: "todoapp-3cd43.firebaseapp.com",
        projectId: "todoapp-3cd43",
        storageBucket: "todoapp-3cd43.appspot.com",
        messagingSenderId: "69461819691",
        appId: "1:69461819691:web:9ffbed894605c01d46456e",
        measurementId: "G-N1Q55E4FFF",
    }
);

const TodoDataBase = fireStoreDataBase.firestore(); // already connected to firestore 
export const auth = fireStoreDataBase.auth();
export { TodoDataBase };