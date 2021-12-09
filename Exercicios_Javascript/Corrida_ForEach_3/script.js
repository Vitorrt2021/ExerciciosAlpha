let posicoes=0;
let VENCEDORES=[]
const RESULTADO = document.querySelector('.resultado')

addEventListeners()


function clear(){
    RESULTADO.innerHTML = ''
    posicoes = 0
}
function addEventListeners(){
    const Corrida_Rapida = document.querySelector('.corrida_rapida')
    Corrida_Rapida.addEventListener('click',function(){clear();ResultadoCorrer(10);
        VENCEDORES.forEach(passarNivel)})
    
    const Grande_Premio = document.querySelector('.grande_premio')
    Grande_Premio.addEventListener('click',function(){clear();ResultadoCorrer(70);
        VENCEDORES.forEach(passarNivel)})
    
    const Enduro = document.querySelector('.enduro') 
    Enduro.addEventListener('click',function(){clear();ResultadoCorrer(160)
        VENCEDORES.forEach(passarNivel)})

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
    elementoNome.append( (posicoes+1) +"º  "+corredor.nome+"      Nivel: "+ corredor.nivel);
    RESULTADO.append(criarPosicao(elementoNome,elementoVenceu));
}



let carros = {
    "popular": {
      "vel_max": {"min": "180", "max": "200"}, 
      "vel_min": {"min": "110", "max": "130"}, 
      "derrapagem": {"min": "3", "max": "4"}
    },
    "sport": {
      "vel_max": {"min": "195", "max": "215"}, 
      "vel_min": {"min": "125", "max": "145"}, 
      "derrapagem": {"min": "2", "max": "3"}
    },
    "supersport": {
      "vel_max": {"min": "210", "max": "230"}, 
      "vel_min": {"min": "140", "max": "160"}, 
      "derrapagem": {"min": "1", "max": "1.75"}
    }
}
let corredores  = {
    "Edna":{
        "nome" : "Edna",
        "velocidade": "0",
        "qtd_vencidas": 0,
        "velocidadeMax" : 0,
        "velocidadeMin":0,
        "pontos":0,
        "nivel":0,
        "carro": iniciarCarros()
    },
    "Juca":{
        "nome" : "Juca",
        "velocidade": "0",
        "velocidadeMax" : 0,
        "velocidadeMin": 0,
        "qtd_vencidas": 0,
        "pontos": 0,
        "nivel": 0,
        "carro": iniciarCarros()
    },
    "Pedro":{
        "nome" : "Pedro",
        "velocidade": "0",
        "velocidadeMax" : 0,
        "velocidadeMin":0,
        "qtd_vencidas": 0,
        "pontos":0,
        "nivel":0,
        "carro": iniciarCarros()
    }
}

function passarNivel(element){
        if(element.nivel < 10){
            element.nivel = Math.floor(parseInt(element.pontos)/450)
        }
        if(element.nivel > 10){
            element.nivel = 10;
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
    }else if(carroEscolhido > 0.35){
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
    corredores.Edna["carro"] =  iniciarCarros()
    corredores.Juca["carro"] =  iniciarCarros()
    corredores.Pedro["carro"] =  iniciarCarros()
    
    corredores.Edna["qtd_vencidas"] =  0
    corredores.Juca["qtd_vencidas"] =  0
    corredores.Pedro["qtd_vencidas"] =  0 
    let c = [corredores.Edna,corredores.Pedro,corredores.Juca]
    return c
}
function novaVelocidade(array){
    
    for(let i=0;i<array.length;i++){
        let nivel = parseInt(array[i].nivel);
        let corredores = []
        corredores = array[i];

        let maxVelocidade = parseInt(corredores.carro.vel_max.max)
        let minVelocidade = parseInt(corredores.carro.vel_max.min)
       
        corredores.velocidadeMax = intAleatorio(minVelocidade,maxVelocidade)
        
        maxVelocidade = parseInt(corredores.carro.vel_min.max)
        minVelocidade = parseInt(corredores.carro.vel_min.min)
      
        corredores.velocidadeMin = intAleatorio(minVelocidade,maxVelocidade)

        maxVelocidade = parseInt(corredores.carro.derrapagem.max)
        minVelocidade = parseInt(corredores.carro.derrapagem.min)

        let derrapagem =  intAleatorio(minVelocidade,maxVelocidade)

        console.log(corredores.velocidadeMax)
        
        corredores.velocidadeMax += corredores.velocidadeMax * (0.01 * corredores.nivel)
        corredores.velocidadeMin += corredores.velocidadeMin * (0.01 * corredores.nivel)

        console.log(corredores.velocidadeMax)
        corredores.velocidade = calcularVelocidade(corredores.velocidadeMin,corredores.velocidadeMax,derrapagem,nivel);
        
    }
    return array
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
    //Passar os pontos
    if(voltas == 10){
        runners[0].pontos += 200
        runners[1].pontos += 120
        runners[2].pontos += 50
    }else if(voltas == 70){
        runners[0].pontos += 220
        runners[1].pontos += 130
        runners[2].pontos += 75
    }else{
        runners[0].pontos += 250
        runners[1].pontos += 150
        runners[2].pontos += 90
    }
    console.log()
    return runners
}

function ResultadoCorrer(voltas){

    const array = criarCorredores()    
    VENCEDORES = correr(voltas,array)

    for(let i=0;i<VENCEDORES.length;i++){
        adicionarClassificado(VENCEDORES[i])
    }
    
}