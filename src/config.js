import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyD_PU5bw4-vNEYL5ew7sow970gTu-ZtLG4",
        authDomain: "modloans-f8d62.firebaseapp.com",
        projectId: "modloans-f8d62",
        storageBucket: "modloans-f8d62.appspot.com",
        messagingSenderId: "398266070886",
        appId: "1:398266070886:web:d684c75954cb090ae3faa7",
        measurementId: "G-61MQ0SD6LJ",
        databaseURL: "https://modloans-f8d62-default-rtdb.firebaseio.com"
  });
  
  export default firebaseConfig;
