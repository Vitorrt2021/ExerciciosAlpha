export function request(url,requestOptions){
    fetch(url,requestOptions)
        .then(function(response){
            if(!response.ok) throw new Error("Erro ao executar requisição")
            return response.json()
        })
        .then(function(data){
            if(!data){
                alert('Não a informações valida')
            }else{
                console.log(data)
                return data
            }
        })
        .catch(function(error){
            alert(error.message)
        })
}
export function defineUrlGet(url){
    const TYPE = typeData()
    const VALUE = getValue('#form_input') 
    const URL = url.concat("?type=",TYPE,"&",TYPE,"=",VALUE)
    console.log("URL é ",URL)
    return URL        
}

export function sendGet(){
    const requestOptions = {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    }

    const url = '/vendas'
    const vendas = request(url,requestOptions);
    return vendas
}
/*
export function sendPost(){
    const name = getValue('#form_input_name_post')
    const email = getValue('#form_input_email_post')
    const newSellData = {
        "name" :name,
        "email": email,
    };
    const requestOptions={
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSellData)
    }
}
export function sendPut(id){
    return function(){
        const name = getValue('#form_input_name_put')
        const email = getValue('#form_input_email_put')
        const newSellData = {
            "name" :name,
            "email": email,
        };
        const requestOptions={
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSellData)
        }
        const url = '/vendas/'.concat(id)
        request(url,requestOptions,/////////////)   
    }
}
export function sendDelete(id){
    const requestOptions={
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
    }
    const url = '/vendas/'.concat(id)
    request(url,requestOptions,///////////)   
}
*/