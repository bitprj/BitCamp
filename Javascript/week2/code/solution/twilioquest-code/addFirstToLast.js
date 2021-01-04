function addFirstToLast(stringArray) {
    if (stringArray.length === 0) {
        return "";
    } else {
        return stringArray[0] + stringArray[stringArray.length-1];
    }
}