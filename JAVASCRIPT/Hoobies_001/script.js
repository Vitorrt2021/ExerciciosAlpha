let content = document.getElementById('content')

content.innerHTML = "<div id=\"block__content\"></div>";

let block__content = document.getElementById("block__content")


block__content.innerHTML += "<h1 id=\"content__title\">Leitura</h1><h2>O que é</h2><p id=\"content__description\"></p><h2>Historia</h2>"
block__content.innerHTML += "<p id=\"content__history\"></p><h2>Livros</h2><p id=\"content__books\"></p>";
block__content.innerHTML += "<img src=\"./imgs/pessoa-lendo.jpg\" alt=\"Pessoa Foto Rosto\" id=\"content__image\">";
block__content.innerHTML += "<footer id=\"content__footer\"> </footer>"

let content__description = document.getElementById('content__description')
content__description.innerHTML = "A leitura é o processo cognitivo complexo de decodificar símbolos para extrair significados. É uma forma de processamento da linguagem.A leitura tornou-se uma atividade extremamente importante para a civilização, atendendo a múltiplas finalidades, sendo parte fundamental no processo educacional e na construção do indivíduo.A leitura de conteúdos de boa qualidade alarga os horizontes da pessoa e amplia as suas possibilidades pela expansão de seu conhecimento, desenvolvimento intelectual e de sua visão de mundo, fortalecendo as convicções pessoais, a capacidade de argumentação e manifestação de opiniões com utilização de um vocabulário mais rico."

let content__history = document.getElementById('content__history')

content__history.innerHTML = "Há milhares de anos o homem começou a fazer inscrições nas paredes das cavernas, representando animais e cenas do seu cotidiano. Essas inscrições, chamadas de arte rupestre, mais tarde foram evoluindo para uma forma rudimentar de comunicação, chamada pictografia. A evolução da pictografia fez com que o homem fosse também desenvolvendo sons para transmitir o significado daquela escrita, tornando possível a comunicação e o relacionamento com outros homens."

let content__books = document.getElementById("content__books")
content__books.innerHTML = "        Livro  é um objeto transportável, composto por páginas encadernadas, contendo texto manuscrito ou impresso e/ou imagens e que forma uma publicação unitária (ou foi concebido como tal) ou a parte principal de um trabalho literário, científico ou outro, formando um volume."

let content__footer =  document.getElementById('content__footer')
content__footer.innerHTML = "<h2>Referencia</h2>"
content__footer.innerHTML += "<a href=\"https://pt.wikipedia.org/wiki/Leitura\" id=\"content__link\">Mais sobre ler</a>"
content__footer.innerHTML +="<a href=\"https://www.maioresemelhores.com/livros-mais-vendidos-de-todos-os-tempos/\">Livros para ler</a>"

let initial_screen = document.getElementById('initial_screen');

initial_screen.innerHTML = "<h2>Autor</h2>";
initial_screen.innerHTML+= "<div id=\"block__initial_screen\">";

let block__initial_screen = document.getElementById('block__initial_screen')
block__initial_screen.innerHTML = "<div id=\"block__left\"></div><div id=\"block__right\"></div>";


let block__left = document.getElementById('block__left')
block__left.innerHTML = "<img src=\"./imgs/fotoRosto.jpg\" alt=\"Foto rosto\" id=\"block__image\">";

let block__right = document.getElementById('block__right')
block__right.innerHTML = "<h2>Vitor Ramos</h2><label>Telefone:</label><p>(31) 3454-4534</p><label>Email:</label>"
block__right.innerHTML += "<p>vitorrt2015@gmail.com</p><label>Endereço:</label><p>Ribeirão das Neves, Minas Gerais</p><label>Data de Nascimento:</label><p>28 de maio 2003</p>"
