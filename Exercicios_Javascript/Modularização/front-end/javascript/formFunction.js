
import{    
    Sale,
} from './tableFunction.js'
export function inicializeFormFilter(){
    let elements = []
    elements.push(document.querySelector("#filter_dateBegin").value);
    elements.push(document.querySelector("#filter_dateEnd").value);
    elements.push("clear");
    elements.push(document.querySelector("#filter_minValue").value);
    elements.push(document.querySelector("#filter_maxValue").value);
    return elements    
}

export function confirmFilter(){
    let elements = inicializeFormFilter()
    let result= SALES.map(function(object){return object})
    //DateBegin
    if(elements[0] != ""){
        result = compareDateBegin(elements[0],result);
    }if(elements[1] != ""){
        result = compareDateEnd(elements[1],result);
    }if(elements[3] != ""){
        result = compareMinValue(elements[3],result)
    }if(elements[4] != ""){
        result = compareMaxValue(elements[4],result)
    }
    return result;
}

export function showFilter(){
    disappearElement('.purchases__table')
    appearElement(".filter")
    return true;
}
export function backForm(){
    const PURCHASES = document.querySelector('.purchases')
    PURCHASES.style.display = 'none'
    const FORM = document.querySelector('form')
    FORM.style.display = 'flex';
    disappearElement(".filter")
}

export function initializeForm(){
    let elements = []
    elements.push(document.querySelector("#form_name"));
    elements.push(document.querySelector("#form_date"));
    elements.push(document.querySelector("#form_value"));
    return elements
}

export function clearData(){
    let elements = initializeForm();
    elements.map(function (element){
        element.value = null;
    })
}

export function disappearElement(a){
    const ELEMENT = document.querySelector(a)
    ELEMENT.style.display = 'none'
}

export function appearElement(a){
    const ELEMENT = document.querySelector(a)
    ELEMENT.style.display = 'flex'
}

export function addSales(){
    let values = getData();
    let name = values[0] 
    let date = values[1]
    let price = values[2]
    let sale = new Sale(name,date,price)
    SALES.push(sale)
    
}

export function getData(){
    let elements = initializeForm();
    let values = elements.map(function (element) {
        return element.value
    })
    return values;
}