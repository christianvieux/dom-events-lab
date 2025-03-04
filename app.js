/*-------------------------------- Constants --------------------------------*/
const screenElement = document.querySelector(".display");
/*-------------------------------- Variables --------------------------------*/
let ans = "";
let currentExpression = ""
/*------------------------ Cached Element References ------------------------*/

/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener("DOMContentLoaded", function () {
  // Handling for when a button gets pressed
  document.querySelectorAll(".button.number").forEach((element) => {
    element.addEventListener("click", (event) => {
      onNumberButtonPress(element.textContent);
    });
  });
  // Handling for operator buttons
  document.querySelectorAll(".button.operator, .equals").forEach((element) => {
    const textContent = element.textContent;
    switch (textContent) {
      case "C": // Clear
        element.addEventListener("click", onClear)
        break;
      case "=": // Equal
        element.addEventListener("click", onEqual)
        break;
      case "+": // Add
        element.addEventListener("click", onAdd)
        break;
      case "-": // Subtract
        element.addEventListener("click", onSubtract)
        break;
      case "*": // Multiply
        element.addEventListener("click", onMultiply)
        break;
      case "/": // Divided
        element.addEventListener("click", onDivide)
        break;
      default:
        break;
    }
  });
});
/*-------------------------------- Functions --------------------------------*/
function displayTextOnDisplay(text) {
  screenElement.textContent = text;
};

// -------------------- [[ handlers ]] -----------------------
function onNumberButtonPress(Number) {
    addToExpression(Number);
};

function onClear() {
    clearExpression();
};

function onEqual() {
    solveExpression();
};

function onAdd() {
    addToExpression("+");
};

function onSubtract() {
    addToExpression("-");
};

function onMultiply() {
    addToExpression("*");
};

function onDivide() {
    addToExpression("/");
};
// --------------------[[ Setters/Getters ]]----------------------------------------
function getScreenDisplayText() {
    return screenElement.textContent;
};

function addToExpression(text) {
    // If adding an operator and the last character is already an operator, replace it
    if (['+', '-', '*', '/'].includes(text) && /[+\-*/]$/.test(currentExpression)) {
        currentExpression = currentExpression.slice(0, -1) + text;
    } else {
        // Otherwise, add to the expression as normal
        currentExpression = (currentExpression != 0) ? `${currentExpression}${text}` : text;
    }
    
    displayTextOnDisplay(formatExpression(currentExpression));
}

function formatExpression(expression) {
    // Remove trailing operators (+ or -)
    if (/[+\-]$/.test(expression)) {
        return '';  // If it ends with a trailing operator, return empty
    }

    // Get the last number from the expression
    const lastNumber = expression.match(/\d+$/);

    // If there's a last number, return it
    return lastNumber ? lastNumber[0] : '';
}

function clearExpression() {
    currentExpression = "0";
    displayTextOnDisplay("0");
};

function solveExpression() {
    let expression = currentExpression;
    
    // Remove any trailing operators before evaluation
    expression = expression.replace(/[+\-*/]$/, '');
    
    // If the expression is empty or invalid, return an error or a default value
    if (expression === '') {
        ans = 'Error: Empty expression';
        currentExpression = ans;
        displayTextOnDisplay(ans);
        return;
    }

    try {
        // Use the eval function to evaluate the mathematical expression
        // But first, sanitize to ensure only valid characters are used to avoid potential security risks
        if (/^[\d+\-*/().\s]*$/.test(expression)) {
            ans = eval(expression).toString();  // Evaluate the expression
        } else {
            ans = `Error: Invalid expression "${expression}"`;  // Return an error if the expression contains invalid characters
        }
    } catch (error) {
        // Handle any errors that might occur during evaluation
        ans = `Error: Could not solve "${expression}"`;
    }

    currentExpression = ans;
    displayTextOnDisplay(ans);
}


// ----------------------[[ init ]]-------------------
function Initialize() {
    onClear();
}

// Initialize
Initialize();