const DECREASE = document.querySelector('.decrease')
const INCREASE = document.querySelector('.increase')

DECREASE.addEventListener('click',DecreaseFontSize)

INCREASE.addEventListener('click',IncreaseFontSize)

function createChangeFontSize(baseFontSize){
    let x = baseFontSize;
    function changeFontSize(num){
        x+=num
        return x
    }
    return changeFontSize
}
const changeFontSize = createChangeFontSize(15)

function DecreaseFontSize(){
    const HTML = document.querySelector('html')
    HTML.style.fontSize = changeFontSize(-1) + "px"
}

function IncreaseFontSize(){
    const HTML = document.querySelector('html')
    HTML.style.fontSize = changeFontSize(1) + "px"
}