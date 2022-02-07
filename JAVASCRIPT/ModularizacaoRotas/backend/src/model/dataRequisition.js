const fs = require('fs')
const dataRequisition = {
    getData(){
        console.log("======================GET")
        try{
            const employees = fs.readFileSync('../backend/data/employees.json','utf-8')
            const resp = JSON.parse(employees)
            return  resp
        }catch(e){
            console.log(e);
        }
        const employees = fs.readFileSync('../backend/data/employees.json','utf-8')
        return employees
        
    },
    addNewData(newData){
        
        console.log("======================GET")
        const oldData = JSON.parse(fs.readFileSync('../backend/data/employees.json','utf-8'))
        const newDataObject = [...oldData,newData]  
        const newDataString = JSON.stringify(newDataObject,null,2);    
    
        fs.writeFile('../backend/data/employees.json', newDataString, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });    
        
    },
    updadeData(data){
        
        console.log("======================GET")
        try{
            const newDataString = JSON.stringify(data,null,2);    
            fs.writeFile('../backend/data/employees.json', newDataString, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });
        }catch(e){
            console.log(e)
        }
    }
}

module.exports = dataRequisition