var greenBtn = $('#green-button');
var redBtn = $('#red-button');
var yellowBtn = $('#yellow-button');
var blueBtn = $('#blue-button')

$(document).ready(function () {
    $('#start-button').on('click', startGame);

    $('.simon-square').on('click', function () {
        checkUserButtonPress(parseInt($(this).attr("data-btn")));
    });

    $('.simon-square').on('mousedown', function () {
        buttonMousedown(parseInt($(this).attr("data-btn")));
    });

    $('.simon-square').on('mouseup', function () {
        buttonMouseup(parseInt($(this).attr("data-btn")));
    });
});

function startGame() {
    resetGame();
    generateButton();
}

function buttonMouseup(btnIndex) {
    switch(btnIndex) {
        case RED_BUTTON_INDEX:
            redBtn.css("background-color", "red");
            break;

        case BLUE_BUTTON_INDEX:
            blueBtn.css("background-color", "blue");
            break;

        case YELLOW_BUTTON_INDEX:
            yellowBtn.css("background-color", "yellow");
            break;

        case GREEN_BUTTON_INDEX:
            greenBtn.css("background-color", "green");
            break;
    }
}

function buttonMousedown(btnIndex) {
    switch(btnIndex) {
        case RED_BUTTON_INDEX:
            redBtn.css("background-color", "IndianRed");
            break;

        case BLUE_BUTTON_INDEX:
            blueBtn.css("background-color", "cornflowerblue");
            break;

        case YELLOW_BUTTON_INDEX:
            yellowBtn.css("background-color", "lightyellow");
            break;

        case GREEN_BUTTON_INDEX:
            greenBtn.css("background-color", "mediumseagreen");
            break;
    }
    playNote(btnIndex);
}

function playNote(btnIndex) {
    var note;
    switch(btnIndex) {
        case RED_BUTTON_INDEX:
            note = document.getElementById('cAudio');
            break;

        case BLUE_BUTTON_INDEX:
            note = document.getElementById('gAudio');
            break;

        case YELLOW_BUTTON_INDEX:
            note = document.getElementById('eAudio');
            break;

        case GREEN_BUTTON_INDEX:
            note = document.getElementById('aAudio');
            break;
    }
    note.currentTime = 0;
    note.play();
}

function checkUserButtonPress(buttonIndex) {
    if (buttonArray[userButtonPresses] == buttonIndex) {
        userButtonPresses += 1;
        if (userButtonPresses == buttonArray.length) {
            // keep the game going
            userButtonPresses = 0;
            generateButton();
        }
    }
    else
    {
        // strict mode check
        if ($('#strict-mode').prop("checked")) 
        {
            var msg = "Game Over! You went " + turns + " turn(s). Restarting the game...";
            bootbox.alert(msg, function() { startGame(); });
        } 
        else
        {
            var msg = "You hit the wrong button! I'll replay the steps so you can try again";
            bootbox.alert(msg, function() { 
                userButtonPresses = 0;
                pressButtonSequence(buttonArray); 
            });
        }
    }
}

function resetGame() {
    buttonArray = [];
    turns = 0;
    showTurnsCount();
    userButtonPresses = 0;
}

function showTurnsCount() {
    $('#turn-count').text(turns);
}

var buttonArray = [];
var turns = 0;
var userButtonPresses = 0;
var RED_BUTTON_INDEX = 0;
var GREEN_BUTTON_INDEX = 1;
var YELLOW_BUTTON_INDEX = 2;
var BLUE_BUTTON_INDEX = 3;
var DELAY_TIMING = 600;
var WINNING_TURN = 21;

function generateButton() {
    turns += 1;

    if (turns == WINNING_TURN) {
        bootbox.alert('You won!!! Congratulations!! Restarting the game...', function() { startGame(); });
        return;
    }

    showTurnsCount();

    var randomNumber = getRandomNumber();

    buttonArray.push(randomNumber);
    pressButtonSequence(buttonArray);
}

function pressButtonSequence(btnArray) {
    for (var index = 0; index < btnArray.length; index++) {       
        // press button but with delay of 750 to give built in delay of button press time
        setTimeout(pressButton, (DELAY_TIMING * index) + DELAY_TIMING, btnArray[index]);
    }
}

function pressButton(btnIndex) {
    buttonMousedown(btnIndex);
    setTimeout(buttonMouseup, 500, btnIndex);
}

function getRandomNumber() {
    return Math.floor(Math.random() * 4);
}