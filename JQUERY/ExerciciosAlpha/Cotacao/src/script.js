
let dayBetwen = [];
const urlApi = 'https://economia.awesomeapi.com.br/'
$(document).ready(function(){
    $.ajax({url: urlApi+"/json/all", 
        success: function(result){
            createSelect(result);
    }});

    $('#select_coin').on('change',function(){
        const coin = $("#select_coin option:selected").val()
        $.ajax({url: urlApi+`json/last/${coin}`, 
        success: function(result){
            $('#coin_show').html(coin)
            createTableUnitary(result);
        }});
    })
    $('#send_requisition').on('click',function(e){
        e.preventDefault();
        const coin = $("#select_coin option:selected").val()
        const initial = $('#initial_date').val().replaceAll('-','');
        const final = $('#final_date').val().replaceAll('-','');

        if(dateIsWrong()) return false;

        $.ajax({url: urlApi+`${coin}?start_date=${initial}&end_date=${final}`, 
        success: function(result){
            dayBetwen = []
            $('#coin_show').html(coin)        
            createTable(result);
            betweenDays(coin)
        }});
        
    })
})

function dateIsWrong(){
    const initial = $('#initial_date').val();
    const initialDate = new Date(initial)
    if(initial === ''){
        alert('required both date fields filled in')
        return true
    }
    if(initialDate > new Date()){
        alert("The start date must be a day in the past")
        return true
    }
    const final = $('#final_date').val()
    const finalDate = new Date(final)
    if(final === ''){
        alert('required both date fields filled in')
        return true
    }
    if(finalDate > new Date()){
        alert('The end date must be in the past, we have no information about the future')
        return true
    }
    if(finalDate < initialDate){
        alert('The end date must be greater than the start date')
        return true
    }

}
function createSelect(coins){
    const coinsArray = Object.keys(coins)
    coinsArray.forEach((c)=>{
        const coin = `<option value=${c}>${c}</option>`
        $('#select_coin').append(coin)    
    })
}

function createTable(array){
    console.log('-----------------')
    console.log(array)
    console.log(array['0'])
    $('#result_table')
                    .html('')
                    .attr('class','tableDays')
    const head = $('<tr></tr>');      

    const keys = Object.keys(array['0'])

    keys.forEach((key)=>{
        let atr = $("<td></td>").text(key.toUpperCase()).attr('class','table_header'); 
        head.append(atr)    
    })
    $('#result_table').append(head)
  
}

function addInArray(el){
    console.log(dayBetwen)
    dayBetwen.push(el)
    dayBetwen.sort(function(a,b){
        console.log('-----------A')
        console.log(a)
        console.log(a[0])
        let dateA = new Date(a.create_date)
        let dateB = new Date(b.create_date)
        if (dateA > dateB) {
            return 1;
        }
        if (dateA < dateB) {
           return -1;
        }
          return 0;   
    })
      
    dayBetwen.forEach(e=>{
        console.log('-------------ForEach')
        console.log(e)
        addOnTable(e)
    })
}

function betweenDays(coin){
    const initial = new Date($('#initial_date').val());
    const final = new Date($('#final_date').val());
    
    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    let initialAux = initial;
    
    while(initialAux <= final){
        initialAux = addDays(initialAux,1)
        const initialStr = initialAux.toISOString().split('T')[0].replaceAll('-','');       
        $.ajax({url: urlApi+`${coin}?start_date=${initialStr}&end_date=${initialStr}`, 
        success: function(result){
            createTable(result);
            addInArray(result);
        }});
    }
}
function addOnTable(array){
    let dada = array[0] 
    const keys = Object.keys(dada)
    const linha = $('<tr></tr>');
    
    keys.forEach((key)=>{
        let atr = $("<td></td>").text(dada[key]).attr('class',key); 
        linha.append(atr)    
    }) 
    
    $('#result_table').append(linha)   
}

function createTableUnitary(array){
    $('#result_table').html('').attr('class','tableDay')

    let dada;
    if(!Array.isArray(array)) dada =Object.entries(array)
    else dada = array[1];
    
    dada = dada[0][1]
    const keys = Object.keys(dada)
    const linha = $('<tr></tr>');
    const head = $('<tr></tr>');
    
    keys.forEach((key)=>{
        console.log(keys)
        let atr = $("<td></td>").text(key.toUpperCase()).attr('class','table_header'); 
        head.append(atr)    
    })
    keys.forEach((key)=>{
        let atr = $("<td></td>").text(dada[key]).attr('class',key); 
        linha.append(atr)    
    }) 
    
    $('#result_table').append(head,linha)    
}