const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
canvas.width=CANVAS_SIZE;
canvas.height=CANVAS_SIZE;
ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle=INITIAL_COLOR;
ctx.fillStyle=INITIAL_COLOR;
ctx.lineWidth = 2.5;
let painting = false;
let filling = false;
function onMouseMove(event) {
    const x = event.offsetX;
    const y =event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x,y);
        
        ctx.stroke();
    }
    
}
function handleRangeChange(event){
       const size = event.target.value
    ctx.lineWidth = size;
}
function startPainting() {
    painting  = true;
}
function stoppainting(event) {
    painting = false;
}
function handleColorClick(event) { 
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function onMouseUp(event) {
    stoppainting();
}
function handleCanvasclick(){
    if(filling) {
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
    
} 
function handleModeclick(event) {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "paint"
       
    }
}
function handleContextMenu(event) {
    event.preventDefault();
}
function handleSaveclick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href=image;
    link.download = "PaintJS";
    link.click();

}
if(canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stoppainting);
  canvas.addEventListener("mouseleave", stoppainting);
  canvas.addEventListener("click", handleCanvasclick);
  canvas.addEventListener("contextmenu",handleContextMenu);
}

Array.from(colors).forEach(potato =>
     potato.addEventListener("click",handleColorClick));

    if(range) {
        range.addEventListener("input", handleRangeChange)
    }
    if(mode) {
        mode.addEventListener("click", handleModeclick)
    }

    if(saveBtn) {
        saveBtn.addEventListener("click", handleSaveclick);
    }