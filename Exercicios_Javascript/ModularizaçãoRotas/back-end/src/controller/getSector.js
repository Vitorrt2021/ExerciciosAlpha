const getSector = {
    getSector(req,res){
        const employees = require('../model/employees.json')
        const result = employees.filter((person)=>{
            return person.sector === req.params.sector
        })
        res.send(result)
    }
}

module.exports = getSector