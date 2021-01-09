// Express server
// const app = require('express');
const express = require('express');
const app = express();

// Sockets server
const server = require('http').createServer(app);

// Config socket server
const io = require('socket.io')(server);

// deploy public dir
app.use(express.static(__dirname + '/public'))


// on connection
io.on('connection', (socket) => {
  // socket or client (is the user connected)
  console.log('Client connected! ClientId:', socket.id)

  // emit event (event, payload to share with client)
  socket.emit('welcome-message', 'Welcome to da server');

  // is most usually share objects not (strings, booleans)
  socket.emit('welcome-object', {
    msg: 'Welcome to da server',
    serverDate: Date.now()
  });

  // listen default namespace '/'
  socket.on('mensaje-to-server', ({ msg, clientDate }) => {
    console.log('Message from client:', msg, clientDate)
  });

  socket.on('new-msg', ({ msg }) => {
    console.log('New message:', msg)
    // socket.emit('new-server-msg', { msg }) // only will notify current client (socket)
    io.emit('new-server-msg', { msg }) // will notify all sockets (clients connecteds)
  });
});

server.listen(8080, () => {
  console.log('Server running on port: 8080')
});