const express = require('express')
const app =  express()

app.use(express.static(__dirname + '/src'))

const port = process.env.PORT || 3005
app.listen(port,()=>console.log(`Ouvindo na porta ${port} ...`))
