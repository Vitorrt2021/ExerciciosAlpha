const dataRequisition = require('../model/dataRequisition') 

const put = {
    changeData(req,res){
        const employees = dataRequisition.getData()
        const type = req.body.type 
        const newValue = req.body.value 
        const registrationNumber = req.params.registrationNumber
        let employe;
        console.log(req.params.registrationNumber)
        console.log(req.body)
        console.log(newValue)
        console.log(type)
        for(let i=0;i<employees.length;i++){
            if(employees[i].registrationNumber == registrationNumber){
                employees[i][type] = newValue
                employe = employees[i]
            }
        }
        console.log(employe)
        if(employe){
            res.send(employe)
            dataRequisition.updadeData(employees);
        }else{
            res.status(404).send("Não tem pessoa com esse numero de registro")
        }
    }
}

module.exports = put;