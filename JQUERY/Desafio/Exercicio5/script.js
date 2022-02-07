$(document).ready(function(){
    $('#night_mode').on('click',function(){
        console.log('s')
        if($(this).is(':checked')){
            $('body').css({'background-color': "black","color":"white"})
        
        }else{
            $('body').css({'background-color': "white","color":"black"})
        }
    })  
    $('#font_increase').on('click',function(){
        sizeControll.increase();
    })
    $('#font_decrease').on('click',function(){
        sizeControll.decrease();
    })
})

const sizeControll = createFunctions();
function createFunctions(){
    let fontSize = 20;
    function increase(){
        fontSize *= 1.1;
        $('body').css('font-size',fontSize+"px")
        return fontSize ;
    }
    function decrease(){
        fontSize *= 0.9;
        $('body').css('font-size',fontSize+"px")
        return fontSize        
    }
    return {
        increase,
        decrease
    }
}