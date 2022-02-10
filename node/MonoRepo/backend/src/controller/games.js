const gamesRequisition = require('../model/gamesRequisition.js') 

const games = {
    sendAll(req,res){
        const info = gamesRequisition.getData();
        console.log(gamesRequisition)
        res.send(info)
    },
    addGame(req,res){
        const games = req.body
        const info = gamesRequisition.getData();
        let maxId=0;
        info.forEach(element => {
            if(maxId < parseInt(element.id)) maxId =parseInt(element.id) 
        });
        games.id = maxId + 1;
        console.log('--------------')
        console.log(games)
        console.log('-------------Body')
        console.log(req.body)
        if(req){
            console.log(games)
            gamesRequisition.addNewData(games);
            res.send(games)
        }else{
            res.status(404).send("Sem dados validos")
        }    
    }
}

module.exports = games