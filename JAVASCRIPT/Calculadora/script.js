
const Bt_add = document.querySelector('.add')
Bt_add.addEventListener('click',add)

const Bt_subtract = document.querySelector('.subtract')
Bt_subtract.addEventListener('click',subtract)

const Bt_multiply = document.querySelector('.multiply')
Bt_multiply.addEventListener('click',multiply)

const Bt_divide = document.querySelector('.divide')
Bt_divide.addEventListener('click',divide)

function add(){
    let input_1 = +document.querySelector('#input_1').value
    let input_2 = +document.querySelector('#input_2').value
    const result_1 = document.querySelector('.result')
    result_1.innerHTML = input_1 + input_2;
}
function subtract(){
    let input_1 = +document.querySelector('#input_1').value
    let input_2 = +document.querySelector('#input_2').value
    const result_1 = document.querySelector('.result')
    result_1.innerHTML = input_1 - input_2;
}
function multiply(){
    let input_1 = +document.querySelector('#input_1').value
    let input_2 = +document.querySelector('#input_2').value
    const result_1 = document.querySelector('.result')
    result_1.innerHTML = input_1 * input_2;
}
function divide(){
    let input_1 = +document.querySelector('#input_1').value
    let input_2 = +document.querySelector('#input_2').value
    const result_1 = document.querySelector('.result')
    result_1.innerHTML = input_1 / input_2;
}