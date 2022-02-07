import {
    addInterest,
} from './javascript/calculateFunctions.js'

import{    
    showForPeople,
    showTable,
    createTable
} from './javascript/tableFunction.js'
import{    
    organizeForDate
} from './javascript/filterFunction.js'

import {
    addSales,
    disappearElement,
    clearData,
    backForm,
    showFilter,
    confirmFilter,
}from './javascript/formFunction.js'
import {
    request,
    sendGet
} from './javascript/serverFunction.js'

console.log(sendGet())
function stopDefAction(evt) {
    evt.preventDefault();
}

initializeButtons()

function initializeButtons(){
    const FORM_SUBMIT = document.querySelector("#form_submit");
    FORM_SUBMIT.addEventListener('click',stopDefAction)
    FORM_SUBMIT.addEventListener('click',function (){addSales();clearData(); })
    
    const FORM_TABLE = document.querySelector("#form_table");
    FORM_TABLE.addEventListener('click',stopDefAction)
    FORM_TABLE.addEventListener('click',function (){showTable();createTable(SALES)})    
    
    const PURCHASES_BACK = document.querySelector("#purchases__back");
    PURCHASES_BACK.addEventListener('click',function (){backForm();disappearElement('.filter')})    
   
    const PURCHASES_CALCULATE = document.querySelector("#purchases__calculate");
    PURCHASES_CALCULATE.addEventListener('click',function (){showTable();disappearElement('.filter');createTable(addInterest())})    

    const PURCHASES_ORGANIZENAME = document.querySelector("#purchases__organizeName");
    PURCHASES_ORGANIZENAME.addEventListener('click',function (){showTable();disappearElement('.filter');showForPeople();})    
    //createTable(organizeForName(calculateForPeople(SALES,"name")))
    const PURCHASES_ORGANIZEDATE = document.querySelector("#purchases__organizeDate");
    PURCHASES_ORGANIZEDATE.addEventListener('click',function (){showTable();disappearElement('.filter');createTable(organizeForDate())})    

    const PURCHASES_FILTER = document.querySelector("#purchases__filter");
    PURCHASES_FILTER.addEventListener('click',showFilter)    

    const PURCHASES_SUBMIT = document.querySelector("#filter_submit");
    PURCHASES_SUBMIT.addEventListener('click',function(){showTable();disappearElement(".filter");createTable(confirmFilter())})    
    PURCHASES_SUBMIT.addEventListener('click',stopDefAction)
}
