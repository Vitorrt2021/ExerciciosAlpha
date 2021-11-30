const main = document.querySelector('main');
const form = document.querySelector('form'); 
const submit = document.querySelector('.submit-button');
const backButton = document.querySelector('.back-button')
const sectionResult = document.querySelector('.sectionResult')
submit.addEventListener('click',stopDefAction)
submit.addEventListener('click',changeScreens);
let timeouts = [];
let contDelete=0;
let numLines=0;
backButton.addEventListener('click',backScreen);

function stopDefAction(evt) {
    evt.preventDefault();
}
function backScreen(){
    for (let i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
    }
    timeouts = []
    form.style.display = 'flex';
    backButton.style.display = "none";
    main.style.display ="none";
    main.innerHTML = '<p></p>';
    sectionResult.style.display = "none"

    
}
function changeScreens(){
    const repetitionValue = document.querySelector('.repetition-value');
    let num = +repetitionValue.value
    form.style.display = 'none';
    backButton.style.display = "flex";
    main.style.display ="flex"
    sectionResult.style.display = "none"
    write(num);
}
function choosePhrase(num){
    const PHRASE = [
        "Alguma criança ainda faz isso?     ",
        "Eu não sou mais esperto que o presidente ",
        "A professora não levou um fora, foi mutuo ",
        "Não estamos nus debaixo das roupas     ",
        "Pérolas não são vômitos de ostra       ",
        "Cerveja numa caixa de leite não é leite "
    ];
    let phrase = PHRASE[num];
    phrase ="A professora não levou um fora, foi mutuo      ";
    return phrase;
}
function typeWriterPhrase(PHRASE){
    
    let i = 0;
    let txt = PHRASE;
    let speed = 50;
    typeWriter();
    function typeWriter(){
    if (i < txt.length) {
        document.querySelector("main >p").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
        if(countLines() >=11){
            clearScreen(PHRASE)
        }
    }
}
}
function clearScreen(PHRASE){
    main.innerHTML = '<p></p>';
    numLines=1;
    contDelete++
}
function write(num){
    let cont=1;
    const numPhrase = Math.floor(Math.random() * 6);
    if(num <=0 ){
        alert('Digite um número positivo!')
        backScreen();
    }
    else{
        while(cont <= num){
            timeouts.push(setTimeout(() => {
                typeWriterPhrase(choosePhrase(numPhrase));
                numLines++;
            }, 2700 *cont));
            cont++;
        }
        
        timeouts.push(setTimeout(() => {
            const screen = document.querySelector('section')
            screen.style.display = "flex";
            
            main.style.display = 'none'
            
            const title = document.querySelector('section > h1')
            title.textContent = "O número de vezes que apaguei o quadro foi "
            title.textContent += contDelete;
            
            const title2 = document.querySelector('section > h2')
            title2.textContent = 'A quantidade de linhas na tela final foi '
            title2.textContent += numLines;            
            }, 2600*cont));
    }
}


function countLines() {
    let el = document.querySelector("main > p");
    let divHeight = el.offsetHeight
    let lineHeight = 30;
    let lines = divHeight / lineHeight;
    return lines
}