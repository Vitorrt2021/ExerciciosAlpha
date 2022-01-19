const getRamal = {
    getRamal(req,res){
        const employees = require('../model/employees.json')
        const result = employees.map((person)=>{
            const ramal = person.branch
            const name = person.name
            return {name , ramal}
        })
        const resultSorted = result.sort((a,b)=>{
            if(a.name > b.name){
                return 1;
            }if(a.name < b.name){
                return -1;
            }
            return 0;
        })
        res.send(JSON.stringify(resultSorted))
    }
}

module.exports = getRamal