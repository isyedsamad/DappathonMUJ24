// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
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
const auth = getAuth();

let divLoading = document.getElementById("divLoading");

let retryLogin = document.getElementById("retryLogin")
let failedLogin = document.getElementById("failedLogin");
let failedHeading = document.getElementById("failedHeading");
let failedLoginText = document.getElementById("failedLoginText");

let userName = document.getElementById("userName");
let logout = document.getElementById("logout");

(() => {
    let uID = localStorage.getItem("userID");
    if (!uID) {
        window.location = './'
    }else {
        loadData();
    }
})

function loadData() {
    get(child(dbRef, "Users/" + uID))
        .then((snapUser) => {

        })
}

logout.addEventListener('click', () => {
    localStorage.removeItem("userID");
    signOut(auth)
        .then(() => {
            window.location = '../';
        })
})