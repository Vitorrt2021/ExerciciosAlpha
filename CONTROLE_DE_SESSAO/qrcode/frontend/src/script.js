const url = 'http://localhost:3004'
document.querySelector('#form_submit').addEventListener('click',(e)=>{
    e.preventDefault()
    const username = document.querySelector('#form_username')
    const password = document.querySelector('#form_password')

    username.type = 'hidden'
    password.type = 'hidden'  
    document.getElementById('form_submit').remove()
    sendPost({
        username: username.value,
        password: password.value
    })
})

function sendPost(data){
    const requestOptions={
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3334',
            'Access-Control-Allow-Credentials': true
        },
        credentials: 'include',
        body: JSON.stringify(data)
    }
    request(url+'/user/login',requestOptions,renderEvents);
}
async function renderEvents(){
    const response = await fetch(url+'/events')
    const data = await response.json()
    const events = data.events

    events.forEach(element => {
        const eventSection = document.querySelector('#events')
        eventSection.innerHTML = `
            <div class='event_container'>
                <h4>${element.title}</h4>
                <p>${element.description}<p>
                <p><strong>${element.date}</strong></p>
                <p><strong>${element.time}</strong></p>
                <button id='${element.title}'>Adicionar</button>
                <p id='${element.title}_qrcode'></p>
                <div>
        `
        document.querySelector(`#${element.title}`).addEventListener('click',(e)=>{
            let typeNumber = 4;
            let errorCorrectionLevel = 'L';
            let qr = qrcode(typeNumber, errorCorrectionLevel);
            const cookies = document.cookie
            console.log(cookies)
            const username = document.querySelector('#form_username').value
            qr.addData(url+'/events/entry?name='+username+"&ticket="+element.title);
            qr.make();
            document.getElementById(element.title).remove()
            document.getElementById(`${element.title}_qrcode`).innerHTML = qr.createImgTag();  
        })

    });
}
function request(url,requestOptions,callback){
    fetch(url,requestOptions)
        .then(function(response){
            if(!response.ok) {
                alert('Erro')
            }
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