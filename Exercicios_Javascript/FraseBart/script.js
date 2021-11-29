const main = document.querySelector('main');
const form = document.querySelector('form'); 
const submit = document.querySelector('.submit-button');
const backButton = document.querySelector('.back-button')
const sectionResult = document.querySelector('.sectionResult')
submit.addEventListener('click',stopDefAction)
submit.addEventListener('click',changeScreens);
let timeouts = [];
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
    main.innerHTML = '';
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
function createElementPhrase(cont){
    let a = document.createElement('p')
    a.setAttribute('id',"phrase-"+cont);
    return a;
}
function choosePhrase(num){
    const PHRASE = [
        "Alguma criança ainda faz isso?",
        "Eu não sou mais esperto que o presidente",
        "A professora não levou um fora, foi mutuo",
        "Não estamos nus debaixo das roupas",
        "Pérolas não são vômitos de ostra",
        "Cerveja numa caixa de leite não é leite"
    ];
    let phrase = PHRASE[num];
    return phrase;
}
function typeWriterPhrase(cont,PHRASE){
    
    let i = 0;
    let txt = PHRASE;
    let speed = 50;
    typeWriter();
    function typeWriter(){
    if (i < txt.length) {
        document.querySelector('#phrase-'+cont).innerHTML += txt.charAt(i);
        i++;
        console.log('asd')
        setTimeout(typeWriter, speed);
    }
}

}
function write(num){
    let cont=1;
    let id=0;
    let contDelete=0;
    const numPhrase = Math.floor(Math.random() * 6);
    if(num <=0 ){
        alert('Digite um número positivo!')
        backScreen();
    }
    else{
        while(cont <= num){
            
            if(cont%11 == 1 && cont!=1){
                timeouts.push(setTimeout(() => {
                main.innerHTML = '';
                main.append(createElementPhrase(id));
                typeWriterPhrase(id,choosePhrase(numPhrase));
                console.log(createElementPhrase(id))
                id++;
               }, 2100 *cont));
               contDelete++
            }else{
                timeouts.push(setTimeout(() => {
                main.append(createElementPhrase(id));
                typeWriterPhrase(id,choosePhrase(numPhrase));
                console.log(createElementPhrase(id))
                id++
                }, 2100*cont));
            }
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
            title2.textContent += (cont-1)%11 == 0 ? 11 : (cont-1)%11;            
            }, 2200*cont));
    }
}