$(document).ready(function() {
    //pcTurn();
    $('.game-square').on('click', function() {
        userTurn($(this).attr("data-index"));
    });

    $('#start-button').on('click', function() {
        startGame();
    });
    
});

function startGame() {
    gameStarted = false;
    $('#start-button').removeAttr('disabled');

    // ask user to select symbol
    bootbox.prompt({
        title: "X or O?",
        inputType: 'select',
        inputOptions: [
            {
                text: 'X',
                value: 'X'
            },
            {
                text: 'O',
                value: 'O'
            }
        ],
        callback: function (result) {
            if (!result)
                return;

            gameStarted = true;
            // reset gameArr
            gameArr = ['','','','','','','','','']

            // redraw board
            redrawBoard();

            // set user symbol
            userSymbol = result;

            // set pc symbol
            pcSymbol = (userSymbol === 'X') ? "O" : "X";

            // see who goes first
            var rnd = getRandomNumber(2);

            // tell user
            var msg = (rnd === 1) ? "Computer" : "User";
            msg = msg + ' goes first!';

            bootbox.alert({
                message: msg,
                callback: function () {
                    // if pc first then do pc turn
                    if (rnd === 1) {
                        pcTurn();
                    }

                    // disable start button
                    $('#start-button').attr('disabled', 'disabled');
                }
            });

            
            
        }
    });

    
}

function userTurn(index) {
    if (!gameStarted)
        return;

    if (gameArr[index] !== '')
        return;
    
    gameArr[index] = userSymbol;

    // redraw board
    redrawBoard();

    gameOver = isGameOver();

    if (gameOver === '') {
        pcTurn();
        } else {
            processWinner(gameOver);
        }
}

function processWinner(winSymbol) {
    var winMsg = '';

    if (winSymbol == userSymbol)
        winMsg = 'User won';

    if (winSymbol == pcSymbol)
        winMsg = 'Computer won';
    
    if (winSymbol == 'D')
        winMsg = 'Game is a draw';

    bootbox.alert(winMsg, function() { startGame(); });
}

var gameArr; // = ['','','','','','','','',''];
var pcSymbol; // = 'O';
var userSymbol; // = 'X';
var gameOver;
var gameStarted = false;

function pcTurn() {
    // add pc symbol to array
    var pcChoice;

    do {
        pcChoice = getRandomNumber(9);
    }
    while (gameArr[pcChoice] !== '');

    gameArr[pcChoice] = pcSymbol;

    // redraw board
    redrawBoard();

    // check if game over
    gameOver = isGameOver();

    if (gameOver !== '')
        processWinner(gameOver);
}

function isGameOver() {
    var gameOver = '';
    var whoWon = checkGameOver();
    if (whoWon !== '')
    {
        /*if (whoWon === pcSymbol) {
            // then pc won
            bootbox.alert('Computer won');
            gameOver = true;
        } else {
            // then user won
            bootbox.alert('User won');
            gameOver = true;
        }*/
        gameOver = whoWon;
        return gameOver;
    }

    if (gameArr.indexOf('') === -1) {
        // game is a draw
        //bootbox.alert('Game is a draw');
        //gameOver = true;
        gameOver = 'D';
    }
    return gameOver;
}

function redrawBoard() {
    gameArr.forEach(function(el, index) {
        $('#btn-' + index + ' h1').text(el);
    });
};

function getRandomNumber(num) {
    return Math.floor(Math.random() * num);
}

function checkGameOver() {
    var returnWinner = '';

    if(gameArr[0] !== '' && checkMatch(gameArr[0],gameArr[1],gameArr[2])) {
        return gameArr[0];
    }
    if(gameArr[3] !== '' && checkMatch(gameArr[3],gameArr[4],gameArr[5])) {
        return gameArr[3];
    }
    if(gameArr[6] !== '' && checkMatch(gameArr[6],gameArr[7],gameArr[8])) {
        return gameArr[6];
    }
    if(gameArr[0] !== '' && checkMatch(gameArr[0],gameArr[3],gameArr[6])) {
        return gameArr[0];
    }
    if(gameArr[1] !== '' && checkMatch(gameArr[1],gameArr[4],gameArr[7])) {
        return gameArr[1];
    }
    if(gameArr[2] !== '' && checkMatch(gameArr[2],gameArr[5],gameArr[8])) {
        return gameArr[2];
    }
    if(gameArr[0] !== '' && checkMatch(gameArr[0],gameArr[4],gameArr[8])) {
        return gameArr[0];
    }
    if(gameArr[2] !== '' && checkMatch(gameArr[2],gameArr[4],gameArr[6])) {
        return gameArr[2];
    }    

    return returnWinner;
}

function checkMatch(a, b, c) {
    var arrString = [a, b, c].join('');
    return (arrString === 'XXX' || arrString === 'OOO');
}