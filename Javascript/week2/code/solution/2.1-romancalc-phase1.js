// Initialize an array that will hold the values to be calculated (from the command line)
function get_args() {
    const operand1 = process.argv[2];
    const operator = process.argv[3];
    const operand2 = process.argv[4];
    let op = [operand1, operator, operand2];
    return op;
}

// Test cases:
/* run romancalc.js a b c*/
let op = get_args();
console.log("The first operand is: ", op[0]);
console.log("The second operand is: ", op[2]);
console.log("The operator is: ", op[1]);