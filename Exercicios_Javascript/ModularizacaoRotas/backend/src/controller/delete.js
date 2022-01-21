const dataRequisition = require('../model/dataRquisition') 

const deleteEmployee = {
    deleteEmployee(req,res){
        const employees = dataRequisition.getData()
        const employeesAfter = []
        let employee;
        console.log(employees.length)
        for(let i=0;i<employees.length;i++){
            if(employees[i].registrationNumber == req.params.registrationNumber){
                employee = employees[i];
            }else{
                employeesAfter.push(employees[i]);
            }
        }
        
        console.log(employeesAfter.length)
        if(employee){
            res.send(employee)
            dataRequisition.updadeData(employeesAfter)     
        }else{
            res.status(404).send("Não tem pessoa com esse numero")
        }
        
    }
}

module.exports = deleteEmployee