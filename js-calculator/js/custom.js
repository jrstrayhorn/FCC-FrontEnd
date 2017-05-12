$(document).ready(function() {
    $('.calc-button').on('click', function() {
       processMath($(this).attr("data-math"));
    });

    clearCalculator();
});

var ADD_CODE = 43;
var SUB_CODE = 45;
var MUL_CODE = 215;
var DIV_CODE = 247;
var DEC_CODE = 46;
var mathCodes = [DIV_CODE, MUL_CODE, SUB_CODE, ADD_CODE];
var canAddDecimal = true;

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

function stripBlanksExtraDashesFilter(el, index, arr) {
    var keep = true;
    if (el.length === 0)
        keep = false;
    if (el === "-" && arr[index+1].indexOf("-") !== -1)
        keep = false;
    return keep;
}

function doMath() {
    var operation = $('.calc-text').text();

    // strip math symbols from end of calc-text
    var lastCharCode = operation.substring(operation.length-1).charCodeAt(0);
    if (mathCodes.indexOf(lastCharCode) !== -1) {
        operation = operation.substring(0, operation.length-1);
    }

    var calcArr = convertCalcStringToArray(operation);

    var finalArr = calcArr.filter(stripBlanksExtraDashesFilter);

    // Processing multiplication and division left to right
    while (finalArr.indexOf(String.fromCharCode(MUL_CODE)) !== -1 || finalArr.indexOf(String.fromCharCode(DIV_CODE)) !== -1) {
        finalArr = processCalculationArray(finalArr, true);
    }

    // Processing addition and subtraction left to right
    while (finalArr.indexOf(String.fromCharCode(SUB_CODE)) !== -1 || finalArr.indexOf(String.fromCharCode(ADD_CODE)) !== -1) {
        finalArr = processCalculationArray(finalArr, false);
    }

    $('.answer-text').text(finalArr[0]);
    $('.calc-text').text(operation);
}

function convertCalcStringToArray(operation) {
    var calcArr = [];

    var pipeCalc = operation.replace(/[^.0-9]/g, replacer); 
    calcArr = pipeCalc.split('|');

    for (var i = 0; i < calcArr.length; i++) {
        if (calcArr[i].length === 0)
            calcArr[i+2] = "-" + calcArr[i+2];
    }

    return calcArr;
}

function processCalculationArray(finalArr, isMultplyDivision) {
    var newArr = [];

    for (var x = 0; x < finalArr.length; x++) {
            var sym_code = finalArr[x].charCodeAt(0);
            if (
            ((sym_code === MUL_CODE || sym_code === DIV_CODE) && isMultplyDivision)  
            || 
            (((sym_code === SUB_CODE || sym_code === ADD_CODE) && finalArr[x].length === 1) && !isMultplyDivision)
            ) {
                var myX = parseFloat(finalArr[x-1]);
                var y = parseFloat(finalArr[x+1]);
                var mySum = performMath(myX, y, sym_code);
                finalArr[x-1] = mySum.toString();
                var newArr = finalArr.filter(function(el, index) {
                    var keep = true;
                    if (index === x || index === x+1)
                        keep = false;
                    return keep;
                });
                finalArr = newArr;
                break;
            }
        }

    return newArr;

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
    if ($('.calc-text').text().indexOf('input') == -1 && $('.answer-text').text() !== "0") {
        clearCalculator();
    }
    
    var operation = $('.calc-text').text();
    var mathCode = math.charCodeAt(0);

    // check - make sure that only "minus" can be entered first
    if (operation.indexOf('input') !== -1)
    {
        if (mathCodes.indexOf(mathCode) !== -1)
        {
            if (mathCode !== SUB_CODE)
            {
                return;
            }
        }
        operation = '';
    }
        
    var lastCharCode = operation.substring(operation.length-1).charCodeAt(0);
    
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

    if (mathCode === DEC_CODE && !canAddDecimal)
        return;

    if (mathCode === DEC_CODE)
        canAddDecimal = false;

    if (mathCodes.indexOf(mathCode) !== -1)
        canAddDecimal = true;
    
    operation += math;
    $('.calc-text').text(operation);
}

function clearCalculator() {
    $('.calc-text').text('Waiting for input...');
    $('.answer-text').text('0');
}