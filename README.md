# Simple Calculator

## Description

A basic calculator web application that mimics the functionality of vintage calculators. This application performs standard arithmetic operations (addition, subtraction, multiplication, and division) through a simple user interface.

## Features

- Basic arithmetic operations
- Clear button to reset calculations
- Display that shows current number or result
- Error handling for invalid expressions
- Classic calculator behavior (replaces operators when pressed consecutively)

## Technologies Used

- HTML
- CSS
- JavaScript

## Development Process

I started by mapping out the core functions needed for calculator operations. First, I created the basic math operation functions and display handlers. Then I built the event system to connect button presses to their respective actions.

Here's how I set up the event listeners:

```javascript
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
      // Other cases...
    }
  });
});
```

One of the key challenges was handling operator input correctly. I implemented this logic to make sure consecutive operators wouldn't break the calculator:

```javascript
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
```

I used ChatGPT (AI) for researching specific implementation details, particularly for the `formatExpression` and `solveExpression` methods. It helped me understand how to use the JavaScript `eval()` method safely and how to implement regular expression patterns like `/^[\d+\-*/().\s]*$/` to validate expressions before evaluation.

For error handling, I made sure to validate expressions before evaluation:

```javascript
try {
    // Use the eval function to evaluate the mathematical expression
    // Sanitize to ensure only valid characters are used
    if (/^[\d+\-*/().\s]*$/.test(expression)) {
        ans = eval(expression).toString();
    } else {
        ans = `Error: Invalid expression "${expression}"`;
    }
} catch (error) {
    ans = `Error: Could not solve "${expression}"`;
}
```

## Setup and Usage

1. Clone this repository
2. Open index.html in your browser
3. Use the calculator by clicking on the buttons
4. For complex calculations, enter numbers and operators in sequence

## References

- [Sgt Brunner Calculator](https://sgtbrunner.github.io/calculator/)
- [General Assembly DOM Events Lab Solution](https://pages.git.generalassemb.ly/modular-curriculum-all-courses/dom-events-lab-solution/)