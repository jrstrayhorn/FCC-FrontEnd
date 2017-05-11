$(document).ready(function() {
    $('.calc-button').on('click', function() {
        var math = $(this).attr("data-math");
        processMath(math);
    });

    clearCalculator();
});

function processMath(math) {
    switch(math) {
        case '=':
            doMath();
            break;
        
        case 'C':
            clearCalculator();
            break;

        default:
            addToOperations(math);
            break;
    }
}

function doMath() {
    var sum = 0;

    // strip math symbols from end of calc-text

    var pipeCalc = $('.calc-text').text().replace(/[^.0-9]/g, replacer); 
    var calcArr = pipeCalc.split('|');

    for (var i = 0; i < calcArr.length; i++) {
        if (calcArr[i].length === 0)
            calcArr[i+2] = "-" + calcArr[i+2];
    }

    var finalArr = calcArr.filter(function(el, index, arr) {
        var keep = true;

        //if (index === 0 && el === "-")
        //    keep = false;

        if (el.length === 0)
            keep = false;

        if (el === "-" && arr[index+1].indexOf("-") !== -1)
            keep = false;

        //if (index === arr.length-1 && mathCodes.indexOf(el.charCodeAt(0)) !== -1)
        //    keep = false;

        return keep;
    });

    console.log(finalArr);

    /*for (var x = 0; x < finalArr.length; x+2) {
        sum += performMath(finalArr[x], finalArr[x+2], finalArr[x+1].charCodeAt(0));
    }*/

    sum = performMath(parseFloat(finalArr[0]), parseFloat(finalArr[2]), finalArr[1].charCodeAt(0));

    $('.answer-text').text(sum);
}

function performMath(x, y, sym_code) {
    var sum = 0;

    switch (sym_code) {
        case ADD_CODE:
            sum = x + y;
            break;
        case SUB_CODE:
            sum = x - y;
            break;
        case MUL_CODE:
            sum = x * y;
            break;
        case DIV_CODE:
            sum =  x / y;
            break;
        default:
    }

    return sum;
}

function replacer(match) {
    return '|' + match + '|';
}

function addToOperations(math) {
    var operation = $('.calc-text').text();
    if (operation.indexOf('input') !== -1)
        operation = '';
    var lastCharCode = operation.substring(operation.length-1).charCodeAt(0);
    var mathCode = math.charCodeAt(0);
    if (mathCodes.indexOf(lastCharCode) !== -1)
    {  
        // check - can't have same symbol back to back
        if (lastCharCode === mathCode)
            return;
        
        // check - if adding a diff symbol back to back
        if (mathCodes.indexOf(mathCode) !== -1)
        {
            // check - if adding a subtraction symbol
            if (mathCode === SUB_CODE)
            {
                if (lastCharCode === ADD_CODE)  // check - if adding add symbol
                    operation = operation.substring(0, operation.length-1); // switch
            }
            else 
            {
                // cutting off existing symbol "switching symbol"
                operation = operation.substring(0, operation.length-1);
            }
        }
    }
    operation += math;
    $('.calc-text').text(operation);
    //alert(math.charCodeAt(0));
}

var ADD_CODE = 43;
var SUB_CODE = 45;
var MUL_CODE = 215;
var DIV_CODE = 247;
var mathCodes = [DIV_CODE, MUL_CODE, SUB_CODE, ADD_CODE];

function clearCalculator() {
    $('.calc-text').text('Waiting for input...');
    $('.answer-text').text('0');
}