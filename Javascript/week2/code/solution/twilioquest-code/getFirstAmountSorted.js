function getFirstAmountSorted(stringArray, number){
    stringArray.sort();
    //console.log(stringArray);
    const slicedArray = stringArray.slice(0, number);
    return slicedArray;
}

const newArray = getFirstAmountSorted(['cat', 'apple', 'bat'], 2);
console.log(newArray);