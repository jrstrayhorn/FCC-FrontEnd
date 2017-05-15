$(document).ready(function () {
    $('.start').on('click', function () {
        startTimer();
    });

    $('.stop').on('click', function () {
        stopTimer();
    });

    resetDisplay();
});

function resetDisplay() {
    $('.time-left').text('Waiting to start next pomodoro...');
}

var countdownSecs;
var myTimer;

function startTimer() {
    // disable start button
    $('.start').attr('disabled', 'disabled');

    // enable stop button
    $('.stop').removeAttr('disabled');

    // create countdown based on pomodoro length selected
    countdownSecs = parseInt($('#length').val());
    displaySecs(countdownSecs);
    myTimer = setInterval(countdownTimer, 1000);  
}

function countdownTimer() {
    countdownSecs--;
    displaySecs(countdownSecs);
    if (countdownSecs <= 0) {
        clearInterval(myTimer);

        // show alert
        bootbox.alert({
            title: "Break Time!!",
            message: "Well done, pomodoro is completed!!",
            callback: function() {
                stopTimer();
            }
        });
    }
}

function displaySecs(secs) {
    var displayText = '';
    var min = Math.floor(secs / 60);
    var sec = secs % 60;
    displayText = 'Time Left: ' + pad(min) + ':' + pad(sec);
    $('.time-left').text(displayText);
}

function pad(num) {
    return ("0"+num).slice(-2);
}

function stopTimer() {
    // disable stop button
    $('.stop').attr('disabled', 'disabled');

    // enable start button
    $('.start').removeAttr('disabled');

    // delete countdown
    clearInterval(myTimer);
    
    // Reset display
    resetDisplay();
}