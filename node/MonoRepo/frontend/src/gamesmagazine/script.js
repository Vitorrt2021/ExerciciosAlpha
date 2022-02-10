const url = 'http://localhost:3004/games'
$(document).ready(function(){
    addGenreInSelectInput()
    getData()
    $('#form_toggle').on('click',function(){
        $('.form_post').toggle(200);
    })
    $('#form_button_submit').on('click',submitData)
    $('#form_button_reset').on('click',function(e){e.preventDefault()})

})


function submitData(e){
    e.preventDefault()
    const game = $('#form_post_game').val()
    const multiplayer = $('#form_post_multiplayer').is(':checked')
    const offline = $('#form_post_offline').is(':checked')
    const crossplataform = $('#form_post_crossplataform').is(':checked')
    const year = new Date($('#form_post_year').val()).getFullYear();
    const genre = $('#form_post_genre').val()
    const objGame = {
        game,multiplayer,offline,crossplataform,year,genre
    }
    sendPost(objGame)
}
function addGenreInSelectInput(){
    const genres = ['Tabuleiro' ,'Casual' ,'Cartas' ,'Ritmo' ,'Plataforma', 'Quebra-Cabeça' , 'Trívia' , 'FMVs'  , 'Battle Royale' , 'Shooter', 'MOBA' ,'Luta' ,'Click' ,'Sandbox'];
    genres.forEach(e =>{
        const ele = `<option value=${e}>${e}</option>`
        $('#form_post_genre').append(ele)
    })
        
}
function getData(){
    $.get(
        url,
        function(data,status){
            createTable(data)
        }
    )
}
function sendPost(data){
    const requestOptions={
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
    request(url,requestOptions,console.log);
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

function createTable(array){
    const keys = Object.keys(array[0])
    const TableHeader = $('<tr></tr>')
    const thead = $('<thead></thead>')
    keys.forEach(e=>{
        const nameCol = $('<th></th>')
        const ar = e.toUpperCase()
        $(nameCol).html(ar) 
        $(TableHeader).append(nameCol)
    })
    $(thead).append(TableHeader)
    $('#table_result').append(thead)
    array.forEach((e)=>{
        const lines = $('<tr></tr>')
        keys.forEach(key=>{
            const col = $('<td></td>')
            $(col).html(e[key] === false ? 'false' : e[key] )
            $(lines).append(col)
        })
        $('#table_result').append(lines)
    })
}