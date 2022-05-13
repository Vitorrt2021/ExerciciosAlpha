const express = require('express')
const app = express()
const path = require('path')

let pessoas = [
    {
        "id": 1,
        "name": "Vitor",
        "email": "vitorrt2015@gmail.com"
    },
    {
        "id": 2,
        "name": "Marcos",
        "email": "marcos@gmail.com"
    },
    {
        "id": 3,
        "name": "João",
        "email": "joao@gmail.com"
    },
    {
        "id": 4,
        "name": "Ellen",
        "email": "ellen@gmail.com"
    }
]

app.get("/",(req,res,next)=>{
    res.sendFile(path.join(__dirname+"/pages/index.html"))
})
app.get("/pessoas",(req,res,next)=>{
    let result = pessoas.slice();
    let have = false
    function checkName(obj) {
        return obj.name == req.query.name;
    }
    function checkEmail(obj) {
        return obj.email == req.query.email;
    }
    function checkId(obj) {
        return obj.id == req.query.id;
    }
    if(req.query.name !== ""){
       result =  result.filter(checkName)
       have = true
    }
    if(req.query.email !== ""){
        result =  result.filter(checkEmail)
        have = true 
    }
    if(req.query.id !== ""){
        console.log(req.query.id)
        result =  result.filter(checkId)
        have = true
    }
    if(result.length === 0 || !have){
        res.send(false)
    }else{
        res.send(result)
    }
})
app.listen(3004)