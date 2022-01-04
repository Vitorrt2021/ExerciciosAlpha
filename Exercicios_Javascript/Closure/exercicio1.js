function multiplyX(x){
    let mul=x;
    function multiply(num){
        mul*=num
        return mul
    }
    return multiply
}

const multiplyBy2 = multiplyX(2)

console.log(multiplyBy2(5))
console.log(multiplyBy2(2))