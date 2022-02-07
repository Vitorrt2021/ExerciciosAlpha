$(document).ready(function(){
    $('#input_setData').on('click',function(){
        let name = $('#input_name').val();
        let date = $('#input_data').val();        
        clearForm()
        createTable({
            name,
            date
        })
    })
})
function clearForm(){
    let name = $('#input_name').val('');
    let date = $('#input_data').val('');        
}
createTable({
    name : 'Vitor',
    date:"3123/232/23"
})
function createTable(e){       
    const linha = $('<tr></tr>').attr('id',e.name);
    let name = $("<td></td>").text(e.name);
    let date = $("<td></td>").text(e.date);
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
    linha.append(name,date,check);     
    $('#table_result').append(linha)    

}