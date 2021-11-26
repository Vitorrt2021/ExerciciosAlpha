function stopDefAction(evt) {
    evt.preventDefault();
}
const SEND = document.querySelector('#send')
SEND.addEventListener('click',stopDefAction)
SEND.addEventListener('click',mudarTela)

function receberRadio(value){
    let h = document.querySelector('input[name='+ value +']:checked').value
    return h;
}
function selecionarPao(pao){
    if(pao === 'frances'){
        return 3
    }else if(pao ==='australiano'){
        return 8
    }else{
        return 6
    }
}
function selecionarHamburguer(carne){
    if(carne === 'picanha'){
        return 13
    }else if(carne ==='costela'){
        return 10
    }else{
        return 12
    }
}
function selecionarSalada(salada){
    if(salada === 'alface'){
        return 1.5
    }else if(salada ==='tomate'){
        return 1.5
    }else{
        return 0
    }
}

function selecionarQueijo(queijo){
    if(queijo === 'mussarela'){
        return 3
    }else if(queijo ==='prato'){
        return 3
    }else{
        return 5
    }
}
function organizarPedido(pao,carne,salada,queijo){
    const PAOPEDIDO = document.querySelector('.pao__main')
    PAOPEDIDO.textContent = pao
    const CARNEPEDIDO = document.querySelector('.carne__main')
    CARNEPEDIDO.textContent = carne
    const SALADAPEDIDO = document.querySelector('.salada__main')
    SALADAPEDIDO.textContent = salada
    const QUEIJOPEDIDO = document.querySelector('.queijo__main')
    QUEIJOPEDIDO.textContent = queijo

}
function calcularPreco(){
    let pao = receberRadio('pao')
    let hamburguer = receberRadio('carne')
    let salada = receberRadio('salada')
    let queijo = receberRadio('queijo')

    organizarPedido(pao,hamburguer,salada,queijo)
    let preco = selecionarHamburguer(hamburguer) + selecionarPao(pao) + selecionarSalada(salada) + selecionarQueijo(queijo)
    document.querySelector('main > h2').textContent ='O valor total do pedido é de R$ ' + preco ;
}
function mudarTela(){
    const MAIN = document.querySelector('main')
    MAIN.style.display = 'flex'
    const FORM = document.querySelector('form')
    FORM.style.display = 'none'
    calcularPreco()

}