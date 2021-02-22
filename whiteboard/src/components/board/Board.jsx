import React from 'react'
import './style.css';
import io from 'socket.io-client'

class Board extends React.Component{

    timeout;
    // socket = io.connect('http://localhost:5001')
    socket = io.connect('https://whiteboard-chou.herokuapp.com/')
    ctx;
    isDrawing = false;
    move = false;
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.drawOnCanvas();
    }

    componentWillReceiveProps(newProps){
        this.ctx.strokeStyle = newProps.color;
        this.ctx.lineWidth = newProps.size;
    }

    

    drawOnCanvas(){
        
        let canvas = document.querySelector("#board");
        this.ctx = canvas.getContext('2d');
        let ctx = this.ctx
    
        var sketch = document.querySelector('#sketch');
        var sketch_style = getComputedStyle(sketch);
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));
    
        var mouse = {x: 0, y: 0};
        var last_mouse = {x: 0, y: 0};
        var root = this;
        
        /* Mouse Capturing Work */
        canvas.addEventListener('mousemove', function(e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;
    
            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);
    
    
        /* Drawing on Paint App */
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
    
        canvas.addEventListener('mousedown', function(e) {
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);
    
        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);
        
        // var root = this;


        var onPaint = function() {
           
            ctx.beginPath();
            ctx.moveTo(last_mouse.x, last_mouse.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            root.socket.emit("canvas-data",{line: [ mouse, last_mouse ], color:ctx.strokeStyle, size:ctx.lineWidth})
            last_mouse = {x:mouse.x, y:mouse.y}
        };
        this.socket.on('canvas-data', function (data) {
            var line = data.line;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.lineWidth = data.size;
            ctx.strokeStyle = data.color;

            ctx.beginPath();
            ctx.moveTo(line[0].x , line[0].y);
            ctx.lineTo(line[1].x , line[1].y);
            ctx.stroke();
         });
        
        
    
    }

    render(){
        return(
            <div className="sketch" id="sketch">
                <canvas className="board" id="board"></canvas>
            </div>
        )
    }
}
export default Board
