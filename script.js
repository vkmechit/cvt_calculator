function del() {
    const input_elem = document.getElementById("input_bar");
    var current_value = input_elem.value;
    if (current_value == "") {

    }
    else {
        input_elem.value = current_value.slice(0, -1);
    }

}
function reset(){
    const input_elem = document.getElementById("input_bar");
    input_elem.value=0;

}
function insert_value(value){
    const input_elem = document.getElementById("input_bar");
    var current_value = input_elem.value;
    if(current_value ==0){
        input_elem.value = value;
    }
    else{
        input_elem.value = current_value+value;
    }

    

}

function calculate(expression) {
    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '^': 3
    };

    function infixToPostfix(expression) {
        let outputQueue = [];
        let operatorStack = [];

        let i = 0;
        while (i < expression.length) {
            let token = expression[i];

            if (!isNaN(token)) {
                let number = '';
                while (!isNaN(expression[i]) || expression[i] === '.') {
                    number += expression[i];
                    i++;
                }
                outputQueue.push(number);
            } else if (token in precedence) {
                while (operatorStack.length > 0 && precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]) {
                    outputQueue.push(operatorStack.pop());
                }
                operatorStack.push(token);
                i++;
            } else {
                i++; // Skip parentheses or other characters
            }
        }

        while (operatorStack.length > 0) {
            outputQueue.push(operatorStack.pop());
        }

        return outputQueue;
    }

    function evaluatePostfix(postfixExpression) {
        let operandStack = [];

        for (let i = 0; i < postfixExpression.length; i++) {
            let token = postfixExpression[i];

            if (!isNaN(token)) {
                operandStack.push(parseFloat(token));
            } else {
                let operand2 = operandStack.pop();
                let operand1 = operandStack.pop();
                let result;

                switch (token) {
                    case '+':
                        result = operand1 + operand2;
                        break;
                    case '-':
                        result = operand1 - operand2;
                        break;
                    case '*':
                        result = operand1 * operand2;
                        break;
                    case '/':
                        result = operand1 / operand2;
                        break;
                    case '^':
                        result = Math.pow(operand1, operand2);
                        break;
                    default:
                        throw new Error("Invalid operator: " + token);
                }

                operandStack.push(result);
            }
        }

        if (operandStack.length !== 1) {
            throw new Error("Invalid expression");
        }

        return operandStack.pop();
    }

    const postfixExpression = infixToPostfix(expression);
    return evaluatePostfix(postfixExpression);
}



function calculate_value(){
    const input_elem = document.getElementById("input_bar");
    var current_value = input_elem.value;
    const result = calculate(current_value);
    input_elem.value =result;


}

