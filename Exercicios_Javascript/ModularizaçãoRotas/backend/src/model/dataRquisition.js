const fs = require('fs')
const dataRequisition = {
    getData(){
        const employees = require('../../data/employees.json')
        return employees 
    },
    addNewData(newData){
        const oldData = require('../../data/employees.json')
        const newDataObject = [...oldData,newData]
        const newDataString = JSON.stringify(newDataObject,null,2);    
        fs.writeFile('../back-end/data/employees.json', newDataString, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
    }
}

module.exports = dataRequisition