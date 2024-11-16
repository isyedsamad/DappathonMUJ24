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

let uID = localStorage.getItem("userID");
if (!uID) {
    window.location = './'
}


let o1 = document.getElementById("o1");
let o2 = document.getElementById("o2");
let o3 = document.getElementById("o3");

let t1 = document.getElementById("t1");
let t2 = document.getElementById("t2");
let t3 = document.getElementById("t3");

let th1 = document.getElementById("th1");
let th2 = document.getElementById("th2");
let th3 = document.getElementById("th3");

let activePlayer = 1;

let activeO1 = 1;
let activeO2 = 1;
let activeO3 = 1;

let activeT1 = 1;
let activeT2 = 1;
let activeT3 = 1;

let activeTh1 = 1;
let activeTh2 = 1;
let activeTh3 = 1;

let winMoves = ["o1o2o3", "t1t2t3", "th1th2th3", "o1t1th1", "o2t2th2", "o3t3th3", "o1t2th3", "o3t2th1"];
let win1 = ["o1", "o2", "o3"];
let win2 = ["t1", "t2", "t3"];
let win3 = ["th1", "th2", "th3"];
let win4 = ["o1", "t1", "th1"];
let win5 = ["o2", "t2", "th2"];
let win6 = ["o3", "t3", "th3"];
let win7 = ["o1", "t2", "th3"];
let win8 = ["o3", "t2", "th1"];

let p1o1 = 0,
    p1o2 = 0,
    p1o3 = 0;
let p1t1 = 0,
    p1t2 = 0,
    p1t3 = 0;
let p1th1 = 0,
    p1th2 = 0,
    p1th3 = 0;

let p2o1 = 0,
    p2o2 = 0,
    p2o3 = 0;
let p2t1 = 0,
    p2t2 = 0,
    p2t3 = 0;
let p2th1 = 0,
    p2th2 = 0,
    p2th3 = 0;

let p1Moves = [];
let p2Moves = [];

o1.addEventListener('click', function() {
    if (activeO1 === 1) {
        if (activePlayer === 1) {
            o1.innerText = "X";
            activePlayer = 2;
            p1Moves.push("o1");
            p1o1 = 1;
            changeColor("p2");
        } else {
            o1.innerText = "O";
            activePlayer = 1;
            p2Moves.push("o1");
            p2o1 = 1;
            changeColor("p1");
        }
        activeO1 = 0;
        checkWin();
        checkDraw();
    }
})

o2.addEventListener('click', function() {
    if (activeO2 === 1) {
        if (activePlayer === 1) {
            o2.innerText = "X";
            activePlayer = 2;
            p1Moves.push("o2");
            p1o2 = 1;
            changeColor("p2");
        } else {
            o2.innerText = "O";
            activePlayer = 1;
            p2Moves.push("o2");
            p2o2 = 1;
            changeColor("p1");
        }
        activeO2 = 0;
        checkWin();
        checkDraw();
    }
})

o3.addEventListener('click', function() {
    if (activeO3 === 1) {
        if (activePlayer === 1) {
            o3.innerText = "X";
            activePlayer = 2;
            p1Moves.push("o3");
            p1o3 = 1;
            changeColor("p2");
        } else {
            o3.innerText = "O";
            activePlayer = 1;
            p2Moves.push("o3");
            p2o3 = 1;
            changeColor("p1");
        }
        activeO3 = 0;
        checkWin();
        checkDraw();
    }
})




t1.addEventListener('click', function() {
    if (activeT1 === 1) {
        if (activePlayer === 1) {
            t1.innerText = "X";
            activePlayer = 2;
            p1Moves.push("t1");
            p1t1 = 1;
            changeColor("p2");
        } else {
            t1.innerText = "O";
            activePlayer = 1;
            p2Moves.push("t1");
            p2t1 = 1;
            changeColor("p1");
        }
        activeT1 = 0;
        checkWin();
        checkDraw();
    }
})

t2.addEventListener('click', function() {
    if (activeT2 === 1) {
        if (activePlayer === 1) {
            t2.innerText = "X";
            activePlayer = 2;
            p1Moves.push("t2");
            p1t2 = 1;
            changeColor("p2");
        } else {
            t2.innerText = "O";
            activePlayer = 1;
            p2Moves.push("t2");
            p2t2 = 1;
            changeColor("p1");
        }
        activeT2 = 0;
        checkWin();
        checkDraw();
    }
});

