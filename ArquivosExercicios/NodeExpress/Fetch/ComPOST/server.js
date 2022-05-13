const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require("body-parser");

let routesapi = require('./routes/routesapi.js')
let routes = require('./routes/routes.js')

app.use(bodyParser.json());
let pessoas = require('./dados/pessoas.js').pessoas



app.get("/post",(req,res,next)=>{
    res.sendFile(path.join(__dirname,"/pages/post.html"))
})

app.post("/pessoas",(req,res,next)=>{
    let result = pessoas.slice();
    let have = false
    console.log("_________________________________")
    console.log(req.body)
    function checkName(obj) {
        return obj.name == req.body.name;
    }
    function checkEmail(obj) {
        return obj.email == req.body.email;
    }
    function checkId(obj) {
        return obj.id == req.body.id;
    }
    if(req.body.name !== ""){
       result =  result.filter(checkName)
       have = true
    }
    if(req.body.email !== ""){
        result =  result.filter(checkEmail)
        have = true 
    }
    if(req.body.id !== ""){
        console.log(req.body.id)
        result =  result.filter(checkId)
        have = true
    }
    if(result.length === 0 || !have){
        res.send(false)
    }else{
        res.send(result)
    }
})


const port = process.env.PORT || 3004
app.listen(port,()=>console.log(`Ouvindo na porta ${port} ...`))