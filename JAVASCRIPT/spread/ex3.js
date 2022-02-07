function maxOfTen(){
    const array=[];
    for(let i=0;i<10;i++){
        array.push(Math.floor(Math.random() * (100-1)) + 1)
    }
    return Math.max(...array);
}

console.log(maxOfTen())