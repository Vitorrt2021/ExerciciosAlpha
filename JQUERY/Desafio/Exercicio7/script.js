
$(document).ready(function(){
    const tabelas = [];
    const tabelasTable = [];
    
    const table1 = createCard()
    const table2 = createCard()
    const table3 = createCard()

    
    $('body').append(table1.table,table2.table,table3.table)
    
    tabelasTable.push(table1.table)
    tabelasTable.push(table2.table)
    tabelasTable.push(table3.table)
    
    
    tabelas.push(table1.numeros)
    tabelas.push(table2.numeros)
    tabelas.push(table3.numeros)
    
    const vencedor = sortearBolas(tabelas);
    let h1 = $('<h1></h1>').text('Vencedor')

    $('body').append(h1,tabelasTable[vencedor])
})

function sortearBolas(tabelas){
    const sortear = sort();
    for(let i=0;i<74;i++){
        let sorteado = sortear();
    //    document.querySelector('#sorteadis').innerHTML += sorteado + ' ';
        sorteado = sorteado[0];
        
        for(let j=0;j<tabelas.length;j++){
            if(tabelas[j].indexOf(sorteado) != -1){
                let position = tabelas[j].indexOf(sorteado)
                tabelas[j].splice(position,1);
            }
            if(tabelas[j].length == 0){
                return j;             
            } 
        }
        
    }
    return false
}

function createCard(){
    const numeros = [];
    const table = $('<table></table>')
    const sortear = sort();
    for(let i=0;i<3;i++){
    
        const linha = $('<tr></tr>')
        for(let l=0;l<8;l++){
            let sorteado = sortear();
            numeros.push(sorteado[0])
            const coluna = $("<td></td>").text(sorteado)
            linha.append(coluna)
        }

        table.append(linha)
    }
    return {
        table,
        numeros
    }
}
function sort(){
    let number = []
    for(let i=1;i<76;i++){
        number.push(i);
    }
    function getNumber(){
        let position = Math.floor(Math.random() * (75 - 1)) + 1 
        let num = number.splice(position,1)
        if(num.length == 0){
            return getNumber();
        }else{
            return num
        }
    }
    return getNumber
}
