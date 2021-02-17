import React from 'react';
import Board from '../board/Board.jsx'
import './style.css';

class Container extends React.Component
{
    constructor(props){
        super(props);

        this.state = {
            color: "#000000",
            size: "5",
        }
    }

    changeColor(params){
        this.setState({
            color: params.target.value
        })
    }

    changeSize(params){
        this.setState({
            size: params.target.value
        })
    }
    componentDidMount(){
        this.grid();
    }
    grid(){
        let canvas = document.getElementById('grid');
        let context = canvas.getContext('2d');
        let style = getComputedStyle(canvas)
        canvas.width = parseInt(style.getPropertyValue('width'));
        canvas.height = parseInt(style.getPropertyValue('height'));
        context.beginPath(); //讓每一條線獨立存在，避免後面如果再畫線，會打架
        for (let i = 0; i < 24; i++) {
        let position = i * 50;
        context.moveTo(0, position)
        context.lineTo(canvas.width, position);
        context.fillText(position, 0, position); //顯示格線高度數字

        context.moveTo(position, 0);
        context.lineTo(position, canvas.height);
        context.fillText(position, position, 10); //顯示格線高度數字 //y如果設定0會超出畫布範圍
        }


        //step3: 執行
        context.strokeStyle = 'rgba(0, 0, 0, 0.3)'; //讓格線刷淡不要太搶戲
        context.lineWidth = 1;
        context.stroke();
        this.gridExist = false;
    }

    render(){
        return(
            <div className="container">
                <div className="tools-section">
                    <div className="color-picker-container">
                        Select Brush Color : &nbsp;
                        <input type="color" value={this.state.color} onChange={this.changeColor.bind(this)}/>
                    </div>
                    <div className="brushsize-container">
                        Select Brush Size : &nbsp;
                        <select value={this.state.size} onChange={this.changeSize.bind(this)}>
                            <option>5</option>
                            <option>10</option>
                            <option>15</option>
                            <option>20</option>
                            <option>25</option>
                            <option>30</option>
                        </select>
                    </div>
                </div>
                <div className="board-container">
                    <canvas id="grid"></canvas>
                    <Board color = {this.state.color} size = {this.state.size}/>
                </div>
            </div>
        )
    }
}
export default Container