let posicoes=0;
let jaExecutou = false;
const resultadoScreen = document.querySelector('.resultado')
let classificacao = document.querySelector('.classificacao')

const voltarPrimeiraPagina = document.querySelector('.voltar-primeiraPagina')
const resultado = document.querySelector('.resultado')
const escolherModoPagina = document.querySelector('.escolherModoPagina');
const escolherModoContainer = document.querySelector('.escolherModoContainer');
const escolherParticipantes = document.querySelector('.escolherParticipantes')
const escolherAleatorio = document.querySelector('.escolherAleatorio')
const nomeAdicionar = document.querySelector('.inputNome')
const irResultado = document.querySelector('.irResultado');
const confirmarEscolherModoPre = document.querySelector('.confirmar--escolherModo--preSelecionado')

voltarPrimeiraPagina.addEventListener('click',IrPrimeiraPagina)
IrPrimeiraPagina()




confirmarEscolherModoPre.addEventListener('click',modoPreSelecionado)
const confirmarEscolherModoAle = document.querySelector('.confirmar--escolherModo--aleatorio')
confirmarEscolherModoAle.addEventListener('click',EscolherAleatorio)

const corridaRapida = document.querySelector('.corridaRapida')
corridaRapida.addEventListener('click',function (){correrBasico(10);})
const grandePremio = document.querySelector('.grandePremio')
grandePremio.addEventListener('click',function (){correrBasico(70)})
const enduro = document.querySelector('.enduro')
enduro.addEventListener('click',function (){correrBasico(160)})

function modoPreSelecionado(){
    voltarPrimeiraPagina.style.display = 'block'
    escolherModoPagina.style.display = 'flex';
    escolherModoContainer.style.display = 'flex';
    escolherParticipantes.style.display = 'none'
    jaExecutou = false;
}
function criarDivClassificacao(){
    resultado.style.display = 'none'
    
    //remover de classficacao
    classificacao.remove()
    classificacao = document.createElement('div')
    classificacao.setAttribute('class','classificacao')
    resultado.append(classificacao)

}
function carrinhoAleatorio(){
    
    let popular = new runner("popular",intAleatorio(180,200),intAleatorio(110,130),floatAleatorio(3,4))
    let sport = new runner("sport",intAleatorio(195,215),intAleatorio(125,145),floatAleatorio(2,3))
    let superSport = new runner("superSport",intAleatorio(210,230),intAleatorio(140,160),floatAleatorio(1,1.75))

    let i = intAleatorio(0,100)
    if(i<60){
        return popular
    }else if(i<95){
        return sport
    }else{
        return superSport
    }
}
function floatAleatorio(min, max) {
    return Math.random() * (max - min) + min;
  }
function intAleatorio(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
function EscolherAleatorio(){
 
    escolherParticipantes.style.display = 'none' 
    voltarPrimeiraPagina.style.display = 'block'
    voltarPrimeiraPagina.addEventListener("click", function() {
        location.reload();
    });
    criarDivClassificacao()
    posicoes=0;
  
    jaExecutou = false;
    escolherAleatorio.style.display = 'flex'
    let corredores = []
    const adicionarCorredor = document.querySelector('.adicionarCorredor')
    adicionarCorredor.addEventListener('click',function (){
        if(nomeAdicionar.value != undefined){
            let velocidadeMax =  Math.floor(Math.random() * (280 - 200)) + 200
            let velocidadeMin = Math.floor(Math.random() * (150 - 100)) + 100 
            let derrapagem =  Math.floor(Math.random() * (8 - 1)) + 1
            let n = new runner(nomeAdicionar.value,velocidadeMax,velocidadeMin,derrapagem);
            corredores.push(n)
        }
    })
    irResultado.addEventListener('click',function(){        
        const numeroVoltas = document.querySelector('.numVoltas')    
        correr(numeroVoltas.value,corredores)
    })
}
function IrPrimeiraPagina(){
    escolherParticipantes.style.display = 'flex'    
    voltarPrimeiraPagina.style.display = 'none';
    escolherAleatorio.style.display = 'none'
    escolherModoPagina.style.display = 'none';
    escolherModoContainer.style.display = 'none';
    resultado.style.display = 'none'
    
    //remover de classficacao
    criarDivClassificacao()
    posicoes=0;
    //
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
    elementoVenceu.append(corredor.qtdVencida);
    elementoNome.append( (posicoes+1) +"º  "+corredor.nome);
    classificacao.append(criarPosicao(elementoNome,elementoVenceu));
}

class runner {
    constructor(nome,velocidadeMax, velocidadeMin, derrapagem) {
      this.nome = nome;
      this.velocidadeMax = velocidadeMax;
      this.velocidadeMin = velocidadeMin;
      this.derrapagem = derrapagem;
      this.qtdVencida = 0;
      this.velocida =0;
    }
    calcularVelocidade() {
        this.velocidade = Math.floor(Math.random() * (this.velocidadeMax - this.velocidadeMin)) + this.velocidadeMin
        this.velocidade -= this.velocidade * (this.derrapagem/100); 
    }
    adicionarQtdVencida(){
        this.qtdVencida++;
    }
}
function IrPaginaResultado(){
    
    escolherModoPagina.style.display = 'none';
    escolherAleatorio.style.display = 'none'
    resultado.style.display = 'flex'
    
    const escolherModoContainer = document.querySelector('.escolherModoContainer');
    escolherModoContainer.style.display = 'flex';
}
function correrBasico(voltas){
    

    let Pedro = carrinhoAleatorio()
    let Juca = carrinhoAleatorio()
    let Edna = carrinhoAleatorio()
    
    Pedro.nome = "Pedro"
    Juca.nome = "Juca"
    Edna.nome = "Edna"
    let runners = [Pedro,Juca,Edna]
    
    correr(voltas,runners);
    jaExecutou = true;
    
}

function correr(voltas,runners){
    
    for(let i=0;i<voltas;i++){
        for(let j=0;j<runners.length;j++){
            runners[j].calcularVelocidade();
        }
        runners.sort(
            function(a, b) {
                return b.velocidade - a.velocidade;
            }
        );
        runners[0].adicionarQtdVencida()
    }
    runners.sort(function (a, b) {
            return b.qtdVencida-a.qtdVencida ;
        }
    );
    if(runners[0].qtdVencida == runners[1].qtdVencida){
        let rodadaEmpate = [];
        let cont=0;
        //pegar os que tem a mesma quantidade de vitoria
        while(runners[cont].velocidade == runners[0].velocidade){
            rodadaEmpate.push(runners[cont])
            cont++
        }
        //Ultima volta
        for(let j=0;j<rodadaEmpate.length;j++){
            rodadaEmpate[j].calcularVelocidade();
        }
        rodadaEmpate.sort(
            function(a, b) {
                return b.velocidade - a.velocidade;
            }
        );
        //Adicionar a vitoria ao vencedor
        for(let g=0;g<rodadaEmpate.length;g++){
            if(runners[g].nome == rodadaEmpate[0].nome){
                runners[g].adicionarQtdVencida();
            }
        }
    }
    for(let i=0;i<runners.length;i++){
        adicionarClassificado(runners[i])
    }
    IrPaginaResultado();
}
