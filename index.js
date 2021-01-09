// Express server
const app = require('express');

// Sockets server
const server = require('http').createServer(app);

// Config socket server
const io = require('socket.io')(server);

// connection
io.on('connection', () => { /* ... */});

server.listen(8080, () => {
  console.log('Server running on port: 8080')
});