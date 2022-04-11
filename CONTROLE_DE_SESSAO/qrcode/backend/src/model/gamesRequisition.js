const fs = require('fs')
const dataRequisition = {
    getData(){
        try{
            const games = fs.readFileSync('../backend/data/games.json','utf-8')
            const resp = JSON.parse(games)
            return  resp
        }catch(e){
            console.log(e);
        }
        const games = fs.readFileSync('../backend/data/games.json','utf-8')
        return games
        
    },
    addNewData(newData){    
        const oldData = JSON.parse(fs.readFileSync('../backend/data/games.json','utf-8'))
        const newDataObject = [...oldData,newData]  
        const newDataString = JSON.stringify(newDataObject,null,2);    
    
        fs.writeFile('../backend/data/games.json', newDataString, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });    
        
    },
    updadeData(data){
        try{
            const newDataString = JSON.stringify(data,null,2);    
            fs.writeFile('../backend/data/games.json', newDataString, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });
        }catch(e){
            console.log(e)
        }
    }
}

module.exports = dataRequisition