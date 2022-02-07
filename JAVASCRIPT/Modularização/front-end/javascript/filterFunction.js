
export function organizeForName(array){
    let aux = [];
    for (let name in array) {
        for(let sale in array[name]){
            aux.push(array[name][sale])
        }
    }
    aux.sort(function(object1,object2){
        let name1 = object1.name
        let name2 = object2.name
        if(name1 < name2){
            return -1;
        }if(name1 > name2){
            return 1
        }
        return 0;
    })
   return aux
}

export function organizeForDate(){
    let aux = SALES.map(function(obj){return obj})
    aux.sort(function(object1,object2){
        let date1 = new Date(object1.date)
        let date2 = new Date(object2.date)
        return date1 - date2;
    })
   
    return aux;
}

export function compareDateBegin(date,array){
    let result = [];
    let dateMin = new Date(date)
    function isSmaller(object){
        let dateElement = new Date(object.date)
        return dateElement > dateMin
    }
    result = array.filter(isSmaller)
    return result    
}

export function compareDateEnd(date,array){
    let result = [];
    let dateMax = new Date(date)
    function isBig(object){
        let dateElement = new Date(object.date)
        return dateElement <= dateMax
    }
    result = array.filter(isBig)
    return result
}

export function compareMinValue(value,array){
    let result = [];
    function isSmaller(object){
        let ValueElement = +object.price
        return ValueElement >= +value
    }
    result = array.filter(isSmaller)
    return result
}
export function compareMaxValue(value,array){
    let result = [];
    function isBig(object){
        let ValueElement = +object.price
        return ValueElement <= +value
    }
    result = array.filter(isBig)
    return result
}

