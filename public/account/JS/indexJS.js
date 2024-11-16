// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getDatabase, set, get, ref, child, update, remove } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// db connect js
import {apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId, measurementId} from "./dbAuth.js";

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    databaseURL: databaseURL,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
let dbRef = ref(db);

let loginUsername = document.getElementById("loginUsername");
let loginPassword = document.getElementById("loginPassword");
let loginbtn = document.getElementById("loginbtn");
let divLoading = document.getElementById("divLoading");

let retryLogin = document.getElementById("retryLogin")
let failedLogin = document.getElementById("failedLogin");
let failedHeading = document.getElementById("failedHeading");
let failedLoginText = document.getElementById("failedLoginText");


//Login Process
loginbtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (loginUsername.value != "" || loginPassword.value != "") {
        divLoading.style.setProperty('visibility', 'visible');

        const mail = loginUsername.value;
        const pass = loginPassword.value + "@pass";

        const auth = getAuth();

        signInWithEmailAndPassword(auth, mail, pass)
            .then((userCredential) => {
                localStorage.setItem('userID', mail.split("@")[0]);
                window.location = 'Dashboard.html';
            }).catch((error) => {
                failedLoginText.innerText = "Error : " + error;
                divLoading.style.setProperty('visibility', 'hidden');
                failedLogin.style.setProperty('visibility', 'visible');
            })
    } else {
        failedLoginText.innerText = "Enter both credentials to continue...";
        failedLogin.style.setProperty('visibility', 'visible');
    }
})

retryLogin.addEventListener('click', () => {
    failedLogin.style.setProperty('visibility', 'hidden');
})