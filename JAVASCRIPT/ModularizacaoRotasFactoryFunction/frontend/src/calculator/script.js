const pathLocalHost = 'http://localhost:3004/calculator'

function  createCalculator(){
    
    let _operand1 = undefined;
    let _operand2 = undefined;
    let _operation = undefined;
    
    const setOperand1 = (value) =>{
        _operand1 = value;
    }
    const getOperand1 = ()=>{
        return _operand1
    }
    const setOperand2 = (value)=>{
        _operand2 = value;
    }
    
    const getOperand2 = ()=>{
        return _operand2
    }
    const setOperation= (value)=>{
        _operation = value;
    }
    
    const getOperation = ()=>{
        return _operation;
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
        setOperation,
        getOperation,
        getOperand1,
        getOperand2,
    }

}

const calculator = createCalculator();
setValue()
getValues()


function sendGet(path=' '){
    const requestOptions = {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    }
    request(pathLocalHost+'/'+path,requestOptions,setResult)
}

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
function setResult(data){
    console.log(data);
    const result_1 = document.querySelector('.result');
    result_1.innerHTML = data;    
}
function add(){
    calculator.setOperation('add');
    sendGet(`${calculator.getOperand1()}/${calculator.getOperand2()}/${calculator.getOperation()}`)
}
function subtract(){
    calculator.setOperation('subtract')
    sendGet(`${calculator.getOperand1()}/${calculator.getOperand2()}/${calculator.getOperation()}`)
}
function multiply(){
    calculator.setOperation('multiply');
    sendGet(`${calculator.getOperand1()}/${calculator.getOperand2()}/${calculator.getOperation()}`)
}
function divide(){
    calculator.setOperation('divide');
    sendGet(`${calculator.getOperand1()}/${calculator.getOperand2()}/${calculator.getOperation()}`)
}


function request(url,requestOptions,callback){
    fetch(url,requestOptions)
        .then(function(response){
            if(!response.ok) throw new Error("Erro ao executar requisição")
            return response.json()
        })
        .then(function(data){
            if(!data){
                alert('Não a informações valida')
            }else if(callback){
                callback(data)
            }
        })
        .catch(function(error){
            alert(error.message)
        })
}



