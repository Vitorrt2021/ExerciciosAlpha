raffleDraw()

function raffleDraw(){
    const buttonPlay = document.querySelector('.button_play')
    buttonPlay.addEventListener('click',()=>{
        clearNumbers()
        appearNumber()
    })
}
function randomNumber(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
function checkArray(array,number){
    for(let i=0;i<array.length;i++){
        if(array[i] === number){
            return false
        }
    }
    return true
}
function drawn(random){
    let result = []
    for(let i=0;i<6;i++){
        let sort = random(1,60)        
        if(checkArray(result,sort)){
            result.push(sort)
        }else{
            i--
        }
    }   
    return result
}
function makeBoll(number,bolls){    
    let element = bolls.shift()
    element.innerHTML = number
}
function appear(result,bolls){
    if(result[result.length-1] === undefined){
        clearInterval(nIntervId)
    }else{
        makeBoll(result.pop(),bolls)  
    }
}
function clearNumbers(){
    const BOLLS = document.querySelectorAll('.boll_result')
    for(let i=0;i<BOLLS.length;i++){
        BOLLS[i].innerHTML = ''
    }
}
function appearNumber() {
    let result = drawn(randomNumber);
    const BOLLS = document.querySelectorAll('.boll_result')
    console.log(result)
    let bolls = [];
    for(let i=0;i<BOLLS.length;i++){
        bolls.push(BOLLS[i])
    }
    nIntervId = setInterval(()=>{appear(result,bolls)}, 1000);
}
