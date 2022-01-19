import {
    calculateForPeople,
    calculateInterestValue
} from './calculateFunctions.js'

import {
    appearElement,
    disappearElement,
    clearData,
}from './formFunction.js'
export function showForPeople(){
    let array = calculateForPeople(SALES,"name")
    for (let name in array) {
        for(let sale in array[name]){
            addBuy(array[name][sale])       
        }
        let sum = array[name].reduce(function(acumulador,element){return acumulador+ parseFloat(element.price)},0) 
        
        addSum(sum,name)
    }
}

export function Sale(name, date,price) {
    this.name = name;
    this.date = date;
    this.price = price;
    this.price_interest=0;
    this.interest = calculateInterestValue(date);
    this.id = Math.floor(Math.random * 100000)
}

export function addSum(sum,name){
    const elementName = document.createElement('ul');
    elementName.setAttribute('class','total__name')
    elementName.innerHTML = name
    
    const elementPrice = document.createElement('ul');
    elementPrice.setAttribute('class','total__price')
    elementPrice.innerHTML = sum
    
    const PURCHASES_TABLE = document.querySelector(".purchases__table")
    PURCHASES_TABLE.append(createElementTotal(elementName,"   ",elementPrice));
}
export function createElementTotal(name,maturity,price){
    const  PURCHASE= document.createElement('li')
    PURCHASE.setAttribute('class','purchase_total');
    PURCHASE.append(name);
    PURCHASE.append(maturity);
    PURCHASE.append(price);
    return PURCHASE;
}

export function addBuy(object){
    const elementName = document.createElement('ul');
    elementName.setAttribute('class','buy__name')
    elementName.innerHTML = object.name
    
    const  elementMaturity = document.createElement('ul')
    elementMaturity.setAttribute('class','bud__maturity')
    elementMaturity.innerHTML = object.date
    
    const elementPrice = document.createElement('ul');
    elementPrice.setAttribute('class','buy__price')
    elementPrice.innerHTML = object.price
    
    const PURCHASES_TABLE = document.querySelector(".purchases__table")
    PURCHASES_TABLE.append(createElement(elementName,elementMaturity,elementPrice));
}

export function createElement(name,maturity,price){
    const  PURCHASE= document.createElement('li')
    PURCHASE.setAttribute('class','purchase');
    PURCHASE.append(name);
    PURCHASE.append(maturity);
    PURCHASE.append(price);
    return PURCHASE;
}

export function showTable(){
    clearData()
    appearElement(".purchases")
    disappearElement('form')
    appearElement(".purchases__table")
    appearElement("#purchases__calculate")
    //Limpando
    const PURCHASES_TABLE = document.querySelector('.purchases__table')
    PURCHASES_TABLE.innerHTML = '<li class=\'purchase\'><ul class=\'buy__name\'>Nome</ul><ul class=\'buy__maturity\'>Data de vencimento</ul><ul class=\'buy__price\'>Preço</ul></li>'
}
export function createTable(a){
    a.map(addBuy);
}




