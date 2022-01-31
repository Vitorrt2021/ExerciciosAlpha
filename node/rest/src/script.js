
const url = 'http://localhost:3000/produtos/'



sendGet()

addEvent('#form_get_button',()=>{
    const id = getValue('#form_get_input_id');
    sendGet(id)
});
addEvent('#form_post_button',()=>{
    const name = getValue('#form_post_input_name');
    sendPost({name});
});
addEvent('#form_put_button',()=>{
    const name = getValue('#form_put_input_name');
    const id = getValue('#form_put_input_id');
    sendPut(id,{name});
});

function stopRefresh(element){
    document.querySelector(element).addEventListener('click',(e)=>{
        e.preventDefault();;
    })
}
function getValue(element){
    return document.querySelector(element).value;
}
function addEvent(element,callback){
    stopRefresh(element);
    document.querySelector(element).addEventListener('click',callback);
}
function sendGet(id='all'){
    const requestOptions ={
        method : "GET"
    }
    request(url+id,requestOptions,createTable)
}

function sendPost(obj){
    const requestOptions ={
        method : "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    }
    request(url,requestOptions)
    sendGet()
}
function sendPut(id,obj){
    const requestOptions ={
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },        
        body: JSON.stringify(obj)
    }
    request(url+id,requestOptions)
    sendGet()
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
    console.log(array)
    const table = document.querySelector('#result_table')
    table.innerHTML = `              
    <tr class='title_columns'>
        <th><strong>ID</strong></th>
        <th><strong>Nome</strong></th>
    </tr>
    `
    if(array.length > 1){
        array.map((obj)=>{
            createLine(obj)
        })
    }
    createLine(array[0])
}
function createLine(obj){
    const line = document.createElement('tr')
 
    line.append(createColumn(obj.id,"id"))
    line.append(createColumn(obj.name,"name"))
    
    line.append(createColumn(`<img src="./assets/icons/clear_black_24dp.svg" alt="delete">`,'delete'))
    line.append(createColumn(`<img src="./assets/icons/settings_input_component_black_24dp.svg" alt="change"></img>`,'change'))

    line.setAttribute('id',obj.id)
    line.setAttribute('class',"line_object")
    
    const table = document.querySelector('#result_table')
    table.append(line)
}
function createColumn(value,type){
    const column = document.createElement('th')
    column.setAttribute("class", "table_"+type);
    column.innerHTML = value
    return column
}
