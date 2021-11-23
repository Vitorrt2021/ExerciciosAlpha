function receberValor(elem){
    let elemento = document.querySelector(elem)
    return elemento.value;
}
function receberRadio(value){
    let h = document.querySelector('input[name='+ value +']:checked').value
    return h;
}
function trocarAsTelas(){
    const form = document.querySelector('form');
    form.style.display = 'none';
    
    const main = document.querySelector('main');
    main.style.display = 'flex';
    
    const buttons = document.querySelector('.button__form')
    buttons.style.display = 'none'
}
function receberDados(){
    trocarAsTelas();   
    document.querySelector('.Result--name > p').textContent = receberValor('#name')
    document.querySelector('.Result--email > p').textContent = receberValor('#email')
    document.querySelector('.Result--telephone > p').textContent = receberValor('#telephone')
    document.querySelector('.Result--estate > p').textContent = receberValor('#estate')
   
    document.querySelector('.Result--flavor > p').textContent = receberRadio('flavor')
    document.querySelector('.Result--time > p').textContent = receberRadio('time')
    document.querySelector('.Result--treatment > p').textContent = receberRadio('treatment')
    document.querySelector('.Result--show > p').textContent = receberRadio('show')
    
}