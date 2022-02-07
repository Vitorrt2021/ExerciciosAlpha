class Calculator{
    
    
    setOperand1 = (value) =>{
        this._operand1 = value;
    }
    setOperand2 = (value)=>{
        this._operand2 = value;
    }
    setOperation= (value)=>{
        this._operation = value;
    }
    getResult = () =>{
        switch (this._operation) {
            case "add":
              return this._operand1 + this._operand2
            case "subtract":
              return this._operand1 - this._operand2
            case "multiply":
              return this._operand1 *this._operand2
            case "divide":
              return this._operand1 / this._operand2 
            default:
              return false    
        }          
    }
    clearCalculator = ()=>{
        this._operand1 = undefined;
        this._operand2 = undefined;
        this._operation = undefined;
    }
}
const calculator = new Calculator();

$(document).ready(function(){
    $('.container__buttons').on('click',function(event){
        $('.result').append(event.target.id)
    })
    $('.add').on('click',function(){
        calculator.setOperation('add');
        if(calculator._operand1 && calculator._operand2){
            $('.result').text(calculator.getResult());
        }    
    })
    $('.subtract').on('click',function(){
        calculator.setOperation('subtract')
        if(calculator._operand1 && calculator._operand2){
            $('.result').text(calculator.getResult());  
        }  
    })
    $('.multiply').on('click',function(){
        calculator.setOperation('multiply')
        if(calculator._operand1 && calculator._operand2){
            $('.result').text(calculator.getResult());    
        }
    })
    $('.divide').on('click',function(){
        calculator.setOperation('divide')
    
        if(calculator._operand1 && calculator._operand2){
            $('.result').text(calculator.getResult());    
        }
    })
    $('.clear').on('click',function(){
        calculator.clearCalculator();
        $('.result').text(' ');    
        $('#setValue1').text("SetValue 1")
        $('#setValue2').text("SetValue 2")    
    })
    $('#setValue1').on('click',function(){
        calculator.setOperand1(parseFloat($('.result').text()))
        $(this).text($('.result').text())
        $('.result').text(' ');    
        
    })
    $('#setValue2').on('click',function(){
        calculator.setOperand2(parseFloat($('.result').text()))
        $(this).text($('.result').text())
        $('.result').text(' ');    
        
    })
  
})
