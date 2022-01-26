const dataRequisition = require('../model/dataRequisition') 

const get = {
    getForMonth(req,res){
        const employees = dataRequisition.getData()
        const result = employees.filter((person)=>{
            let date = new Date(person.birthDate)
            return date.getMonth()+1 == req.params.month
        })
        if(result.length === 0){
            res.status(404).send("Não tem pessoa nascida esse mês")
        }
        else{
            res.send(result)
        }
    },
    default(req,res){
        const employees = dataRequisition.getData()
        res.send(employees)
    },
    getRamal(req,res){
        const employees = dataRequisition.getData()
        //Caso queira apenas  o nome e o ramal
        // const result = employees.map((person)=>{
        //     const ramal = person.branch
        //     const name = person.name
        //     return {name , ramal}
        // })
        const resultSorted = employees.sort((a,b)=>{
            if(a.name > b.name){
                return 1;
            }if(a.name < b.name){
                return -1;
            }
            return 0;
        })
        if(resultSorted.length === 0){
            res.status(404).send("Não tem pessoa")
        }else{
            res.send(JSON.stringify(resultSorted));
        }
    },
    getSector(req,res){
        const employees = dataRequisition.getData()
        const result = employees.filter((person)=>{
            let personSector = person.sector
            let paramsSector = req.params.sector 
            
            try {
                if(personSector.toLowerCase() === paramsSector.toLowerCase()){
                    return true
                }
            }catch(e){
                console.log(e)
            }        
            return false 
        })
        console.log(result)
        if(result.length === 0){
            res.status(404).send("Não tem pessoa nesse setor")
        }else{
            res.send(result)
        }
    }
}

module.exports = get;
