const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

// console.log(__dirname + '\\..\\public'); // contains ".." in path
// const publicPath = path.join(__dirname, '../public');
// console.log(publicPath); // does not contain ".." in path

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

// app.use('/', express.static(path.join(__dirname, '../public')));
//
// app.get('/', (req, res) => {
//   res.sendFile('/index.hmtl');
// });

app.use(express.static(path.join(__dirname, '../public')));

// ***************
//
// on connection
//
// ***************
io.on('connection', (socket) => {
  console.log('New user connected to server');


//
// on join
//
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    // emit newMessage's
    socket.emit('newMessage', generateMessage('Admin', `Welcome to the chat app ${params.name}`)); // socket.emit: emit only to the user who joined i.e. to their socket only
    socket.broadcast.to(params.room).emit('newMessage',  generateMessage('Admin', `${params.name} joined the room`)); // socket.broadcast.emit: emit to everyone except this socket

    callback();
  });

  //
  // on createMessage
  //
  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text)); // io.emit: emits to everyone
    }
    callback(); // acknowlegment function
  });

  //
  // on createLocationMessage
  //
  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  //
  // on disconnect
  //
  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });
});

server.listen(port, () => {
  console.log(`Server up on port ${port}`);
})
