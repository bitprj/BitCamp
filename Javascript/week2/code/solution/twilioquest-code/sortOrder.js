const firstWord = process.argv[2].toLowerCase();
const secondWord = process.argv[3].toLowerCase();

if (firstWord < secondWord) {
    console.log(-1);
} else if (firstWord > secondWord) {
    console.log(1);
} else {
    console.log(0);
}