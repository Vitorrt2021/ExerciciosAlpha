$(document).ready(function(){
    $('div').draggable({
        helper: "clone",
    });
    $('section').droppable(
        {
            accept: "div",
            drop: function(ev,ui){
                let droppedItem = $(ui.draggable).clone()
                $(this).append(droppedItem)
                $(this).css('background-color','black')
            }
        }
    );
})
