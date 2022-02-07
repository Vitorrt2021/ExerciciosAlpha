const pathLocalHost = 'http://localhost:3004/employees'

preventReload()
sendGet()

addEvent('#form_button_reset',()=>hiddenElement('.form_post'))
addEvent('#form_button_submit',()=>hiddenElement('.form_post'))
addEvent('#form_put_button_reset',()=>hiddenElement('.form_put'))
addEvent('#form_put_button_submit',()=>hiddenElement('.form_put'))

addEvent('#form_button_submit',()=>{
    let dados = createObjectEmployee();
    if(dados) sendPost(dados)
    sendGet()   
})
addEvent('.button_post',()=>{
    showElement('.form_post');
})

addEvent('.button_ramal',()=>sendGet('/ramal'))
addEvent('.button_birthdays',()=>{
    let month = prompt('Mes: ')
    sendGet('/month/'+month)
})
addEvent('.button_sector',()=>{
    let sector = prompt('Setor: ')
    sendGet('/sector/'+sector)
})
addEvent('table',(e)=>{
    const path = e.path
    if(e.target.className === "table_delete_img"){      
        path.map((element)=>{
            if(element.tagName === 'TR'){
                sendDelete(element.id);
                sendGet()   
            }
        })
    }else if(e.target.className === "table_put_img"){
        path.map((element)=>{
            if(element.tagName === 'TR'){
                formPutCreate(element.id);
            }
        })
    }
})

function formPutCreate(registrationNumber){
    showElement('.form_put')
    addEvent('#form_put_button_submit',()=>{
        const selectElementType = document.querySelector('#form_put_type')
        const type = selectElementType.options[selectElementType.selectedIndex].value
        const value = getValue('#form_put_value')
        if(!value ){
            alert("Coloque todos os dados!")
            return false
        }
        const data = {
            type,
            value
        }
        sendPut(registrationNumber,data)
        sendGet()   
    })    
}
function createObjectEmployee(){
    const name = getValue('#form_post_name');
    const email = getValue('#form_post_email');
    const sector = getValue('#form_post_sector');
    const branch = getValue('#form_post_ramal');
    const birthDate = getValue('#form_post_birthday');
    const registrationNumber = Math.floor(Math.random() * 100000);
    if(!name || !email || !sector || !branch || !birthDate ){
        alert("Coloque todos os dados!")
        return false
    }
    const employee = {
        name,
        email,
        sector,
        branch,
        birthDate,
        registrationNumber
    }
    console.log(employee)
    return employee    
}
function preventReload(){
    document.querySelector('#form_button_submit').addEventListener('click',(e)=>{
         e.preventDefault()
    });
    document.querySelector('#form_button_reset').addEventListener('click',(e)=>{
        e.preventDefault()
    });
    document.querySelector('#form_put_button_submit').addEventListener('click',(e)=>{
        e.preventDefault()
    });
    document.querySelector('#form_put_button_reset').addEventListener('click',(e)=>{
        e.preventDefault()
    });
}

function hiddenElement(element){
    document.querySelector(element).style.display = 'none'
}
function showElement(element){
    document.querySelector(element).style.display = 'block'
}
function getValue(element){
    return document.querySelector(element).value
}
function addEvent(element,callback,type='click'){
    document.querySelector(element).addEventListener(type,callback)
}

function sendPut(registrationNumber,data){
    const requestOptions={
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data,)
    }
    request(pathLocalHost+"/"+registrationNumber,requestOptions,console.log)   
}

function sendPost(data){
    const requestOptions={
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
    request(pathLocalHost,requestOptions,console.log);
}
function sendDelete(registrationNumber){
    const requestOptions={
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
    }
    request(pathLocalHost+"/"+registrationNumber,requestOptions)
}

function sendGet(path=' '){
    const requestOptions = {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    }
    request(pathLocalHost+path,requestOptions,createTable)
}
function createTable(array){
    console.log(array)
    const table = document.querySelector('#result_table')
    table.innerHTML = `              
    <tr class='title_columns'>
        <th><strong>Nome</strong></th>
        <th><strong>Email</strong></th>
        <th><strong>Setor</strong></th>
        <th><strong>Ramal</strong></th>
        <th><strong>Data de Nascimento</strong></th>
        <th><strong>Ações</strong></th>
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
 
    line.append(createColumn(obj.name,"name"))
    line.append(createColumn(obj.email,"email"))
    line.append(createColumn(obj.sector,"sector"))
    line.append(createColumn(obj.branch,"ramal"))
    line.append(createColumn(obj.birthDate,"birthDate"))
    line.append(createColumn(` <img src="./assets/icons/remove_circle_black_24dp.svg" class='table_delete_img' alt="Deletar">
    `,'delete'))
    line.append(createColumn(` <img src="./assets/icons/settings_black_24dp.svg" class='table_put_img' alt="change">
    `,'change'))

    line.setAttribute('id',obj.registrationNumber)
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



