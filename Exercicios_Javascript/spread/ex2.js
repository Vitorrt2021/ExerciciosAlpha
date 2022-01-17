function concatArray(array1,array2){
    return [...array1,...array2];
}
const ar1 = [
    1,2,3,4
]
const ar2 = [
    5,6,7,8
]
console.log(concatArray(ar1,ar2))