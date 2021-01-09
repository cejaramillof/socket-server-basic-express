// Express server
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const path = require('path');
const cors = require('cors');

const Sockets = require('./sockets');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    // Http server
    this.server = http.createServer(this.app);
    // Sockets config
    this.io = socketio(this.server, { /* config */ });
  }

  middlewares() {
    // deploy public dir
    this.app.use(express.static(path.resolve(__dirname, '../public')));
    // CORS
    this.app.use(cors());
  }

  // this config can stay here or in a prop class
  configurarSockets() {
    new Sockets(this.io);
  }

  execute() {
    // init Middlewares
    this.middlewares();
    // init sockets
    this.configurarSockets();
    // init Server
    this.server.listen(this.port, () => {
      console.log('Server corriendo en puerto:', this.port);
    });
  }

}

module.exports = Server;