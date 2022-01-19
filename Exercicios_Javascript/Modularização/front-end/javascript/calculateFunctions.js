
import{    
    createElement,
} from './tableFunction.js'

import {
    disappearElement,
}from './formFunction.js'
export function calculateInterestValue(date){
    let data = new Date();
    let day = String(data.getDate()).padStart(2, '0');
    let month = String(data.getMonth() + 1).padStart(2, '0');
    let year = data.getFullYear();
    let now = year + '/' + month + '/' + day;
    let date1 = new Date(now)
    let date2 = new Date(date);
    let timeDifference = date2.getTime() - date1.getTime()
    let daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)); 
    if(timeDifference <= 0){
        return (Math.abs(daysDifference)*0.001)+0.02
    }else{
        return 0
    }
}

export function calculateForPeople(array,property){
    return array.reduce(function (acc, obj) {
        let key = obj[property];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, []);
}

export function calculateTotal(name,value){
    const elementName = document.createElement('ul');
    elementName.setAttribute('class','buy__name')
    elementName.innerHTML = name
    
    const  elementMaturity = document.createElement('ul')
    elementMaturity.setAttribute('class','bud__maturity')
    elementMaturity.innerHTML = "  "
    
    const elementPrice = document.createElement('ul');
    elementPrice.setAttribute('class','buy__price')
    elementPrice.innerHTML = value
    
    const PURCHASES_TABLE = document.querySelector(".purchases__table")
    PURCHASES_TABLE.append(createElement(elementName,elementMaturity,elementPrice));
}
export function addInterest(){
    disappearElement("#purchases__calculate")
    let AUX = SALES.map(function(object){
        let price = parseFloat(object.price)
        let object_aux =  Object.assign([], object)
        object_aux.price = price + price* parseFloat(object_aux.interest);
        return object_aux
    })
    return AUX
}
