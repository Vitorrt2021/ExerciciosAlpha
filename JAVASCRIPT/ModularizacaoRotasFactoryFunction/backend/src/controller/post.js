const dataRequisition = require('../model/dataRequisition') 
const post = {
    createEmployees(req,res){            
        const employee = req.body
        console.log(typeof employee)
        console.log(employee)
        
        if(req){
            console.log(employee)
            dataRequisition.addNewData(employee);
            res.send(employee)
        }else{
            res.status(404).send("Sem dados validos")
        }
        
    }
}
module.exports = post