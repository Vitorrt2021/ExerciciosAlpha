$(document).ready(function(){
    cicle()
})
function cicle(){
    setTimeout(()=>{
        $('div').css('background-color','gray')
        $('#div_1').css('background-color',colors[0])
    }, 2000);

    setTimeout(()=>{
        $('div').css('background-color','gray')
        $('#div_2').css('background-color',colors[1])
    }, 4000);

    setTimeout(()=>{
        $('div').css('background-color','gray')
        $('#div_3').css('background-color',colors[2])
    }, 6000);
    
    setTimeout(()=>{
        $('div').css('background-color','gray')
        $('#div_2').css('background-color',colors[1])
        cicle()
    }, 8000);

}
const colors = [
    'red',
    'yellow',
    'green'
]
