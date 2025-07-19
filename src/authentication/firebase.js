import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6NYEBS8P1UYAB1Ov0fpAg_-HZbPvRngc",
  authDomain: "e-commerce-react-d8190.firebaseapp.com",
  projectId: "e-commerce-react-d8190",
  storageBucket: "e-commerce-react-d8190.firebasestorage.app",
  messagingSenderId: "103414186088",
  appId: "1:103414186088:web:11d8262403c8795b9afbdd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export function crearUsuario(email, password) {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Credenciales", userCredential)
                const user = userCredential.user;
                console.log(user)
                resolve(user)
            })
            .catch((error) => {
                console.log(error.code)
                const errorCode = error.code;
                const errorMessage = error.message;
                reject(error)
            });
    })
}


// Función de logeo y contraseña del usuario - desde firebase
export function loginEmailPass(email, password) {
    return (
        //se crea una promesa, se resuelve o rechaza
        new Promise((resolve, reject) => {

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    console.log("Credenciales", userCredential)
                    const user = userCredential.user;
                    console.log(user)
                    resolve(user)
                })
                .catch((error) => {
                    console.log(error.code, error.message)
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    reject(error)
                });


        })
    )
   
}