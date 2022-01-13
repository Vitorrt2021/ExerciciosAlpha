//Primeira Forma

function printMatriz1(matriz){
    if(Array.isArray(matriz[0])){
        let array = matriz.shift()
        printMatriz1(array)
        printMatriz1(matriz)
    }else if(Array.isArray(matriz) && matriz.length > 0){
        console.log(matriz.shift())
        printMatriz1(matriz)
    }
}

//Segunda Forma
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
