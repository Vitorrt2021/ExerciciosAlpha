const fs = require('fs')
const getBirthDays = {
    getForMonth(req,res){
        const employees = require('../model/employees.json')
        const result = employees.filter((person)=>{
            let date = new Date(person.birthDate)
            return date.getMonth()+1 == req.params.month
        })
        res.send(result)
    },
}

module.exports = getBirthDays;
