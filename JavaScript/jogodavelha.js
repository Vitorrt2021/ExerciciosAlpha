
const VAZIO = 0;
const LINHAS = []
const COLUNAS = []
const DIAGONAISPRINCIPAIS = []
const DIAGONAIS = []
let matriz = [
    [3,2,4,4],
    [5,4,1,3],
    [4,3,4,12],
    [3,3,1,1],
]

setarStrings(matriz)

function setarStrings(matriz){
    //iniciar os arrays

    for(let i=0;i<matriz.length;i++){   
        for(let j=0;j<matriz[i].length;j++){
            COLUNAS[j] = ''
            LINHAS[i] = ''
            DIAGONAIS[i+j] = ''
            DIAGONAISPRINCIPAIS[i-j] = ''
           }
    }
    for(let i=0;i<matriz.length;i++){   
        for(let j=0;j<matriz[i].length;j++){
            COLUNAS[j] += ''+matriz[i][j]+' '
            LINHAS[i] += ''+matriz[i][j] + ' '
            DIAGONAIS[i+j] += ''+matriz[i][j] +' '
            DIAGONAISPRINCIPAIS[i-j] += ''+matriz[i][j] + ' '
        }
    }
}
function pegarLinha(array){
    let novo = []
    let fim = []
    for(let i=0;i<array.length;i++){
        let num='';
        novo = []
        for(let j=0;j<array[i].length;j++){
            if(array[i][j] != ' '){
                num +=array[i][j] 
            }else{
                novo.push(+num)
                num = '';
            }
        }
        fim.push(novo)
    }
    return fim;
}
function setarLinha(array){
    if(array.length >= 3){    
        if(array[0] != VAZIO){
            let sequencia=1;
            for(let i=0;i<array.length;i++){
                if(array[i] == array[i-1] && i!=0){
                    sequencia++
                }else{
                    sequencia=1;
                }if(sequencia >=3){
                    return true
                }
            }
        }
    }
    return false
}
function checkCadaLinha(array){
    for(let i=0;i<array.length;i++){
        if(setarLinha(array[i])){
            return true
        }
    }
    return false
}
function checkMatriz(matriz){
    setarStrings(matriz);
    if(checkCadaLinha(pegarLinha(LINHAS))){
        return true
    }else if(checkCadaLinha(pegarLinha(COLUNAS))){
        return true
    }else if(checkCadaLinha(pegarLinha(DIAGONAIS))){
        return true
    }else if(checkCadaLinha(pegarLinha(DIAGONAISPRINCIPAIS))){
        return true
    }
    return false
}  
if(checkMatriz(matriz)){
    console.log("Parabens!!")
}else{
    console.log("Perdeu")
}