function sum(...arr){
    let res=1;
    for(let i=0;i<arr.length;i++){
        res*=arr[i];
    }
    return res
}
const array = [
    2,5,2,1
]
console.log(sum(...array))