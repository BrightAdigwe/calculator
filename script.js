// numButtons: all number buttons including buttons (.) 
const numButtons = document.querySelectorAll(".numpad");

// operatorButtons: all operattor buttons (÷, x, -, +)
const operatorButtons = document.querySelectorAll(".operator");

// calculationsDisplay: This displays calculations of all arithemetic calculations eg. (2x2-4+8) in the view
const calculationsDisplay = document.querySelector(".calculations");

// backspaceButton: The backspaceButton button
const backspaceButton = document.querySelector(".backspaceButton");

// resultDisplay: Displays the final result of computation
const resultDisplay = document.querySelector(".result__right");

// equalSignButton = the equal sign button
const equalSignButton = document.querySelector(".equal-sign");

// calculations: this variable holds the calculations in string form eg. "2x2-4+8"
let calculations = null;

// operators: this constant contains an array of available operators
const operators = ["÷", "x", "-", "+"];

/* 
    when the backspace button is clicked 
    and there is calculation in the calculationsDisplay
    remove the last character in calculationsDisplay 
    and update calculationsDisplay, resultDisplay 
    and calculations to match it
*/
backspaceButton.onclick = () => {
    if(calculationsDisplay !== ""){
        let currentValueOnScreen = calculationsDisplay.innerText;
        let valueAfterBackspace = currentValueOnScreen.slice(0, -1);
        calculationsDisplay.innerText = valueAfterBackspace;
        resultDisplay.innerText = valueAfterBackspace;
        calculations = valueAfterBackspace;
    }  
}

/* 
    when equalsign Button is clicked
    and resultDisplay contains a computed result,
    update calculations to resultDisplay's current content
    so calculations now hold the computation result and futher calculations 
    can use computed result instead of the calculations 
    then clear the calculations in the calculationsDisplay
*/
equalSignButton.onclick = () => {
    if(resultDisplay.innerText != ""){
        calculations = resultDisplay.innerText;
        calculationsDisplay.innerText = "";
    } 
}

/* 
    This function updates the calculation Display
*/
const updateCalculationsDisplay = () => {
    calculationsDisplay.innerText = calculations;
}

/* 
    This function computes the calculations
*/
const compute = (calculations) => {
    return parseFloat(eval(calculations.replaceAll(/\s+/g, '').replaceAll("÷", "/").replaceAll("x", "*")).toFixed(3));
  
}

numButtons.forEach(numButton => {
    
    numButton.onclick = (el) => {   //  when a number button is clicked.. 
        calculations = calculationsDisplay.innerText;   //  set calculations to what is currently in the calculation display
        let containsOperand = false;    //  containsOperand will later on hold if an operand is present in calculation

        /* 
        lastChar holds the last character in the calculations variable, 
        it will later on be used to prevent two or more . occuring consecutively 
        */
        let lastChar = calculations.slice(-1);  
        let valueEntered = el.target.innerText;     // valueEntered holds the number that was pressed

        if(lastChar !== "." || valueEntered !== "."){ 
            operators.forEach(operator => {
                if(calculations.indexOf(operator) > 0){
                    containsOperand = true;
                }
            });

            if(valueEntered == ".") {
                if(!containsOperand && (calculations.indexOf(".") < 0)){
                    calculations = `${calculations} ${valueEntered}`; 
                }else {
                    let operatorIndexes = [];
                    let rev = calculations.split("").reverse().join("");
                    operators.forEach(operator => {
                        if(rev.indexOf(operator) > 0){
                            operatorIndexes.push(rev.indexOf(operator));
                        }
                    });

                    if(operatorIndexes.length){
                        let closestOperatorIndex = Math.min(...operatorIndexes);
                        let latestNumberRev = rev.substr(0, closestOperatorIndex - 1);
                        let latestNumber =latestNumberRev.split("").reverse().join("").replace(/\s+/g, '');
        
                        if(Number.isInteger(+latestNumber)){
                            calculations = `${calculations} ${valueEntered}`;
                        }

                    }
                }   

            }else {
                calculations = `${calculations} ${valueEntered}`;
            }
 
        }

        updateCalculationsDisplay();
        resultDisplay.innerText= compute(calculations);
    }
})

operatorButtons.forEach(operatorButton => {
    operatorButton.onclick = (el) => {
        if(calculations !== null && calculations !="") {
            let lastChar = calculations.slice(-1);
            let valueEntered = el.target.innerText; 
            if(!operators.includes(lastChar)){
                calculations = `${calculations} ${valueEntered}`; 
            }else {
                calculations = `${calculations.slice(0, -1)} ${valueEntered}`; 
            }
        }
        updateCalculationsDisplay();
    }
})