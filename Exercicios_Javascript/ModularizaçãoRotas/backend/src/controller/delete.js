const fs = require('fs')
const deleteEmployee = {
    deleteEmployee(req,res){
        const employees = require('../model/employees.json')
        let employeeDeleted={};
        const employeesAfter = employees.filter((person)=>{
            if(person.registrationNumber == req.params.registrationNumber){
                employeeDeleted = person
            }
            return person.registrationNumber != req.params.registrationNumber
        })
        console.log(employeeDeleted)
        console.log(employeesAfter)
        if(employeeDeleted){
            const newDataObject = [...employeesAfter]
            const newDataString = JSON.stringify(newDataObject,null,2);    
            fs.writeFile('../back-end/src/model/employees.json', newDataString, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });     
            res.send(employeeDeleted);
        }
    }
}

module.exports = deleteEmployee