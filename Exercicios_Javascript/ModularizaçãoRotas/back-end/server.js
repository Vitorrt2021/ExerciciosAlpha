require('dotenv').config
const config = require('./src/config/index')

const app = require('./src/app')

const port = config.app.port
app.listen(port,()=>console.log(`Ouvindo na porta ${port} ...`))