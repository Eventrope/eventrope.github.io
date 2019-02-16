//This is the most interesting code I put together in awhile. I kept finding bugs then kept adding on more things to fix said bugs.
//Matthew Buhler
//


// all of this stuff I created
let x = "0"; //string value on the main display
let rightBracket = 0; //used to track number of left and right brackets.
let leftBracket = 0;
let valueBetweenBracket = false; // Prevents a string like () from being clicked. can only do (1*4)
let decimal = false; //prevents decimal from being inputed twice. Is possible to backspace into it still.
let operatorUsed = false; // prevents operator from being used twice. However screws up adding/multiplying negative numbers.
let negativeOperator = 0;
let operatorafterBracket = false;
let x2 ="0"; //string value on the secondary display.
let reinput = false; //
let answer = false; //set when the answer button is hit.


//if X is 0 set X to nothing before we append a value to the string.
function checkX(){
    if(x==="0"){
        x="";
    }
}

//code to check if brackets can be put in place. I think if I used a different math library I wouldn't have to do so much. Alas.
function checkBrackets(value){

    checkX();
    // this part of code is to make sure I can put a ( in... it is a very sad if if if function.
    if(operatorUsed === true) {

        if (operatorafterBracket === false) {
            if (value === "(") {
                valueBetweenBracket = false;
                operatorUsed = true;
                leftBracket += 1;
                x += "(";
                updateDisplay();
                return;
            }
        }
    }

    if (value === ")") {
        if (valueBetweenBracket === true) {
            if (leftBracket > rightBracket) {
                leftBracket -= 1;
                operatorafterBracket = true;
                x += ")";
                updateDisplay();
                return;
            }
        }

    }




}

//When clear is pressed two actions possible 1) backspace if answer has not been pressed. 2) if answer has been pressed then let's reset everything.
function clear(){

    //this is the start of the code dealing with backspace.
    if(answer === false){

        let d = x.slice(0,-1);
        x = x.slice(0,-1);

        //this sad line of code is to check if we need to clear a rule. Does not work for all cases. Sadly.
        switch(d){
            case ".":
                decimal = false;
                break;
            case "*":
                operatorUsed = false;
                break;

            case "-":
                operatorUsed = false;
                negativeOperator = 0;
                break;
            case "/":
                operatorUsed = false;
                break;
            case "+":
                operatorUsed = false;
                break;
            case ")":
                operatorUsed = false;
                operatorafterBracket = false;
                break;
            case "(":
                operatorUsed = false;
                operatorafterBracket = false;
                break;

        }
    }

    //this is case 2, clear everything.
    else {
        x2 = "Ans:" + x;
        x = "0";

        decimal = false;
        rightBracket = 0;
        leftBracket = 0;
        operatorUsed = true;
        operatorafterBracket = false;
        reinput = false;
        answer = false;
        negativeOperator = 0;
        updateTopDisplay()
    }
    updateDisplay();
}

//yay function to update the main display.
function updateDisplay() {

    const display = document.querySelector('.calc_display');
        display.value = x;
}

//function to update the display over the display.
function updateTopDisplay() {

    const display = document.querySelector('.calc_display_top');

    display.value = x2;
}

//not working
    function expo(x, f) {
    return Number.parseFloat(x).toExponential(f);
}

//listen for the keys being pressed Mostly self explanatory.
const keys = document.querySelector('.inputs');
keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
        return;
    }


    if (target.classList.contains('bracket')) {
        console.log('bracket', target.value);
        checkBrackets(target.value);


    }

        if (target.classList.contains('operator')) {
        console.log('operator', target.value);
        reinput = false;
        decimal = false;


        if (operatorUsed === false || target.value ==="-" & negativeOperator <2) {
            operatorUsed = true;

            negativeOperator += 1;


            if (target.value === "-" & x === "0") { // so we can set a number negative right away.
                x = "-";
                updateDisplay();
                return
            }
            operatorafterBracket = false;
            x += target.value;
            updateDisplay();
            return;
        }
    }
    if (target.classList.contains('value')) {
        console.log('value', target.value);

        //Used after an answer and we click a value.
        if (reinput === true){
            clear();
        }
        checkX();


            operatorUsed = false; //so we can only use an opeator once.
            negativeOperator = 0; //for negative values
            valueBetweenBracket = true;
            x += target.value;
            updateDisplay();
            return;

    }

    if (target.classList.contains('decimal')) {
        console.log('decimal', target.value);

        if(valueBetweenBracket === true){
            if (decimal === false) {
                decimal = true;
                operatorUsed = true; // so I can't have an operator follow a decimal.
                operatorafterBracket = true;
                x += target.value
            }
        }
        updateDisplay();
        return;
    }

    if (target.classList.contains('clearValues')) {
        console.log('clearValues', target.value);
        clear();
        return;
    }

    if (target.classList.contains('equals')) {
        console.log('equals');
        x2 = x;
        updateTopDisplay();

        try {
            x = eval(x);
        } catch (e) {
            if (e instanceof SyntaxError) {
                x = "Error";
            }
        }

        reinput = true;
        answer = true;
        updateDisplay();
        return;
    }

    console.log('digit', target.value);
});