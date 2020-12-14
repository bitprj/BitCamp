const treeStatus = process.argv[2];

if (treeStatus === '0') {
    console.log("alive");
} else if (treeStatus === "1") {
    console.log("flowering");
} else if (treeStatus === "2") {
    console.log("shedding");
} else {
    console.log("other");
}