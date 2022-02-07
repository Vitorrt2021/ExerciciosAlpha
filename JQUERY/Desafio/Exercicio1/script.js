const notas = {
    'SI': `https://freesound.org/data/previews/316/316913_5385832-lq.mp3`,
    'SOL' : `https://freesound.org/data/previews/316/316912_5385832-lq.mp3`,
    'RE' : `https://freesound.org/data/previews/316/316909_5385832-lq.mp3`,
    "MI" : `https://freesound.org/data/previews/316/316906_5385832-lq.mp3`,
    'FA' : `https://freesound.org/data/previews/316/316904_5385832-lq.mp3`,
    'LA' : `https://freesound.org/data/previews/316/316902_5385832-lq.mp3`,
    'DO' : `https://freesound.org/data/previews/316/316901_5385832-lq.mp3`
}

$(document).ready(function(){
    const chaves = Object.keys(notas);
    let cont = 0;
    chaves.forEach((nota)=>{
        const tecla = $('<div></div>')
                                    .text(nota)
                                    .on('click',function(){
                                        const audioObj = new Audio(notas[nota]);
                                        audioObj.play()
                                    })
                                    .css('background-color',`${cont%2==0?'white':'black'}`)
        $('body').append(tecla);
        console.log(tecla)
        cont++;
    })
})