$(document).ready(function(){
    $('#input_send').on('click',function(){
        let name = $('#input_name').val();
        let mark = $('#input_mark').val();        
        let qtd = $('#input_qtd').val();
        clearForm()
        createTable({
            name,
            mark,
            qtd
        })
    })
})
function clearForm(){
    $('#input_name').val('');
    $('#input_mark').val('');
    $('#input_qtd').val('');        
}
createTable({
    name : 'Vitor',
    mark:"Leroy",
    qtd : '12'
})
function createTable(e){       
    const linha = $('<tr></tr>').attr('id',e.name);
    
    let name = $("<td></td>").text(e.name);
    let mark = $("<td></td>").text(e.mark);
    let qtd = $("<td></td>").text(e.qtd);

    let check = $('<input></input>')
                                    .attr('type','checkbox')
                                    .on('click',function(){
                                        console.log("ggy")
                                        if($(this).is(':checked')){
                                            $('#'+e.name).css('text-decoration','line-through');
                                        }else{
                                            $('#'+e.name).css('text-decoration','none');    
                                        }
                                    })
    linha.append(name,mark,qtd,check);     
    $('#table_result').append(linha)    

}