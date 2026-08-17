// ================= VARIABLES =================

let startTime = 0;

let elapsedTime = 0;

let timerInterval = null;

let lapNumber = 0;


// ================= ELEMENTS =================

const display = document.getElementById("display");

const startBtn = document.getElementById("startBtn");

const pauseBtn = document.getElementById("pauseBtn");

const lapBtn = document.getElementById("lapBtn");

const resetBtn = document.getElementById("resetBtn");

const lapList = document.getElementById("lapList");


// ================= FORMAT TIME =================

function formatTime(time) {

    const hours = Math.floor(time / (1000 * 60 * 60));

    const minutes = Math.floor(
        (time % (1000 * 60 * 60)) / (1000 * 60)
    );

    const seconds = Math.floor(
        (time % (1000 * 60)) / 1000
    );

    const milliseconds = time % 1000;


    return (
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0") +
        "." +
        String(milliseconds).padStart(3, "0")
    );
}


// ================= UPDATE DISPLAY =================

function updateDisplay() {

    elapsedTime = Date.now() - startTime;

    display.textContent = formatTime(elapsedTime);
}


// ================= START =================

startBtn.addEventListener("click", function () {

    if (timerInterval !== null) {
        return;
    }

    startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(updateDisplay, 10);

});


// ================= PAUSE =================

pauseBtn.addEventListener("click", function () {

    if (timerInterval !== null) {

        clearInterval(timerInterval);

        timerInterval = null;
    }

});


// ================= LAP =================

lapBtn.addEventListener("click", function () {

    if (elapsedTime === 0) {
        return;
    }


    lapNumber++;


    const lapItem = document.createElement("li");


    lapItem.innerHTML = `
        <span>Lap ${lapNumber}</span>
        <span>${formatTime(elapsedTime)}</span>
    `;


    lapList.appendChild(lapItem);

});


// ================= RESET =================

resetBtn.addEventListener("click", function () {

    clearInterval(timerInterval);

    timerInterval = null;

    startTime = 0;

    elapsedTime = 0;

    lapNumber = 0;

    display.textContent = "00:00:00.000";

    lapList.innerHTML = "";

});