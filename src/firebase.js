import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyB97d44iR5CG-CEdZ7R4KfaGRA5PpI9R4s',
    authDomain: 'web1c3-rubrica.firebaseapp.com',
    projectId: 'web1c3-rubrica',
    storageBucket: 'web1c3-rubrica.appspot.com',
    messagingSenderId: '749792882811',
    appId: '1:749792882811:web:3c3fa02ca7f2abddf472de',
    measurementId: 'G-PY62CRBJXG',
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();

export { db, auth };
