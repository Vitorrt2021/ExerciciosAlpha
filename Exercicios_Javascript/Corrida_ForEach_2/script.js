let posicoes=0;
let VENCEDORES=[]
let nomeCarroProcurado;
let corredorProcurado;
const RESULTADO = document.querySelector('.resultado')


addEventListeners()


function clear(){
    RESULTADO.innerHTML = ''
    posicoes = 0
}
function addEventListenersNivel(elemento,carroNome,carros,corredor){
    elemento.addEventListener('click',function() { 
        corredorProcurado = corredor;
        nomeCarroProcurado = carroNome;
        carros.forEach(passarNivel);
    })   
}

function adicionarCarroHTML(carro,corredor){
    let nome = corredor.nome
    let arrayCarro = corredor.carro
    const elementoNomeCarro = document.createElement('ul');
    elementoNomeCarro.setAttribute('class','carros--nome')
    const  elementoNivel = document.createElement('ul')
    elementoNivel.setAttribute('class','carros--nivel')
    elementoNivel.append("Nivel: "+ carro.nivel)
    elementoNomeCarro.append(carro["nome"]);
    
    const elementoCarro =criarCarroHTML(nome,elementoNomeCarro,carro["nome"],elementoNivel) 
    RESULTADO.append(elementoCarro);
    addEventListenersNivel(elementoCarro,carro['nome'],arrayCarro,corredor)
}
function passarNivel(element){
   if(element.nome === nomeCarroProcurado){ 
        console.log(element)  
        console.log(corredorProcurado);
        if(corredorProcurado.pontos >=450 && element.nivel <= 10){
            element.nivel += 1;
            corredorProcurado.pontos -= 450
        }
        element.vel_max.min += element.vel_max.min * 0.01 
        element.vel_max.max += element.vel_max.max * 0.01
        
        element.vel_min.min += element.vel_min.min * 0.01
        element.vel_min.max += element.vel_min.max * 0.01
        
   }
   
}
function addEventListeners(){
    const Corrida_Rapida = document.querySelector('.corrida_rapida')
    Corrida_Rapida.addEventListener('click',function(){clear();ResultadoCorrer(10);})
    
    const Grande_Premio = document.querySelector('.grande_premio')
    Grande_Premio.addEventListener('click',function(){clear();ResultadoCorrer(70);})
    
    const Enduro = document.querySelector('.enduro') 
    Enduro.addEventListener('click',function(){clear();ResultadoCorrer(160)})
    
    const Carro_edna = document.querySelector('.edna')
    Carro_edna.addEventListener('click',function(){
        clear();
        mostrarPontosHTML(corredores.Edna.pontos)
        adicionarCarroHTML(corredores.Edna.carro[0],corredores.Edna)
        adicionarCarroHTML(corredores.Edna.carro[1],corredores.Edna)
        adicionarCarroHTML(corredores.Edna.carro[2],corredores.Edna)
        })
    
    const Carro_juca = document.querySelector('.juca')
    Carro_juca.addEventListener('click',function(){
        clear();
        mostrarPontosHTML(corredores.Juca.pontos)
        adicionarCarroHTML(corredores.Juca.carro[0],corredores.Juca)
        adicionarCarroHTML(corredores.Juca.carro[1],corredores.Juca)
        adicionarCarroHTML(corredores.Juca.carro[2],corredores.Juca)
        })
    
    const Carro_pedro = document.querySelector('.pedro') 
    Carro_pedro.addEventListener('click',function(){
        clear();
        mostrarPontosHTML(corredores.Pedro.pontos)
        adicionarCarroHTML(corredores.Pedro.carro[0],corredores.Pedro)
        adicionarCarroHTML(corredores.Pedro.carro[1],corredores.Pedro)
        adicionarCarroHTML(corredores.Pedro.carro[2],corredores.Pedro)
        })

    

}
function mostrarPontosHTML(pontos){
    const ponto = document.createElement('h2')
    ponto.innerHTML = "Pontos: "+pontos;
    
    const ajuda = document.createElement('p')
    ajuda.innerHTML = "Clique no nome do carro para aumentar o nivel."
    RESULTADO.append(ponto);
    RESULTADO.append(ajuda);

}
function criarCarroHTML(nome,elementoCarro,carroNome,nivel){
    const posicao = document.createElement('li')
    posicao.setAttribute('id',nome +"-"+carroNome);
    posicao.append(elementoCarro);
    posicao.append(nivel);
    posicoes++;
    return posicao;
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
    elementoNome.append( (posicoes+1) +"º  "+corredor.nome)
    RESULTADO.append(criarPosicao(elementoNome,elementoVenceu));
}



