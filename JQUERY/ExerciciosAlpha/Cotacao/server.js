require('dotenv').config()
const express = require('express')
const app = express();
const https = require('https');
const fs = require('fs');
const path = require('path');

app.use(express.static('src'))

// const port = 443
// const sslServer = https.createServer({
//     key: fs.readFileSync('/etc/letsencrypt/live/vitorrt.brazilsouth.cloudapp.azure.com/privkey.pem'),
//     cert:fs.readFileSync('/etc/letsencrypt/live/vitorrt.brazilsouth.cloudapp.azure.com/fullchain.pem')
// },app)

// sslServer.listen(port,()=>{
//     console.log(`Ouvindo na porta ${port}`)
// })

const port = 8080;
app.listen(port,()=>{
    console.log(`ouvindo na port ${port}`)
})