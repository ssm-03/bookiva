// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCyHr3B3mRWHS9NQ-ezaXA6JFsT8Jw31ng",
  authDomain: "quick-test-6788e.firebaseapp.com",
  projectId: "quick-test-6788e",
  storageBucket: "quick-test-6788e.appspot.com",
  messagingSenderId: "175116675341",
  appId: "1:175116675341:web:702181b854ca82ca0de844",
  measurementId: "G-1JL4J7D26D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const authProvider = new GoogleAuthProvider();

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.querySelector(".home-content").innerHTML = `
      <span class="loader"></span>
    `;
    location.href = "/venues/";
  }
});

feather.replace();

const signInBtn = document.querySelector(".sign-in");
const signIntWithG = document.querySelector(".sign-in-with-g");

signInBtn.onclick = (e) => {
  e.preventDefault();

  const email = document.querySelector(".input-user").value;
  const pwd = document.querySelector(".input-pwd").value;
  console.log(email, pwd);

  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      signInWithEmailAndPassword(auth, email, pwd)
        .then((result) => {
          console.log(result.user);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => console.log(err));
};

signIntWithG.onclick = (e) => {
  signInWithPopup(auth, authProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);

      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      console.log(result, user);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode, errorMessage);
    });
};
