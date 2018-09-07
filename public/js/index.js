var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  // socket.emit('createEmail', {
  //   to: 'fred@freddy.io',
  //   text: 'hello baby'
  // });

  socket.emit('createMessage', {
    from: 'bobby',
    text: 'hello baby'
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

// socket.on('newEmail', function (email) {
//   console.log('New email', email);
// });

// server -> client
socket.on('newMessage', function (newMessage) {
  console.log('New message', newMessage);
});
