import {rowCount, colCount} from './constants/table.js';
import {colors} from './constants/colors.js';
import {startItemsCount, maxAddItemsCount, gameDuration} from './constants/gameInfo.js';
import {incrementPoints, resetPoints} from './points.js';
import {getEmptyItems, resetEmptyItems, pushToEmptyItems} from './emptyItems.js';
import {startTimer, isActiveTimer, stopTimer, resumeTimer} from './timer.js';
import {
    renderTable,
    renderPointsScore,
    clearTable,
    renderResults,
    closeFinishBlock,
    showErrorBlock,
    displayStop,
    displayStart
} from './render.js';
import {getPoints} from "./points.js";

let gameStarted = false;

function init() {
    renderResults();
    renderTable($('#playingField'), rowCount, colCount);
    $('#startGame').click(startGame);
    $('#stopGame').click(stopGame);
    $('#playingField').click(clickOnBoard);
    $('#finish form').submit(onSaveResult);
    $('#finish').on('hidden.bs.modal', onModalCloseEvent);
    $('#newGame').click(newGame);
}

function newGame() {
    let table = $('#playingField');
    let timer = $('#time');

    clearTable(table);
    resetPoints();
    resetEmptyItems();

    renderPointsScore();
    startTimer(gameDuration, timer);
    renderTable(table, rowCount, colCount);
    randomColorItems(startItemsCount);
    displayStop();
}

function startGame() {
    if (gameStarted === false) {
        gameStarted = true;
        newGame();
    } else {
        resumeTimer();
    }
    displayStop();
}

function stopGame() {
    stopTimer();
    displayStart();
}

function randomColorItems(count = 1) {
    let items = getEmptyItems();
    for (let i = 0; i < count; i++) {
        let randomIndex = getRandomInt(items.length);
        let itemId = items[randomIndex];
        randomColorItem($(`#${itemId}`));
        items.splice(randomIndex, 1);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function clickOnBoard(e) {
    let target = $(e.target);
    if (isActiveTimer() === false) {
        showErrorBlock();
    }
    if ((target.data('colored') === true) && (isActiveTimer() === true)) {
        clickOnColoredItem(target);
    }
}

function randomColorItem(item) {
    let color = colors[getRandomInt(colors.length)];
    item.addClass(color);
    item.data('colored', true);
}

function clickOnColoredItem(item) {
    let newItems = getRandomInt(maxAddItemsCount + 1);

    item.removeClass();
    item.removeData('colored');
    pushToEmptyItems(item.attr('id'));
    incrementPoints();
    renderPointsScore();
    randomColorItems(newItems);
}

function onSaveResult(e) {
    e.preventDefault();
    let name = '';
    let data = $(this).serializeArray();
    for (let i = 0; i < data.length; i++) {
        if (data[i].name === 'name') {
            name = data[i].value;
        }
    }

    saveResult(name, getPoints());
    closeFinishBlock();
}

function saveResult(name, score) {
    let results = JSON.parse(localStorage.getItem("results"));

    if (results === null) {
        results = [];
    }

    results.push({
        name: name,
        score: score,
    });

    localStorage.setItem('results', JSON.stringify(results));
}

function onModalCloseEvent() {
    renderResults();
}

export {init};