const urlCEP = `https://cep.awesomeapi.com.br/json/`
const cep = "33937240" 
$(document).ready(function(){
    requestCep(cep,createTable)    
    $('#input_submit').on('click',function(e){
        e.preventDefault();
        const cepUser  = $('#input_cep').val()

        if(!cheackCep(cepUser)) return false

        $.ajax({
            url: urlCEP + cepUser
        })
        .done(function(res){
            addLatLng(res)
            createTable(res)
        })
        .fail(function(e){
            console.log(e)
            try{
                if(e.responseJSON.code === 'not_found'){
                    alert('O cep não existe')
                }
            }catch(f){
                console.log(f)
            }
        })          
    })    
})

function cheackCep(cep){
    const isnumber = /^[0-9]+$/;
    if(!isnumber.test(cep)) {
        alert("Digite apenas números")
        return false
    }
    if(cep.length !== 8) {
        alert("O cep deve conter 8 digitos")
        return false
    }
    return true;
}
function addLatLng(res){
    const lat = parseFloat(res.lat)
    const lng = parseFloat(res.lng)
    const url = `http://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`
    $('#map').attr('src',url);
}

function requestCep(cep,callback){
    $.ajax({
        url: urlCEP + cep,
    })
    .done(function(res){
        callback(res)
    })
    .fail(function(jqXHR,exception){
        alert('Falhou')
    })
}
function createTable(array){
    
    $('#table-result').html(' ')
    const translation = {
        'address_name': "Rua",
        "cep":"Cep",
        "city":"Cidade",
        "ddd":"ddd",
        "district":"Bairro",
        "Estado":"Estado"
    }
    let keys = Object.keys(array)
    const TableHeader = $('<tr></tr>')
    const thead = $('<thead></thead>')
    keys = keys.filter(e=>{
        if(translation[e]){
            const nameCol = $('<td></td>')
            const ar = translation[e].toUpperCase()
            $(nameCol).html(ar) 
            $(TableHeader).append(nameCol)
            return true
        }else{
            return false
        }         
    })
    $(thead).append(TableHeader)
    $('#table-result').append(thead)
    const lines = $('<tr></tr>')
    keys.forEach(key=>{
        const col = $('<td></td>')
        $(col).html(array[key] )
        $(lines).append(col)
    })
    $('#table-result').append(lines)
}