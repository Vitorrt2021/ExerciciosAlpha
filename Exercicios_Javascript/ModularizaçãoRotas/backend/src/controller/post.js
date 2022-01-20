const dataRequisition = require('../model/dataRquisition') 
const post = {
    createEmployees(req,res){            
        const employee = req.body
        dataRequisition.addNewData(employee);
        res.send(employee)
    }
}
module.exports = post