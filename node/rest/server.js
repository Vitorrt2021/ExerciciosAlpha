const express = require('express');
const app = express();
const router = require('./routes/router')

app.use('/',express.static('./src'))
app.use(express.json())
app.use('/api/v1/products',router)


const port = 3000;
app.listen(port,()=>{
    console.log(`Ouvindo na porta ${port}`)
})