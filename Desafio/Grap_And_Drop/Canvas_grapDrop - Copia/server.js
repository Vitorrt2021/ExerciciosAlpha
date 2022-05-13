const { prototype } = require('events');
const express = require('express')
const app = express()

app.use(express.static('Prototype'))

const port = 3000;
app.listen(port,()=>{
    console.log(`Ouvindo na porta ${port}`)
})