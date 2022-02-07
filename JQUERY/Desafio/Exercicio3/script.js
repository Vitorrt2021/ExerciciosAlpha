$('document').ready(function(){
    createTable(moradores,true)
    $('#list_present').on('click',function(){
        createTable(presentes,false)  
    })
})
function createTable(array,button1){
    $('#result_table').html('')
    array.forEach((e)=>{
        
        const linha = $('<tr></tr>');

        let nome = $("<td></td>").text(e.nome);
        let torre = $("<td></td>").text(e.torre);
        let apartamento = $("<td></td>").text(e.apartamento);
        let andar = $("<td></td>").text(e.andar);
        if(button1){
            let button = $('<button></button>')
                                                .attr('id',e.nome)
                                                .text('adicionar')
                                                .on('click',function(){
                                                    presentes.push(e);
                                                    $(this).hide();
                                                })
            linha.append(nome,torre,apartamento,andar,button); 
        }else{
            linha.append(nome,torre,apartamento,andar);     
        }
        $('#result_table').append(linha)    
    })
}
const presentes = [];
const moradores = [{
    nome: "João",
    torre: 1,
    apartamento: 01,
    andar: 0
  },
  {
    nome: "Lucas",
    torre: 1,
    apartamento: 02,
    andar: 0
  },
  {
    nome: "Victória",
    torre: 1,
    apartamento: 11,
    andar: 1
  },{
    nome: "Miguel",
    torre: 1,
    apartamento: 12,
    andar: 1
  },{
    nome: "Alípio",
    torre: 2,
    apartamento: 01,
    andar: 0
  },{
    nome: "Lorena",
    torre: 2,
    apartamento: 02,
    andar: 0
  },{
    nome: "Jairo",
    torre: 2,
    apartamento: 11,
    andar: 1
  },{
    nome: "Jerusa",
    torre: 2,
    apartamento: 12,
    andar: 1
  }
]