

const main = document.querySelector('main')

fillInicialPage()
fillSectionHabitat()
fillSectionCharacteristic()
fillFooter()
function fillInicialPage(){ 
    const pageIntroduction = document.createElement('section')
    pageIntroduction.setAttribute('class','page-introduction');
    const ContentPageIntroduction = document.createElement('div')
    ContentPageIntroduction.setAttribute('class','content__page-introduction')
    ContentPageIntroduction.innerHTML += "<h1>Lobo</h1>"
    ContentPageIntroduction.innerHTML += "<p>O lobo (também chamado de lobo-cinzento; nome científico: Canis lupus) é uma espécie de mamífero canídeo do gênero Canis. É um sobrevivente da Era do Gelo, originário do Pleistoceno Superior, cerca de 300 mil anos atrás. É o maior membro remanescente selvagem da família canidae.</p>"
    pageIntroduction.append(ContentPageIntroduction)
    main.append(pageIntroduction);   
}


function fillSectionHabitat(){
    const pageHabitat = document.createElement('section')
    pageHabitat.setAttribute('class','page-habitat')
    const habitatContent = document.createElement('div')
    habitatContent.setAttribute('class','habitat__content')
    habitatContent.innerHTML += '<h2>Habitat</h2>'
    habitatContent.innerHTML +='<p>Embora não sejam tão adaptáveis à presença humana como geralmente ocorre com as demais espécies de canídeos,[3] os lobos se desenvolveram em diversos ambientes, como florestas temperadas, desertos, montanhas, tundras, taigas, campos e até mesmo em algumas áreas urbanas.</p>'

    const imgHabitat = document.createElement('div')
    imgHabitat.setAttribute('class','img__habitat')
    const img1 = document.createElement('img')
    img1.setAttribute('src','./assets/imagens/loboDeserto.jpg')
    const img2 = document.createElement('img')
    img2.setAttribute('src','./assets/imagens/loboFloresta.jpg')
    const img3 = document.createElement('img')
    img3.setAttribute('src','./assets/imagens/loboNeve.jpg')

    imgHabitat.append(img1)
    imgHabitat.append(img2)
    imgHabitat.append(img3)

    habitatContent.append(imgHabitat)
    pageHabitat.append(habitatContent)
main.append(pageHabitat)
}
function fillSectionCharacteristic(){
    const characteristic = document.createElement('section')
    characteristic.setAttribute('class','characteristic')
    const divCharacteristic = document.createElement('div')
    divCharacteristic.innerHTML = '<h2>Características</h2>'
    divCharacteristic.innerHTML += '<p>O peso e tamanho dos lobos variam muito em todo o mundo, tendendo a aumentar proporcionalmente com a latitude, como previsto pela teoria de Christian Bergmann. Em geral, a altura, medida a partir dos ombros, varia de 60 a 95 centímetros. O peso varia geograficamente. Em média, os lobos europeus pesam 38,5 kg; os lobos da América do Norte, 36 kg; os lobos indianos e árabes, 25 kg.[7] Embora raros, lobos com mais de 77 kg foram encontrados no Alasca, Canadá[8] e na antiga União Soviética.[9] O maior lobo-cinzento registrado na América do Norte foi morto em 70 Mile River, no leste-centro do Alasca em 12 de julho de 1939 e pesava 79 kg.[7] Já o lobo de maior peso registrado na Europa foi morto após a Segunda Guerra Mundial na área Kobelyakski da região Poltavskij na RSS Ucraniana e pesava 86 kg.[10] O lobo é sexualmente dismórfico, as fêmeas de uma população típica de lobos normalmente pesam 20% menos que os machos.[11] As fêmeas também têm o focinho e a fronte mais estreitos, pernas ligeiramente mais curtas e revestidas com pelos lisos, e ombros menos massivos.[7] Os lobos-cinzentos medem de 1,30 a 2 metros do focinho à ponta da cauda, a qual, por sua vez, representa cerca de 1/4 do comprimento total do corpo.</p>' 
    characteristic.append(divCharacteristic)
    main.append(characteristic)
}

function fillFooter(){
    const footer = document.createElement('footer')
    footer.innerHTML = '<p>Todos os direitos reservados aos donos das imagens</p>'
    footer.innerHTML += '<a href=\'https://pt.wikipedia.org/wiki/Lobo\'>Referencia</a>'
    main.append(footer)
}