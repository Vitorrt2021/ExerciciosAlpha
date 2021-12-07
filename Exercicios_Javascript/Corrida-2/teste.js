
let carros = {
    "popular": {
      "velocidade_maxima": {"min": "180", "max": "200"}, 
      "velocidade_minima": {"min": "110", "max": "130"}, 
      "derrapagem": {"min": "3", "max": "4"}
    },
    "sport": {
      "velocidade_maxima": {"min": "195", "max": "215"}, 
      "velocidade_minima": {"min": "125", "max": "145"}, 
      "derrapagem": {"min": "2", "max": "3"}
    },
    "supersport": {
      "velocidade_maxima": {"min": "210", "max": "230"}, 
      "velocidade_minima": {"min": "140", "max": "160"}, 
      "derrapagem": {"min": "1", "max": "1.75"}
    }
}
function calcularVelocidade(velocidadeMax,velocidadeMin,derrapagem) {
    let velocidade = 0;
    velocidade = Math.floor(Math.random() * (velocidadeMax - velocidadeMin)) + velocidadeMin
    velocidade -= velocidade * (derrapagem/100); 
    return velocidade
}
function iniciarCarros(){
    let carroEscolhido = Math.random()
    let carro;
    if(carroEscolhido > 0.95){
        carro = carros.popular
    }else if(carroEscolhido > 35){
        carro = carros.sport
    }else{
        carro = carros.supersport
    }
    return carro
}

function intAleatorio(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
function criarCorredores(){
    let Edna = iniciarCarros()
    let Pedro = iniciarCarros()
    let Juca = iniciarCarros()
    let corredores = [Edna,Pedro,Juca]
    return corredores
}
function novaVelocidade(matriz){
    
    for(let i=0;i<matriz.length;i++){
        let corredores = []
        corredores[i] = matriz[i][3];
        console.log("Coredo: "+corredores[i])
        let maxVelocidade = parseInt(corredores[i].velocidade_maxima.max)
        let minVelocidade = parseInt(corredores[i].velocidade_maxima.min)
        let velocidadeMax = intAleatorio(minVelocidade,maxVelocidade)
        
        

        maxVelocidade = parseInt(corredores[i].velocidade_minima.max)
        minVelocidade = parseInt(corredores[i].velocidade_minima.min)
        let velocidadeMin = intAleatorio(minVelocidade,maxVelocidade)

        maxVelocidade = parseInt(corredores[i].derrapagem.max)
        minVelocidade = parseInt(corredores[i].derrapagem.min)

        let derrapagem =  intAleatorio(minVelocidade,maxVelocidade)

        matriz[i][2] 
        = calcularVelocidade(velocidadeMin,velocidadeMax,derrapagem);
     
    }
    return matriz
}
function criarMatrizCorredores(corredores,nomes){
    //0 nome, 1 qTVENCIADAS, 2 velocidade vencidas,3 objeto 
    let matriz = [[],[],[]]
    for(let i=0;i<corredores.length;i++){
        matriz[i][0] = nomes[i]
        matriz[i][1] = 0;
        matriz[i][2] = 0;
        matriz[i][3] = corredores[i]
    }
    return matriz
}
function mostrarCorredores(){
    const nomeCorredores = ["Edna","Pedro","Juca"]
    const matriz = criarMatrizCorredores(criarCorredores(),nomeCorredores)    
    
    console.log(novaVelocidade(matriz))
}
mostrarCorredores()
const nomeCorredores = ["Edna","Pedro","Juca"]
 
const matriz = criarMatrizCorredores(criarCorredores(),nomeCorredores)    
   
console.log(correr(10,matriz))

function correr(voltas,runners){
       
    for(let i=0;i<voltas;i++){
        runners = novaVelocidade(runners)

        runners.sort(
            function(a, b) {
                return a[2] - b[2];
            }
        );
        console.log(runners)
        runners[0][1]++
    }
    runners.sort(function (a, b) {
        return b[1]-a[1] ;
    }
    );
    if(runners[0][1] == runners[1][1]){
        let rodadaEmpate = [];
        let cont=0;
        //pegar os que tem a mesma quantidade de vitoria
        while(runners[cont][2] == runners[0][2]){
            rodadaEmpate.push(runners[cont])
            cont++
        }
        //Ultima volta
        rodadaEmpate = novaVelocidade(rodadaEmpate)
        rodadaEmpate.sort(
            function(a, b) {
                return b[2] - a[2];
            }
        );
        //Adicionar a vitoria ao vencedor
        for(let g=0;g<rodadaEmpate.length;g++){
            if(runners[g][0] == rodadaEmpate[0][0]){
                runners[g][1]++;
            }
        }
    }
    runners.sort(function (a, b) {
        return b[1]-a[1] ;
    })
 
    for(let i=0;i<runners.length;i++){
        console.log("Nome: " + runners[i][0] +"Qtd: "+runners[i][1])
    }
}