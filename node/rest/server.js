const express = require('express');
const app = express();
const router = require('./routes/router')
const cors = require('cors')
app.use(cors())
app.use('/',express.static('./src'))
app.use(express.json())
app.use('/produtos',router)


const port = 3000;
app.listen(port,()=>{
    console.log(`Ouvindo na porta ${port}`)
})