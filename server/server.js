const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

// console.log(__dirname + '\\..\\public'); // contains ".." in path
// const publicPath = path.join(__dirname, '../public');
// console.log(publicPath); // does not contain ".." in path

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// app.use('/', express.static(path.join(__dirname, '../public')));
//
// app.get('/', (req, res) => {
//   res.sendFile('/index.hmtl');
// });

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  console.log('New user connected to server');

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: Date.now()
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server up on port ${port}`);
})
