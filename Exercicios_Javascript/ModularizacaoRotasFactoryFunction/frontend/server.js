const express = require('express')
const app =  express()

app.use('/calculator',express.static('./src/calculator'))
app.use('/pessoas',express.static('./src/pessoas'))

const port = 3005
app.listen(port,()=>console.log(`Ouvindo na porta ${port} ...`))
