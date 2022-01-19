const getDefault = {
    default(req,res){
        const employees = require('../model/employees.json')
        res.send(employees)
    },
}

module.exports = getDefault