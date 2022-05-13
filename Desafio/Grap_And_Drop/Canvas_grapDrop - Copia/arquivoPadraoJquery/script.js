const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

canvas.width = 900;
canvas.height = 600;

const cellSize = 100;
const cellGap = 5;
const gameGrid = [];

const controlBar = {
    width: canvas.width,
    height: cellSize,
    
    draw(){
        ctx.fillStyle = 'blue';
        ctx.fillRect(0,0,this.width, this.height);
    }
}


class Cell {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
    }
    draw(){
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}


function createGrid(){
    for (let y = cellSize; y < canvas.height; y += cellSize){
        for (let x = 0; x < canvas.width; x += cellSize){
            gameGrid.push(new Cell(x, y));
        }
    }
}

function drawGrid(){
    gameGrid.forEach(element => {
        element.draw()
    });
}
function pointCircleCollisionDetection(point,circle) {
    let distX = point.x - circle.x;
    let distY = point.y - circle.y;
    let distance = Math.sqrt( (distX*distX) + (distY*distY) );
    if (distance <= circle.radius) {
        return true;
    }
    return false;
}



class handle{
    constructor(){
        this.x=canvas.width/2,
        this.y= canvas.height/2,
        this.radius = 20;        
    }
    drawCircle(){
        ctx.fillStyle = 'gray'
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        ctx.fill();
    }
};

const handles = []
const mainHandle = new handle();
handles.push(mainHandle)
mainHandle.drawCircle()
let dragHandle;


function drawAllCircles(){
    handles.forEach((e)=>{
        e.drawCircle()
    })
}
function pointCircleCollisionDetection(point,circle) {
    let distX = point.x - circle.x;
    let distY = point.y - circle.y;
    let distance = Math.sqrt( (distX*distX) + (distY*distY) );
    if (distance <= circle.radius) {
        return true;
    }
    return false;
}
let mouseOverCell=null;

document.querySelector('#canvas1').addEventListener('mousedown',(e)=>{
        if(pointCircleCollisionDetection({x : e.offsetX, y: e.offsetY}, mainHandle)){
            const newHandle = new handle()
            handles.push(newHandle);
            dragHandle = newHandle
            
            document.querySelector('body').addEventListener('mousemove',onMouseMove);
            document.querySelector('body').addEventListener('mouseup',onMouseUp);        
        }   
})
function onMouseMove(e){
    gameGrid.forEach((el)=>{
        if(pointRectCollisionDetection({x:e.offsetX,y:e.offsetY},el )){
            console.log('USANDO')
            console.log(el)
            mouseOverCell = el
        }
    })
    dragHandle.x = e.offsetX
    dragHandle.y = e.offsetY
}
function onMouseUp(e){
    mouseOverCell = null;
    if(!pointRectCollisionDetection({x : e.offsetX,y : e.offsetY},path)){
        handles.pop();
    }
    document.querySelector('body').removeEventListener('mousemove',onMouseMove);
    document.querySelector('body').removeEventListener('mouseup',onMouseUp);        
}
function pointRectCollisionDetection(first, second) {
    if (    !(  first.x > second.x + second.length ||
                first.x < second.x ||
                first.y > second.y + second.length ||
                first.y < second.y)
    ) {
        return true;
    };
}
class Path{
    constructor(){
        this.x= canvas.width-200,
        this.y= canvas.height/2,
        this.length = 200;        
    }
    draw(){
        ctx.fillStyle = 'red'
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.length,this.length);
        ctx.fill();
    }
}

const path = new Path();
function drawMouseOverCell(){
    if(mouseOverCell)mouseOverCell.draw();
}
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    controlBar.draw()
    path.draw()
    drawAllCircles()
    drawMouseOverCell()
    requestAnimationFrame(animate)
}
animate()
createGrid()