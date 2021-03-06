let posicoes=0;
const RESULTADO = document.querySelector('.resultado')

addEventListeners()


function clear(){
    RESULTADO.innerHTML = ''
    posicoes = 0
}
function addEventListeners(){
    const Corrida_Rapida = document.querySelector('.corrida_rapida')
    Corrida_Rapida.addEventListener('click',function(){clear();ResultadoCorrer(10);})
    
    const Grande_Premio = document.querySelector('.grande_premio')
    Grande_Premio.addEventListener('click',function(){clear();ResultadoCorrer(70);})
    
    const Enduro = document.querySelector('.enduro') 
    Enduro.addEventListener('click',function(){clear();ResultadoCorrer(160)})
}

function criarPosicao(nome,vencidas){
    const posicao = document.createElement('li')
    posicao.setAttribute('id','posicao-'+posicoes);
    posicao.append(nome);
    posicao.append(vencidas);
    posicoes++;
    return posicao;
}

function adicionarClassificado(corredor){
    const elementoNome = document.createElement('ul');
    elementoNome.setAttribute('class','classificacao--nome')
    const  elementoVenceu = document.createElement('ul')
    elementoVenceu.setAttribute('class','classificacao--vencidas')
    elementoVenceu.append(corredor.qtd_vencidas);
    elementoNome.append( (posicoes+1) +"º  "+corredor.nome);
    RESULTADO.append(criarPosicao(elementoNome,elementoVenceu));
}



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
    let corredores  = {
        "Edna":{
            "nome" : "Edna",
            "velocidade": "0",
            "qtd_vencidas": 0,
            "carro": "0"
        },
        "Juca":{
            "nome" : "Juca",
            "velocidade": "0",
            "qtd_vencidas": 0,
            "carro": "0"
        },
        "Pedro":{
            "nome" : "Pedro",
            "velocidade": "0",
            "qtd_vencidas": 0,
            "carro": "0"
        }
    }
    
    corredores.Edna['carro'] = iniciarCarros()
    corredores.Juca['carro'] = iniciarCarros()
    corredores.Pedro['carro'] = iniciarCarros()
    console.log(corredores)
    let c = [corredores.Edna,corredores.Pedro,corredores.Juca]
    return c
}
function novaVelocidade(array){
    
    for(let i=0;i<array.length;i++){
        let corredores = []
        corredores = array[i].carro;
        let maxVelocidade = parseInt(corredores.velocidade_maxima.max)
        let minVelocidade = parseInt(corredores.velocidade_maxima.min)
        let velocidadeMax = intAleatorio(minVelocidade,maxVelocidade)
        
        

        maxVelocidade = parseInt(corredores.velocidade_minima.max)
        minVelocidade = parseInt(corredores.velocidade_minima.min)
        let velocidadeMin = intAleatorio(minVelocidade,maxVelocidade)

        maxVelocidade = parseInt(corredores.derrapagem.max)
        minVelocidade = parseInt(corredores.derrapagem.min)

        let derrapagem =  intAleatorio(minVelocidade,maxVelocidade)

        array[i].velocidade = calcularVelocidade(velocidadeMin,velocidadeMax,derrapagem);
        
    }
    console.log('array: '+array)
    return array
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

function correr(voltas,runners){
       
    for(let i=0;i<voltas;i++){
        runners = novaVelocidade(runners)

        runners.sort(
            function(a, b) {
                return a.velocidade - b.velocidade;
            }
        );
        runners[0].qtd_vencidas++
    }
    runners.sort(function (a, b) {
        return b.velocidade-a.velocidade ;
    }
    );
    if(runners[0].qtd_vencidas == runners[1].qtd_vencidas){
        let rodadaEmpate = [];
        let cont=0;
        //pegar os que tem a mesma quantidade de vitoria
        while(runners[cont].qtd_vencidas == runners[0].qtd_vencidas){
            rodadaEmpate.push(runners[cont])
            cont++
        }
        //Ultima volta
        rodadaEmpate = novaVelocidade(rodadaEmpate)
        rodadaEmpate.sort(
            function(a, b) {
                return b.velocidade - a.velocidade;
            }
        );
        //Adicionar a vitoria ao vencedor
        for(let g=0;g<rodadaEmpate.length;g++){
            if(runners[g].nome == rodadaEmpate[0].nome){
                runners[g].qtd_vencidas++;
            }
        }
    }
    runners.sort(function (a, b) {
        return b.qtd_vencidas-a.qtd_vencidas ;
    })
    return runners
}

function ResultadoCorrer(voltas){

    const array = criarCorredores()    
    let resultado = correr(voltas,array)

    for(let i=0;i<resultado.length;i++){
        adicionarClassificado(resultado[i])
    }
    
}