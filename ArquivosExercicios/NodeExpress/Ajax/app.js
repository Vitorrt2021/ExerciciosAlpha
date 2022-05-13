
const express = require("express");
const app = express()
const produto = [
    {
        "id":1,
        "nome":"Produto A"
    },
    {
        "id":3,
        "nome":"Produto B"
    },
    {
        "id":6,
        "nome":"Produto C"
    },
    {
        "id":3,
        "nome":"Produto D"
    }
]
app.get('/produtos',(req,res) =>{
   console.log('Here')
   let entry = req.query
   console.log(typeof entry)
   if(Object.keys(entry).length == 0){
        res.json(produto)
   }
   else if(entry["id"] == 1){
        res.json([produto[0]])
   }else if(entry["id"] == 3){
       let e3 = [produto[1],produto[3]]
        res.json(e3)
    }else if(entry["id"] == 6){
        res.json([produto[2]])
   }
   else{
        res.json([])
   }
})
app.get('/',(req,res) =>{
   res.send(`
    <html>
        <body>
            <h1 id='resposta'>Resposta</h1>
            
            <div id="demo">
            </div>
            
            <input id='input' type='number' />
            <button type="button" onclick="loadDoc()">Confirmar</button>
                
            <script>
            function loadDoc() {
            const xhttp = new XMLHttpRequest();
            xhttp.onload = function() {
                const object = JSON.parse(this.response)
                document.getElementById("demo").innerHTML = this.response;
                document.getElementById("resposta").innerHTML = " " ;
                if(object.length == 0){
                    alert('Não existe produto com id fornecido')
                }else{
                    for(let i=0;i<object.length;i++){
                        document.getElementById("resposta").innerHTML += object[i].nome + " " ;
                    }
                }
            }
            xhttp.open("GET", "/produtos?id="+document.getElementById('input').value);
            xhttp.send();
            }
            </script>
         </body>
    
   
    </html>
   
   `)

})

app.listen(3003)
