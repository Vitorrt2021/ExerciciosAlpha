const express = require('express')
const app =  express()

app.use(express.static('./src'))
const port = 3005
app.listen(port,()=>console.log(`Ouvindo na porta ${port} ...`))
