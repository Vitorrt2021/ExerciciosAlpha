var square = function(numero) {return numero*numero}
var metade = function(numero){return numero/2}
var ola = function(){console.log('Ola mundo')}
console.log(square(8))
console.log(metade(8))
ola()

var Serimpar = function fac(n) {return n%2 ? true: false}
var fatorial = function fac(n) {return n<2 ? 1: n*fac(n-1)}
console.log(fatorial(4))
console.log(Serimpar(1))


let duplicar = function(num) {return num*2}

function map(funcao,vetor){
    let resultado = [];
    for(let i=0;i<vetor.length;i++){
        resultado.push(funcao(vetor[i]))
    }
    return resultado;
}
let a = map(duplicar,[1,2,3,4,5])
console.log(a)
function fora(x){
    function dentro(y){
        return x*y;
    }
    return dentro;
}
fn_inside = fora(3)
console.log(fn_inside)
result = fn_inside(5)
console.log(result)