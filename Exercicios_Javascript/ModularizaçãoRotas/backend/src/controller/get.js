const dataRequisition = require('../model/dataRquisition') 

const get = {
    getForMonth(req,res){
        const employees = dataRequisition.getData()
        const result = employees.filter((person)=>{
            let date = new Date(person.birthDate)
            return date.getMonth()+1 == req.params.month
        })
        res.send(result)
    },
    default(req,res){
        const employees = dataRequisition.getData()
        res.send(employees)
    },
    getRamal(req,res){
        const employees = dataRequisition.getData()
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
    },
    getSector(req,res){
        const employees = dataRequisition.getData()
        const result = employees.filter((person)=>{
            let personSector = person.sector
            let paramsSector =req.params.sector 
            return  personSector=== paramsSector
        })
        res.send(result)
    }
}

module.exports = get;