let carros = {
    "popular": {
        "nome": "Popular",
        "nivel": 0,
        "vel_max": {"min": 180, "max": 200}, 
        "vel_min": {"min": 110, "max": 130}, 
        "derrapagem": {"min": 3, "max": 4}
    },
    "sport": {
        
        "nome": "Sport",
        "nivel": 0,
        "vel_max": {"min": 195, "max": 215}, 
        "vel_min": {"min": 125, "max": 145}, 
        "derrapagem": {"min": 2, "max": 3}
    },
    "supersport": {
        
        "nome": "SuperSport",
        "nivel": 0,
        "vel_max": {"min": 210, "max": 230}, 
        "vel_min": {"min": 140, "max": 160}, 
        "derrapagem": {"min": 1, "max": 1.75}
    }
}
const arrayDeCarros = [Object.assign([], carros.supersport),Object.assign([], carros.sport),Object.assign([], carros.popular)]
let corredores  = {
    "Edna":{
        "nome" : "Edna",
        "velocidade": "0",
        "qtd_vencidas": 0,
        "pontos":0,
        "carro": [Object.assign([], carros.supersport),Object.assign([], carros.sport),Object.assign([], carros.popular)],
        "carro_atual": 0
    },
    "Juca":{
        "nome" : "Juca",
        "velocidade": "0",
        "qtd_vencidas": 0,
        "pontos": 0,
        "carro": [Object.assign([], carros.supersport),Object.assign([], carros.sport),Object.assign([], carros.popular)],
        "carro_atual": 0
    },
    "Pedro":{
        "nome" : "Pedro",
        "velocidade": "0",
        "qtd_vencidas": 0,
        "pontos":0,
        "carro":  [Object.assign([], carros.supersport),Object.assign([], carros.sport),Object.assign([], carros.popular)],
        "carro_atual": 0
    }
}

function calcularVelocidade(velocidadeMax,velocidadeMin,derrapagem) {
    let velocidade = 0;

    velocidade = Math.floor(Math.random() * (velocidadeMax - velocidadeMin)) + velocidadeMin
    velocidade -= velocidade * (derrapagem/100);
    
    return velocidade
}
function iniciarCarros(carro){
    let carroNumero = Math.random()
    let carro_escolhido;
    if(carroNumero > 0.95){
        carro_escolhido = carro[2]
    }else if(carroNumero > 0.35){
        carro_escolhido = carro[1]
    }else{
        carro_escolhido = carro[0]
    }
    return carro_escolhido
}

function intAleatorio(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
function criarCorredores(){
    corredores.Edna["carro_atual"] =  iniciarCarros(corredores.Edna.carro)
    corredores.Juca["carro_atual"] =  iniciarCarros(corredores.Juca.carro)
    corredores.Pedro["carro_atual"] =  iniciarCarros(corredores.Pedro.carro)
    
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
        corredores = array[i].carro_atual;

        let maxVelocidade = parseInt(corredores.vel_max.max)
        let minVelocidade = parseInt(corredores.vel_max.min)
        let velocidadeMax = intAleatorio(minVelocidade,maxVelocidade)
        
        maxVelocidade = parseInt(corredores.vel_min.max)
        minVelocidade = parseInt(corredores.vel_min.min)

        let velocidadeMin = intAleatorio(minVelocidade,maxVelocidade)

        maxVelocidade = parseInt(corredores.derrapagem.max)
        minVelocidade = parseInt(corredores.derrapagem.min)

        let derrapagem =  intAleatorio(minVelocidade,maxVelocidade)
        
        array[i].velocidade = calcularVelocidade(velocidadeMin,velocidadeMax,derrapagem,nivel);
        
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
    runners[0].pontos += 200
    runners[1].pontos += 120
    runners[2].pontos += 50
     
    return runners
}

function ResultadoCorrer(voltas){

    const array = criarCorredores()    
    VENCEDORES = correr(voltas,array)

    for(let i=0;i<VENCEDORES.length;i++){
        adicionarClassificado(VENCEDORES[i])
    }
    
}