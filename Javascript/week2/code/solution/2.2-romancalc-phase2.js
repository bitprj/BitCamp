//PHASE 1:

// Initialize an array that will hold the values to be calculated (from the command line)
function get_args() {
    var operand1 = process.argv[2];
    var operator = process.argv[3];
    var operand2 = process.argv[4];
    let op = [operand1, operator, operand2];
    return op;
}

// PHASE 2:

function calculate() {
    // Use previously built get_args function to get operators and operand
    let op = get_args();
    var a = Number(op[0]);
    var operator = op[1];
    var b = Number(op[2]);

    // Initialize variable to hold result of operations
    var result = 0;

    // Use conditions to determine what the operation is from the user input and calculate the result
    if(operator == '+') {
        result = a + b;
    } else if(operator == '-') {
        result = a - b;
    } else if(operator == 'x') {
        result = a * b;
    } else if(operator == '/') {
        result = a / b;
    } else if(operator == '^') {
        result = a ** b;
    } else if(operator == '%') {
        result = a % b;
    }

    return result;
}

// Testing:
/*
Run romancalc.js a b c
where a and c are numbers
and b is the operator.
This code is sensitive to the spacing in the user input (command line).
*/
console.log(calculate());