function  createCalculator(){
    
    let _operand1 = undefined;
    let _operand2 = undefined;
    let _operation = undefined;
    
    const setOperand1 = (value) =>{
        _operand1 = value;
    }
    const setOperand2 = (value)=>{
        _operand2 = value;
    }
    const setOperation= (value)=>{
        _operation = value;
    }
    const getResult = () =>{
        switch (_operation) {
            case "add":
              return _operand1 + _operand2
            case "subtract":
              return _operand1 - _operand2
            case "multiply":
              return _operand1 * _operand2
            case "divide":
              return _operand1 / _operand2 
            default:
              return false    
        }          
    }
    const clearCalculator = ()=>{
        _operand1 = undefined;
        _operand2 = undefined;
        _operation = undefined;

        return {
           operand1:_operand1,
           operand2:_operand2,
           operation:_operation
        } 
    }
    return {
        clearCalculator,
        getResult,
        setOperand1,
        setOperand2,
        setOperation
    }

}
const calculator = createCalculator();
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