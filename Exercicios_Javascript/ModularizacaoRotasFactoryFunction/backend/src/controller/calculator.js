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

module.exports = createCalculator;