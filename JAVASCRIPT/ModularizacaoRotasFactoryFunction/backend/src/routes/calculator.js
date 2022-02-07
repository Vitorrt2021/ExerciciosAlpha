const routerCalculator = require('express').Router();
const calculator = require('../controller/calculator');
const calcula = calculator();

routerCalculator.get('/',(req,res)=>{
    res.send('Con')
})

routerCalculator.get('/:operand1/:operand2/:operation',(req,res)=>{
    calcula.setOperand1(parseInt(req.params.operand1));
    calcula.setOperand2(parseInt(req.params.operand2));
    calcula.setOperation(req.params.operation);
    const result = calcula.getResult();
    calcula.clearCalculator();
    res.send(JSON.stringify(result));
})
module.exports = routerCalculator
