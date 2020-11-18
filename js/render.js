import {pushToEmptyItems} from "./emptyItems.js";
import {getPoints} from "./points.js";

function renderTable(parent, row, col) {
    for (let i = 0; i < row; i++) {
        let tr = $('<tr></tr>');
        for (let j = 0; j < col; j++) {
            let id = `item${i}${j}`;
            tr.append($(`<td id="${id}"></td>`));
            pushToEmptyItems(id);
        }
        parent.append(tr);
    }
}

function renderPointsScore() {
    $('#points').text(getPoints());
}

function clearTable(table) {
    table.empty();
}

function showFinishBlock() {
    $('#finishScore span').text(getPoints());
    $('#finish').modal('toggle');
}

function showErrorBlock() {
    $('#modalError').modal('toggle');
}

function closeFinishBlock() {
    $('#finish').modal('hide');
}

function renderResults() {
    $('#results').empty();
    let arrResults = JSON.parse(localStorage.getItem('results'));
    if (arrResults === null) {
        $('#results').html('<p>No results yet!</p>');
        return false;
    }
    for (let i = 0; i < arrResults.length; i++) {
        $('#results').append(`<p>${arrResults[i].name}: ${arrResults[i].score}</p>`);
    }
}

function getTimerBlock() {
    return $('#time');
}

function displayStop() {
    $('#stopGame').removeClass('d-none');
    $('#startGame').addClass('d-none');
}

function displayStart() {
    $('#startGame').removeClass('d-none');
    $('#stopGame').addClass('d-none');
}

export {
    renderTable,
    renderPointsScore,
    clearTable,
    showFinishBlock,
    renderResults,
    closeFinishBlock,
    showErrorBlock,
    getTimerBlock,
    displayStop,
    displayStart
};