t3.addEventListener('click', function() {
    if (activeT3 === 1) {
        if (activePlayer === 1) {
            t3.innerText = "X";
            activePlayer = 2;
            p1Moves.push("t3");
            p1t3 = 1;
            changeColor("p2");
        } else {
            t3.innerText = "O";
            activePlayer = 1;
            p2Moves.push("t3");
            p2t3 = 1;
            changeColor("p1");
        }
        activeT3 = 0;
        checkWin();
        checkDraw();
    }
});


th1.addEventListener('click', function() {
    if (activeTh1 === 1) {
        if (activePlayer === 1) {
            th1.innerText = "X";
            activePlayer = 2;
            p1Moves.push("th1");
            p1th1 = 1;
            changeColor("p2");
        } else {
            th1.innerText = "O";
            activePlayer = 1;
            p2Moves.push("th1");
            p2th1 = 1;
            changeColor("p1");
        }
        activeTh1 = 0;
        checkWin();
        checkDraw();
    }
});

th2.addEventListener('click', function() {
    if (activeTh2 === 1) {
        if (activePlayer === 1) {
            th2.innerText = "X";
            activePlayer = 2;
            p1Moves.push("th2");
            p1th2 = 1;
            changeColor("p2");
        } else {
            th2.innerText = "O";
            activePlayer = 1;
            p2Moves.push("th2");
            p2th2 = 1;
            changeColor("p1");
        }
        activeTh2 = 0;
        checkWin();
        checkDraw();
    }
});

th3.addEventListener('click', function() {
    if (activeTh3 === 1) {
        if (activePlayer === 1) {
            th3.innerText = "X";
            activePlayer = 2;
            p1Moves.push("th3");
            p1th3 = 1;
            changeColor("p2");
        } else {
            th3.innerText = "O";
            activePlayer = 1;
            p2Moves.push("th3");
            p2th3 = 1;
            changeColor("p1");
        }
        activeTh3 = 0;
        checkWin();
        checkDraw();
    }
});


function checkWin() {
    //p1Win Check
    let wCombination = "";
    if (p1Moves.length >= 3) {
        if (p1o1 === 1 && p1o2 === 1 && p1o3 === 1) {
            wCombination = "11 - 12 - 13";
            winGame("p1", wCombination);
        } else if (p1t1 === 1 && p1t2 === 1 && p1t3 === 1) {
            wCombination = "21 - 22 - 23";
            winGame("p1", wCombination);
        } else if (p1th1 === 1 && p1th2 === 1 && p1th3 === 1) {
            wCombination = "31 - 32 - 33";
            winGame("p1", wCombination);
        } else if (p1o1 === 1 && p1t1 === 1 && p1th1 === 1) {
            wCombination = "11 - 21 - 31";
            winGame("p1", wCombination);
        } else if (p1o2 === 1 && p1t2 === 1 && p1th2 === 1) {
            wCombination = "12 - 22 - 32";
            winGame("p1", wCombination);
        } else if (p1o3 === 1 && p1t3 === 1 && p1th3 === 1) {
            wCombination = "13 - 23 - 33";
            winGame("p1", wCombination);
        } else if (p1o1 === 1 && p1t2 === 1 && p1th3 === 1) {
            wCombination = "11 - 22 - 33";
            winGame("p1", wCombination);
        } else if (p1o3 === 1 && p1t2 === 1 && p1th1 === 1) {
            wCombination = "13 - 22 - 31";
            winGame("p1", wCombination);
        }
    }

    if (p2Moves.length >= 3) {
        if (p2o1 === 1 && p2o2 === 1 && p2o3 === 1) {
            wCombination = "11 - 12 - 13";
            winGame("p2", wCombination);
        } else if (p2t1 === 1 && p2t2 === 1 && p2t3 === 1) {
            wCombination = "21 - 22 - 23";
            winGame("p2", wCombination);
        } else if (p2th1 === 1 && p2th2 === 1 && p2th3 === 1) {
            wCombination = "31 - 32 - 33";
            winGame("p2", wCombination);
        } else if (p2o1 === 1 && p2t1 === 1 && p2th1 === 1) {
            wCombination = "11 - 21 - 31";
            winGame("p2", wCombination);
        } else if (p2o2 === 1 && p2t2 === 1 && p2th2 === 1) {
            wCombination = "12 - 22 - 32";
            winGame("p2", wCombination);
        } else if (p2o3 === 1 && p2t3 === 1 && p2th3 === 1) {
            wCombination = "13 - 23 - 33";
            winGame("p2", wCombination);
        } else if (p2o1 === 1 && p2t2 === 1 && p2th3 === 1) {
            wCombination = "11 - 22 - 33";
            winGame("p2", wCombination);
        } else if (p2o3 === 1 && p2t2 === 1 && p2th1 === 1) {
            wCombination = "13 - 22 - 31";
            winGame("p2", wCombination);
        }
    }
}


