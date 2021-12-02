let matriz = [[" "," "," "],[" "," "," "],[" "," "," "]]
const TAMANHO = 3;
let jogador=1;
adcionarEventListener()
console.log(setarMatriz())
console.log(checkMatriz(setarMatriz())
)
const BT_resetar = document.querySelector('#matriz--novoJogo')
BT_resetar.addEventListener('click', resetar)



function adcionarEventListener(){
    for(let i=0;i<TAMANHO;i++){
        for(let l=0;l<TAMANHO;l++){
            let Elemento = document.getElementById("elemento-"+i+"-"+l)
            Elemento.addEventListener('click',function () {
                trocarBackground(Elemento) 
                const titulo = document.querySelector('.matriz > h1')
                titulo.innerHTML = " ";

                if(checkMatriz(setarMatriz(Elemento.id))){
                    titulo.innerHTML = 'Parabens jogador '+jogador + "ganhow!!";
                    resetar()
                }
            })
        }
    }
}
function resetar(){
    const titulo = document.querySelector('.matriz > h1')
    matriz = [[" "," "," "],[" "," "," "],[" "," "," "]]
    for(let i=0;i<TAMANHO;i++){
        for(let l=0;l<TAMANHO;l++){
            let a =document.getElementById("elemento-"+i+"-"+l)
            a.style.backgroundImage = 'none';
        }
    }   
}
function trocarBackground(elemento){
    if(jogador == 1){
        console.log('trocar background : '+ jogador)
        elemento.style.backgroundImage = 'url(./assets/imagens/x.png)'
        jogador=2;
    }else{
        console.log('trocar background : '+ jogador)
        elemento.style.backgroundImage = 'url(./assets/imagens/bola.png)'
        jogador=1;
    }
}
function setarMatriz(elemento){
    let id = elemento 
    let linha = +id[id.length -3]
    let coluna = +id[id.length -1]
    matriz[linha][coluna] = jogador;
    return matriz;
}
function checkLinha(array){
    let jogada = array[0];
    if(!(jogada === ' ')){
        for(let i=0;i<array.length;i++){
            if(jogada !== array[i]){
                return false
            }
        }
        return true
    }
    return false
}

function checkMatriz(matriz){
    let coluna1 = [matriz[0][0],matriz[1][0],matriz[2][0]]
    let coluna2 = [matriz[0][1],matriz[1][1],matriz[2][1]]
    let coluna3 = [matriz[0][2],matriz[1][2],matriz[2][2]] 
   
    let diagonal1 = [matriz[0][0],matriz[1][1],matriz[2][2]]
    let diagonal2 = [matriz[0][2],matriz[1][1],matriz[2][0]]
   
    if(checkLinha(matriz[0]) || checkLinha(matriz[1]) || checkLinha(matriz[2])){
        return true;
    }else if(checkLinha(coluna1) || checkLinha(coluna2) ||checkLinha(coluna3)){
        return true;
    }else if(checkLinha(diagonal1) || checkLinha(diagonal2)){
        return true;
    }
    return false
}