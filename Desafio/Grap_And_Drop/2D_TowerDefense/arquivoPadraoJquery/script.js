const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 600;

//Global Variables
const cellSize = 100;
const cellGap = 3;
const gameGrid = [];
//mouse
const mouse = {
    x: 10,
    y: 10,
    width: 0.1,
    height: 0.1,
}
let canvasPosition = canvas.getBoundingClientRect();
console.log(canvasPosition)
canvas.addEventListener('mouse',(e)=>{
    mouse.x = e.x - canvasPosition.left;
    mouse.y = e.y - canvasPosition.top;
});
canvas.addEventListener('mouseleave',()=>{
    mouse.x = undefined;
    mouse.y = undefined
})
//game board
const controlsBar = {
    with: canvas.width,
    height: cellSize,
}
class Cell{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
    }
    draw(){
        if(mouse.x && mouse.y && collision(this,mouse)){
            ctx.strokeStyle = 'red';
            ctx.strokeRect(this.x,this.y,this.width,this.height);    
        }
    }
}
function createGrid(){
    for(let y = cellSize; y < canvas.height; y+= cellSize){
        for(let x = 0;x < canvas.width; x += cellSize){
            gameGrid.push(new Cell(x,y));
        }
    }
}
function handleGameGrid(){
    for(let i = 0; i < gameGrid.length; i++){
        gameGrid[i].draw();
    }
}
//projecttiles
//defenders
//enemies
//resources
//utilities
createGrid();
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = 'blue';
    ctx.fillRect(0,0,controlsBar.with,controlsBar.height)
    handleGameGrid();
    requestAnimationFrame(animate);
}
console.log(gameGrid)
animate()

function collision(first, second){
    if(
        !(first.x > second.x + second.width ||
          first.x + first.width < second.x ||
          first.y > second.y + second.height ||
          first.y + first.height < second.y)
    ){
        console.log('true')
        return true
    }else{
        console.log('false')
        return false
    }
}