var r = document.querySelector(':root');
let p1Active = document.getElementById("p1Active");
let p2Active = document.getElementById("p2Active");

function changeColor(active) {
    if (active == "p1") {
        r.style.setProperty('--back', '#1b0036');
        p1Active.style.setProperty('visibility', 'visible');
        p2Active.style.setProperty('visibility', 'hidden');
    } else {
        r.style.setProperty('--back', '#474f00');
        p2Active.style.setProperty('visibility', 'visible');
        p1Active.style.setProperty('visibility', 'hidden');
    }
}


let startGame = document.getElementById("startGame");
let startGameDiv = document.getElementById("startGameDiv");
startGame.addEventListener('click', function() {
    startGameDiv.style.setProperty('visibility', 'hidden');
    p1Active.style.setProperty('visibility', 'visible');
});

let winGameDiv = document.getElementById("winGameDiv");
let winnerTitle = document.getElementById("winnerTitle");
let winCombination = document.getElementById("winCombination");
let restartGame = document.getElementById("restartGame");
let swapGame = document.getElementById("swapGame");

let p1Score = document.getElementById("p1Score");
let p2Score = document.getElementById("p2Score");

let p1Win = 0;
let p2Win = 0;

function winGame(winner, combination) {
    if (winner === "p1") {
        get(child(dbRef, "GamePoints/" + uID + "/"))
            .then((snap) => {
                if(snap.exists()){
                    let newPoint = snap.val().point + 1;
                    update(child(dbRef, "GamePoint/" + uID + "/"), {
                        point: newPoint,
                    })
                }else {
                    set(child(dbRef, "GamePoint/" + uID + "/"), {
                        point: newPoint,
                        id: uID,
                    })
                }
            })
        winnerTitle.innerText = "Player 1";
        winCombination.innerText = `Winning Combination : ${combination}`;
        p1Win++;
        p1Score.innerHTML = `<pre>Player 1 Score  :  ${p1Win}</pre>`;
    } else {
        winnerTitle.innerText = "Player 2";
        winCombination.innerText = `Winning Combination : ${combination}`;
        p2Win++;
        p2Score.innerHTML = `<pre>Player 2 Score  :  ${p2Win}</pre>`;
    }
    winGameDiv.style.setProperty('visibility', 'visible');
}

restartGame.addEventListener('click', function() {
    restartGameFun();
    changeColor("p1");
    winGameDiv.style.setProperty('visibility', 'hidden');
});

function checkDraw() {
    if (o1.innerText != "" && o2.innerText != "" && o3.innerText != "" && t1.innerText != "" && t2.innerText != "" && t3.innerText != "" && th1.innerText != "" && th2.innerText != "" && th3.innerText != "") {
        restartGameFun();
        changeColor("p1");
    }
}


swapGame.addEventListener('click', function() {
    let newP1Win = p1Win;
    let newP2Win = p2Win;
    p1Win = newP2Win;
    p2Win = newP1Win;
    p1Score.innerHTML = `<pre>Player 1 Score  :  ${p1Win}</pre>`;
    p2Score.innerHTML = `<pre>Player 2 Score  :  ${p2Win}</pre>`;
    restartGameFun();
    changeColor("p1");
    winGameDiv.style.setProperty('visibility', 'hidden');
});

function restartGameFun() {
    o1.innerText = "";
    o2.innerText = "";
    o3.innerText = "";

    t1.innerText = "";
    t2.innerText = "";
    t3.innerText = "";

    th1.innerText = "";
    th2.innerText = "";
    th3.innerText = "";

    activePlayer = 1;

    activeO1 = 1;
    activeO2 = 1;
    activeO3 = 1;

    activeT1 = 1;
    activeT2 = 1;
    activeT3 = 1;

    activeTh1 = 1;
    activeTh2 = 1;
    activeTh3 = 1;

    p1o1 = 0;
    p1o2 = 0;
    p1o3 = 0;
    p1t1 = 0;
    p1t2 = 0;
    p1t3 = 0;
    p1th1 = 0;
    p1th2 = 0;
    p1th3 = 0;

    p2o1 = 0;
    p2o2 = 0;
    p2o3 = 0;
    p2t1 = 0;
    p2t2 = 0;
    p2t3 = 0;
    p2th1 = 0;
    p2th2 = 0;
    p2th3 = 0;
}

window.addEventListener('beforeunload', function(e) {
    if (p1Win != 0 || p2Win != 0) {
        e.preventDefault();
    }
})