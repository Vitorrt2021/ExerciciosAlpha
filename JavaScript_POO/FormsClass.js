function pen(color){
    this.color = color;
}

let pen1 = new pen('red')

console.log(pen1.color)


let pen2 = {
    "color":"blue"
}
console.log(pen2.color)

const car = class {}
console.log(Object.getPrototypeOf(car))



function Hero1(name,level){
    this.name = name;
    this.level = level;
}

Hero1.prototype.greet = function(){
    return `${this.name} says hello.`
}
const a = new Hero1("Vitor",100)

console.log(a.greet())


function Mage(name,level,spell){
    
    Hero1.call(this,name,level)
    this.spell = spell
}

const mageObj = new Mage("Merlin",2,"Fire boll")
console.log(mageObj.spell)


class Hero2{
    constructor(name,level){
        this.name = name;
        this.level = level;
    }
    greet(){
        return `${this.name} says hello.`
    }
}
class Mage2 extends Hero2{
    constructor(name,level,spell){
        super(name,level);

        this.spell = spell;
    }
}
const mageObj2 = new Mage2('Merlin',10,"Telecinese")