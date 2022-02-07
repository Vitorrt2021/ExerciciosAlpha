const header = document.querySelector('header')
const logoHeader = document.createElement('div')

logoHeader.setAttribute('class','logo__header');
header.appendChild(logoHeader);

const pagesHeader = document.createElement('nav')
const ulPages = document.createElement('ul')
pagesHeader.setAttribute('class','pages__header')

let a = ['<li><a href=\"#about\">ABOUT</a></li>','<li><a href=\"#musics\">MUSICS</a></li>','<li><a href=\"#author\">AUTHOR</a></li>']

ulPages.innerHTML +=a[0];
ulPages.innerHTML +=a[1];
ulPages.innerHTML +=a[2];

pagesHeader.append(ulPages)

header.append(pagesHeader)

const body = document.querySelector('body')
const colors = ['red','black','blue','yellow']

body.style.backgroundColor = colors[Math.floor(Math.random() * 4)]

const bestMusic = document.querySelector('.best-music'); 
const listMusic = document.querySelectorAll('.card__musics')

bestMusic.appendChild(listMusic[Math.floor(Math.random() * 5)])
