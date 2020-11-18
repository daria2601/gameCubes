import {showFinishBlock, getTimerBlock} from './render.js';

let timer, minutes, seconds, interval, isActive = false, timerBlock = getTimerBlock();

function startTimer(duration) {
    clearInterval(interval);
    timer = duration;

    return setupTimerInterval();
}

function stopTimer() {
    clearInterval(interval);
    isActive = false;
}

function resumeTimer() {
    setupTimerInterval();

    return interval;
}

function setupTimerInterval() {
    isActive = true;

    interval = setInterval( () => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        timerBlock.text(minutes + ':' + seconds);

        if (--timer < 0) {
            stopTimer();
            showFinishBlock();
        }
    }, 1000);

    return interval
}

function isActiveTimer() {
    return isActive;
}

export {startTimer, isActiveTimer, resumeTimer, stopTimer};