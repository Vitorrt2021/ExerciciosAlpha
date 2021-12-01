
function stopDefAction(evt) {
    evt.preventDefault();
}

let arrayNum = [0,0,0,0]
const button = document.querySelector('.button')
button.addEventListener('click',stopDefAction)
button.addEventListener('click',defineArray)
button.addEventListener('click',showContent)

showContent();
function showContent(){
    const revert = document.querySelector('.revert')
    revert.innerHTML = transformToString(contrary(arrayNum))

    const sort = document.querySelector('.sort')
    sort.innerHTML = transformToString(sortArray(arrayNum,'c'))    
}
function transformToString(array){
    let string = '';
    for(let i of array){
        string += i+", ";
    }
    return string
}
function defineArray(){
    arrayNum = []
    let tam=0;
    for(let i=1;i<5;i++){
        const numE = document.querySelector('.number'+i)
        let num = +numE.value
        arrayNum[tam] = num;
        tam++
    } 
}

function changePosition(array,p1,p2,modo){
    let aux = array;
    
    if( modo == "c"){
        if(aux[p1] < aux[p2]){
            let s=aux[p1]
            aux[p1] = array[p2];
            aux[p2] = s;
        }
    }else{
        if(aux[p1] > aux[p2]){
            let s=aux[p1]
            aux[p1] = array[p2];
            aux[p2] = s;
        }
    }
    return aux;
}
function contrary(array){
    let aux = [];
    for(let i=0;i<array.length;i++){
        aux[i] = array[array.length-i-1];
    }
    return aux
}
function sortArray(array,modo){
    let aux=array;
    for(let i=0;i<array.length;i++){
        for(let j=0;j<array.length;j++){
            aux = changePosition(aux,i,j,modo);
        }
    }
    return aux;
}
