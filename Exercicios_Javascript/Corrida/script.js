let posicoes=0;
let jaExecutou = false;
const resultadoScreen = document.querySelector('.resultado')
let classificacao = document.querySelector('.classificacao')
IrPrimeiraPagina()

//criar script para caso de empate
//Mudar o modo aleatio escolha primeira pagina

function criarDivClassificacao(){
    const resultado = document.querySelector('.resultado')
    resultado.style.display = 'none'
    
    //remover de classficacao
    classificacao.remove()
    classificacao = document.createElement('div')
    classificacao.setAttribute('class','classificacao')
    resultado.append(classificacao)

}
function IrPaginaEscolherModo(participantes){
    const voltarPrimeiraPagina = document.querySelector('.voltar-primeiraPagina')
    const escolherParticipantes = document.querySelector('.escolherParticipantes')
    
    escolherParticipantes.style.display = 'none' 
    voltarPrimeiraPagina.addEventListener('click',IrPrimeiraPagina)
    voltarPrimeiraPagina.style.display = 'block'

    const escolherModoPagina = document.querySelector('.escolherModoPagina');
    escolherModoPagina.style.display = 'flex';
  
    const escolherModoContainer = document.querySelector('.escolherModoContainer');
    escolherModoContainer.style.display = 'flex';
  
    //Escolher modo estava executando mais de uma vez
    jaExecutou = false;
    if(participantes == "aleatorio"){

    }else{
        escolherModo()
    }

}
function IrPrimeiraPagina(){
    const escolherParticipantes = document.querySelector('.escolherParticipantes')
    escolherParticipantes.style.display = 'flex'

    
    const voltarPrimeiraPagina = document.querySelector('.voltar-primeiraPagina')
    voltarPrimeiraPagina.style.display = 'none';

    
    const escolherModoPagina = document.querySelector('.escolherModoPagina');
    escolherModoPagina.style.display = 'none';
  
    const escolherModoContainer = document.querySelector('.escolherModoContainer');
    escolherModoContainer.style.display = 'none';
  
    
    const resultado = document.querySelector('.resultado')
    resultado.style.display = 'none'
    
    //remover de classficacao
    criarDivClassificacao()
    posicoes=0;
    //
    const confirmarEscolherModoPre = document.querySelector('.confirmar--escolherModo--preSelecionado')
    confirmarEscolherModoPre.addEventListener('click',function(){
        IrPaginaEscolherModo('Pre-selecionado');
    })
    const confirmarEscolherModoAle = document.querySelector('.confirmar--escolherModo--aleatorio')
    confirmarEscolherModoAle.addEventListener('click',function() {
        IrPaginaEscolherModo('aleatorio');
    })
        
    
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
//rodou mais vezes quando clico em pre-selecionado
function escolherModo(){
    console.log('Escolher Modo;')
    const corridaRapida = document.querySelector('.corridaRapida')
    corridaRapida.addEventListener('click',function (){correrBasico(10)})
    const grandePremio = document.querySelector('.grandePremio')
    grandePremio.addEventListener('click',function (){correrBasico(70)})
    const enduro = document.querySelector('.enduro')
    enduro.addEventListener('click',function (){correrBasico(160)})
}
function IrPaginaResultado(){
    
    const escolherModoPagina = document.querySelector('.escolherModoPagina');
    escolherModoPagina.style.display = 'none';
  
    const resultado = document.querySelector('.resultado')
    resultado.style.display = 'flex'
    
    const escolherModoContainer = document.querySelector('.escolherModoContainer');
    escolherModoContainer.style.display = 'flex';
}
function correrBasico(voltas){
    if(!jaExecutou){
        let Pedro = new runner("Pedro",230,150,3);
        let Juca = new runner("Juca",260,120,5)
        let Edna = new runner("Edna",220,180,1)
        let runners = [Pedro,Juca,Edna]
        correr(voltas,runners);
        jaExecutou = true;
    }
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

/*
function compararVelocidade(a=0 , b=0) {
    return a.velocidade - b.velocidade;
}

function compararQtdVencida(a=0, b=0) {
    return a.qtdVencida - b.qtdVencida;
}
*/