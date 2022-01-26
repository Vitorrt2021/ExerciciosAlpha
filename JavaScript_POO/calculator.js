
function Calculador(){
    let operador1;
    let operador2;
    let operation;

    function setOperador1(value){
        operador1 = value
    }

    function setOperador2(value){
        operador2 = value
    }
    function setOperation(value){
        operation = value
    }

    function getResult(){
        switch (operation) {
            case "+":
              return operador1 + operador2
            case "-":
              return operador1 - operador2
            case "x":
              return operador1 * operador2
            case "/":
              return operador1 / operador2 
            default:
              return false    
        }          
    }
    return {
        setOperador1,
        setOperador2,
        setOperation,
        getResult
    }
}
const calculador = new Calculador();
calculador.setOperador1(12)
calculador.setOperador2(21)
calculador.setOperation('+')
console.log(calculador.getResult())