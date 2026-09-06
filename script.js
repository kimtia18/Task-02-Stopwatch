// Get the display and buttons
const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const lapsList = document.getElementById("lapsList");

// Stopwatch variables
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;

// Format time as HH:MM:SS.mmm
function formatTime(time) {
    const milliseconds = time % 1000;
    const totalSeconds = Math.floor(time / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return (
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(milliseconds).padStart(3, "0")
    );
}

// Update the stopwatch display
function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    display.textContent = formatTime(elapsedTime);
}

// Start the stopwatch
function startStopwatch() {
    if (timerInterval !== null) {
        return;
    }

    startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(updateDisplay, 10);
}

// Pause the stopwatch
function pauseStopwatch() {
    if (timerInterval === null) {
        return;
    }

    clearInterval(timerInterval);
    timerInterval = null;

    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

// Record a lap
function recordLap() {
    if (elapsedTime === 0) {
        return;
    }

    const lapItem = document.createElement("li");

    const lapNumber = lapsList.children.length + 1;

    lapItem.innerHTML = `
        <span>Lap ${lapNumber}</span>
        <span>${formatTime(elapsedTime)}</span>
    `;

    lapsList.appendChild(lapItem);
}

// Reset the stopwatch
function resetStopwatch() {
    clearInterval(timerInterval);

    timerInterval = null;
    startTime = 0;
    elapsedTime = 0;

    display.textContent = "00:00:00.000";
    lapsList.innerHTML = "";
}

// Button events
startBtn.addEventListener("click", startStopwatch);
pauseBtn.addEventListener("click", pauseStopwatch);
lapBtn.addEventListener("click", recordLap);
resetBtn.addEventListener("click", resetStopwatch);