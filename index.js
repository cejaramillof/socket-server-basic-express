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


// connection
io.on('connection', (socket) => {
  // socket or client (is the user connected)
  console.log('Un dispositivo se conectó! ClientId:', socket.id)

  // emit event (event, payload to share with client)
  socket.emit('welcome-message', 'Welcome to da server');

  // is most usually share objects not (strings, booleans)
  socket.emit('welcome-object', {
    msg: 'Welcome to da server',
    serverDate: Date.now()
  });

  socket.on('mensaje-to-server', ({ msg, clientDate }) => {
    console.log('Message from client:', msg, clientDate)
  });
});

server.listen(8080, () => {
  console.log('Server running on port: 8080')
});