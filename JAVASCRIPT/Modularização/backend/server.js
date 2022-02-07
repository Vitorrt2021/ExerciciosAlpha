const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require("body-parser");
const fs = require('fs');
const { parse } = require('path');



const updateFile = (filePath,updatedData,encoding='utf-8')=>{
    const dataString = fs.readFileSync(filePath,encoding);
    const dataObject = JSON.parse(dataString);
    const newDataObject = [...dataObject,updatedData]
    const newDataString = JSON.stringify(newDataObject,null,2);
    fs.writeFileSync(filePath,newDataString,encoding);
}

app.use(express.static('../front-end'));
app.use(bodyParser.json());
app.get("/",(req,res,next)=>{
    res.sendFile(path.join(__dirname,"/index.html"))
})

app.get("/vendas",(req,res,next)=>{    
    const pathFile = './data/vendas.json';
    const dataString = fs.readFileSync(pathFile,'utf-8');
    res.send(dataString)  
})

app.post('/vendas',(req,res)=>{  
    const pathFile = './data/vendas.json';
    let venda;
    try{
        venda = req.body
    }catch(e){
        console.log(e)
    }
    updateFile(pathFile,venda)
    res.send(venda);
})
app.put('/vendas/:id',(req,res) => {
    const pathFile = './data/vendas.json';
    const vendasString = fs.readFileSync(pathFile,'utf-8');
    const vendasObject = JSON.parse(vendasString)

    const venda = vendasObject.find(c => c.id ===parseInt(req.params.id))
    if(!venda){
        return res.status(404).send("Não tem venda com esse ID")
    }
    //To-do mudar os dados
    res.send(venda)
})
app.delete('/vendas/:id',(req,res)=>{
    const pathFile = './data/vendas.json';
    const vendasString = fs.readFileSync(pathFile,'utf-8');
    const vendasObject = JSON.parse(vendasString)

    
    const venda = vendasObject.find(c => c.id ===parseInt(req.params.id))
    if(!venda){
       return  res.status(404).send("Não tem venda com esse ID")
    }
    const index = vendasObject.indexOf(venda)
    //To-do deletar elemento  
    res.send(venda)
})

const port = process.env.PORT || 3005
app.listen(port,()=>console.log(`Ouvindo na porta ${port} ...`))
