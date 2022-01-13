function ele(matriz){
    //console.log("OO")
    if(Array.isArray(matriz) && matriz.length > 0){
        ele(matriz.shift())
        ele(matriz)
    }else if(!(Array.isArray(matriz))){
        console.log(matriz)
    }else if(Array.isArray(matriz[0])){
        let array = matriz.shift()
        ele(array)
        ele(matriz)
    }
}
function printMatrizElements(arr) {
    if(Array.isArray(arr[0])){
        let a = arr.shift()
        printMatrizElements(a)
        printMatrizElements(arr)
    }
    else if(arr.length > 0) {
      console.log(arr.shift())
      printMatrizElements(arr)
    }
    return '';
};
  
const o = [
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12],
    [13,14,15,16]
]
//printMatrizElements(o)
ele(o)