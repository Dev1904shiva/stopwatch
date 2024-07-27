 // JavaScript (in script.js file)
let startTime = 0;
let currentTime = 0;
let lapTime = 0;
let intervalId = 0;
let isRunning = false;
let laps = [];

document.getElementById('start-button').addEventListener('click', startStopwatch);
document.getElementById('stop-button').addEventListener('click', stopStopwatch);
document.getElementById('lap-button').addEventListener('click', lapStopwatch);

function startStopwatch() {
    if (!isRunning) {
        startTime = new Date().getTime();
        intervalId = setInterval(updateTime, 10);
        isRunning = true;
        document.getElementById('start-button').disabled = true;
        document.getElementById('stop-button').disabled = false;
    }
}

function stopStopwatch() {
    if (isRunning) {
        clearInterval(intervalId);
        isRunning = false;
        document.getElementById('start-button').disabled = false;
        document.getElementById('stop-button').disabled = true;
    }
}

function lapStopwatch() {
    if (isRunning) {
        lapTime = new Date().getTime() - startTime;
        laps.push(lapTime);
        updateLaps();
    }
}

function updateTime() {
    currentTime = new Date().getTime() - startTime;
    let minutes = Math.floor(currentTime / 60000);
    let seconds = Math.floor((currentTime % 60000) / 1000);
    let microseconds = currentTime % 1000;
    document.getElementById('minutes').innerText = pad(minutes);
    document.getElementById('seconds').innerText = pad(seconds);
    document.getElementById('microseconds').innerText = pad(microseconds, 3);
}

function updateLaps() {
    let lapList = document.getElementById('lap-list');
    lapList.innerHTML = '';
    laps.forEach((lap, index) => {
        let minutes = Math.floor(lap / 60000);
        let seconds = Math.floor((lap % 60000) / 1000);
        let microseconds = lap % 1000;
        let lapText = `Lap ${index + 1}: ${pad(minutes)}:${pad(seconds)}:${pad(microseconds, 3)}`;
        let lapListItem = document.createElement('li');
        lapListItem.innerText = lapText;
        lapList.appendChild(lapListItem);
    });
}

function pad(value, length = 2) {
    return value.toString().padStart(length, '0');
}