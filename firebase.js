import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


export const firebaseConfig={
    apiKey: "AIzaSyCPyIXwYwAbu-H5ACV_4ZPPPP8JuP7PkFs",
    authDomain: "myproject-469fe.firebaseapp.com",
    projectId: "myproject-469fe",
    storageBucket: "myproject-469fe.appspot.com",
    messagingSenderId: "470381204083",
    appId: "1:470381204083:web:0eb01424c85eb0296cd006",
    measurementId: "G-PLLSFTNGNZ"
}
if(!firebase.apps.length){
   firebase.initializeApp(firebaseConfig) 
}
const auth = firebase.auth()
export {auth,firebase}