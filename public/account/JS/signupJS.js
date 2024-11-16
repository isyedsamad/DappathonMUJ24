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

let divLoading = document.getElementById("divLoading");

let signupName = document.getElementById("signupName");
let signupUsername = document.getElementById("signupUsername");
let signupPassword = document.getElementById("signupPassword");
let signupbtn = document.getElementById("signupbtn");

let retryLogin = document.getElementById("retryLogin")
let failedLogin = document.getElementById("failedLogin");
let failedHeading = document.getElementById("failedHeading");
let failedLoginText = document.getElementById("failedLoginText");


// Signup Process
signupbtn.addEventListener('click', () => {
    if (signupName != "" || signupUsername.value != "" || signupPassword.value != "") {
        divLoading.style.setProperty('visibility', 'visible');
        const mail = signupUsername.value;
        const pass = signupPassword.value + "@pass";

        const auth = getAuth();

        createUserWithEmailAndPassword(auth, mail, pass)
            .then((userCred) => {
                set(child(dbRef, "Users/" + signupUsername.value.split("@")[0]), {
                    name: signupName.value,
                    mail: signupUsername.value,
                    password: signupPassword.value
                }).then((snap) => {
                    localStorage.setItem('userID', userCred.mail.split("@")[0]);
                    window.location = "Dashboard.html";
                }).catch((error) => {
                    failedHeading.innerText = "Error Occured"
                    failedLoginText.innerText = "Error : " + error;
                    divLoading.style.setProperty('visibility', 'hidden');
                    failedLogin.style.setProperty('visibility', 'visible');
                })
            }).catch((error) => {
                failedHeading.innerText = "Error Occured"
                failedLoginText.innerText = "Error : " + error;
                divLoading.style.setProperty('visibility', 'hidden');
                failedLogin.style.setProperty('visibility', 'visible');
            })
    } else {
        failedLoginText.innerText = "Enter all the credentials to continue...";
        failedLogin.style.setProperty('visibility', 'visible');
    }
})

retryLogin.addEventListener('click', () => {
    failedLogin.style.setProperty('visibility', 'hidden');
})