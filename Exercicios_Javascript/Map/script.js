const SALES = [];


function calculateInterestValue(date){
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


function Sale(name, date,price) {
    this.name = name;
    this.date = date;
    this.price = price;
    this.price_interest=0;
    this.interest = calculateInterestValue(date);
}

function addSales(){
    let values = getData();
    let name = values[0] 
    let date = values[1]
    let price = values[2]
    let sale = new Sale(name,date,price)
    SALES.push(sale)
}

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
    FORM_TABLE.addEventListener('click',function (){showTable(),createTable(SALES)})    
    
    const PURCHASES_BACK = document.querySelector("#purchases__back");
    PURCHASES_BACK.addEventListener('click',function (){backForm()})    
   
    const PURCHASES_CALCULATE = document.querySelector("#purchases__calculate");
    PURCHASES_CALCULATE.addEventListener('click',function (){showTable();createTable(addInterest())})    
}
function backForm(){
    const PURCHASES = document.querySelector('.purchases')
    PURCHASES.style.display = 'none'
    const FORM = document.querySelector('form')
    FORM.style.display = 'flex';
}

function initializeForm(){
    let elements = []
    elements.push(document.querySelector("#form_name"));
    elements.push(document.querySelector("#form_date"));
    elements.push(document.querySelector("#form_value"));
    return elements
}
function clearData(){
    let elements = initializeForm();
    elements.map(function (element){
        element.value = null;
    })
}
function getData(){
    let elements = initializeForm();
    let values = elements.map(function (element) {
        return element.value
    })
    return values;
}
function showTable(){
    clearData()
    appearElement(".purchases")
    disappearElement('form')
    appearElement("#purchases__calculate")
    //Limpando
    const PURCHASES_TABLE = document.querySelector('.purchases__table')
    PURCHASES_TABLE.innerHTML = ''
}
function createTable(a){
    a.map(addBuy);
}
function disappearElement(a){
    const ELEMENT = document.querySelector(a)
    ELEMENT.style.display = 'none'
}

function appearElement(a){
    const ELEMENT = document.querySelector(a)
    ELEMENT.style.display = 'flex'
}
function addInterest(){
    disappearElement("#purchases__calculate")
    let AUX = SALES.map(function(object){
        let price = parseFloat(object.price)
        let object_aux =  Object.assign([], object)
        object_aux.price = price + price* parseFloat(object_aux.interest);
        return object_aux
    })
    return AUX
}

function createElement(name,maturity,price){
    const  PURCHASE= document.createElement('li')
    PURCHASE.setAttribute('class','purchase');
    PURCHASE.append(name);
    PURCHASE.append(maturity);
    PURCHASE.append(price);
    return PURCHASE;
}

function addBuy(object){
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
