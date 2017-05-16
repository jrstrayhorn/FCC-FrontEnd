$(document).ready(function() {
    pcTurn();
});

var gameArr = ['','','','','','','','',''];
var pcSymbol = 'O';
var userSymbol = 'X';

function pcTurn() {
    // add pc symbol to array
    var pcChoice;

    do {
        pcChoice = getRandomNumber();
    }
    while (gameArr[pcChoice] !== '');

    gameArr[pcChoice] = pcSymbol;

    // redraw board
    gameArr.forEach(function(el, index) {
        $('#btn-' + index + ' h1').text(el);
    })
}

function getRandomNumber() {
    return Math.floor(Math.random() * 9);
}