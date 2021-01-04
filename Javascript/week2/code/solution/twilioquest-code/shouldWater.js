const lifeStatus = process.argv[2];
const dryLevel = process.argv[3];
const dryNumber = Number(dryLevel);

if (lifeStatus === '0' && dryNumber > 10) {
    console.log("WATER");
}