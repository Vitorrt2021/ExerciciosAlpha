class Calculator{
    constructor(){
        this._operand1 = undefined;
        this._operand2 = undefined;
        this._operation = undefined;
    }
    setOperand1(value){
        this._operand1 = value;
    }
    setOperand2(value){
        this._operand2 = value;
    }
    setOperation(value){
        this._operation = value;
    }
    getResult(){
        switch (this._operation) {
            case "add":
              return this._operand1 + this._operand2
            case "subtract":
              return this._operand1 - this._operand2
            case "multiply":
              return this._operand1 * this._operand2
            case "divide":
              return this._operand1 / this._operand2 
            default:
              return false    
        }          
    }
    clearCalculator(){
        this._operand1 = undefined;
        this._operand2 = undefined;
        this._operation = undefined;

        return {
           operand1:this._operand1,
           operand2:this._operand2,
           operation:this._operation
        } 
    }

}
const calculator = new Calculator()
setValue()
getValues()

const Bt_add = document.querySelector('.add')
Bt_add.addEventListener('click',add)

const Bt_subtract = document.querySelector('.subtract')
Bt_subtract.addEventListener('click',subtract)

const Bt_multiply = document.querySelector('.multiply')
Bt_multiply.addEventListener('click',multiply)

const Bt_divide = document.querySelector('.divide')
Bt_divide.addEventListener('click',divide)

const Bt_clear = document.querySelector('.clear')
Bt_clear.addEventListener('click',()=>{
    calculator.clearCalculator();
    document.querySelector('.result').innerHTML = '';
    document.querySelector('#setValue1').innerHTML = "SetValue 1"
    document.querySelector('#setValue2').innerHTML = "SetValue 2"
})

function getValues(){
    const result_1 = document.querySelector('.result');
    document.querySelector('.container__buttons').addEventListener('click',(e)=>{
        result_1.innerHTML+=e.target.id
    })
}
function setValue(){
    const result_1 = document.querySelector('.result');
    
    document.querySelector('#setValue1').addEventListener('click',()=>{
        calculator.setOperand1(+result_1.innerHTML)
        document.querySelector('#setValue1').innerHTML = result_1.innerHTML
        result_1.innerHTML = ''
    });
    document.querySelector('#setValue2').addEventListener('click',()=>{
        calculator.setOperand2(+result_1.innerHTML)
        document.querySelector('#setValue2').innerHTML = result_1.innerHTML
        result_1.innerHTML = ''
    });
}
function add(){
    calculator.setOperation('add');
    const result_1 = document.querySelector('.result');
    result_1.innerHTML = calculator.getResult();
}
function subtract(){
    calculator.setOperation('subtract')
    const result_1 = document.querySelector('.result')
    result_1.innerHTML = calculator.getResult();
}
function multiply(){
    calculator.setOperation('multiply');
    const result_1 = document.querySelector('.result');
    result_1.innerHTML = calculator.getResult();
}
function divide(){
    calculator.setOperation('divide');
    const result_1 = document.querySelector('.result')
    result_1.innerHTML = calculator.getResult();
}