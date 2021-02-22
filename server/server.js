var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http, { 'cors': { 'methods': ['GET', 'PATCH', 'POST', 'PUT'], 'origin': true} });
const cors = require('cors')
const router = require('./router')

app.use(cors())
app.use(router);


io.on('connection', (socket)=>{
    console.log('User online');
    socket.on('canvas-data', (data)=>{
        socket.broadcast.emit('canvas-data',{line: data.line, color:data.color, size:data.size})
    })
})

var server_port = process.env.PORT || 5001;
http.listen(server_port, ()=>{
    console.log("Started on"+ server_port );
})