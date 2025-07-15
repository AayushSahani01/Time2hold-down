const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const socket =require('socket.io');

const server = http.createServer(app);
const io = socket(server);
const PORT = process.env.PORT;

// setup directory!!!
app.set('view engine', 'ejs');
app.use (express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) =>{
    socket.on("sendLocation", (data) =>  {
        io.emit("receiveLocation",{id:socket.id, ...data})
    })
    
});
 
app.use('/', function (req,res) {
    res.render("index.ejs");
})


server.listen(process.env.PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});