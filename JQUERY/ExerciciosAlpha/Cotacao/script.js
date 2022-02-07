const urlApi = 'https://economia.awesomeapi.com.br/'
$(document).ready(function(){
    $.ajax({url: urlApi+"/json/all", 
        success: function(result){
            createSelect(result);
    }});

    $('#select_coin').on('change',function(){
        const coin = $("#select_coin option:selected").val()
        $.ajax({url: urlApi+`/${coin}`, 
        success: function(result){
            $('#coin_show').html(coin)
            createTable(result);
        }});
    })
    $('#send_requisition').on('click',function(e){
        e.preventDefault();
        const coin = $("#select_coin option:selected").val()
        const initial = $('#initial_date').val().replaceAll('-','');
        const final = $('#final_date').val().replaceAll('-','');
        console.log(coin)
        console.log(initial)
        console.log(final)
        $.ajax({url: urlApi+`/${coin}?start_date=${initial}&end_date=${final}`, 
        success: function(result){
            $('#coin_show').html(coin)        
            createTable(result);
        }});
        // $.ajax({url: urlApi+`json/daily/${coin}?start_date=${initial}&end_date=${final}`, 
        // success: function(result){
        //     createTable(result);
        // }});
        
    })
})

function createSelect(coins){
    const coinsArray = Object.keys(coins)
    coinsArray.forEach((c)=>{
        const coin = `<option value=${c}>${c}</option>`
        $('#select_coin').append(coin)    
    })
}


function createTable(array){
    $('#result_table').html('')

    let dada;
    if(!Array.isArray(array)) dada =Object.entries(array)
    else dada = array;
    
    if(dada.length === 0){
        $('#coin_show').html('Não a informações sobre essa moeda')
        return false
    }
    dada.forEach((e)=>{       
        const linha = $('<tr></tr>');
        const head = $('<tr></tr>');      
        const keys = Object.keys(e)

        keys.forEach((key)=>{
            let atr = $("<td></td>").text(key.toUpperCase()).attr('class','table_header'); 
            head.append(atr)    
        })

        keys.forEach((key)=>{
            let atr = $("<td></td>").text(e[key]).attr('class',key); 
            linha.append(atr)    
        })
        
        $('#result_table').append(head,linha)    
    })
}