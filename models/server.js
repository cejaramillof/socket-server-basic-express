// Express server
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const path = require('path');
const cors = require('cors');

// const Sockets = require('./sockets');
// const Sockets = require('./band/sockets');
// const Sockets = require('./ticket/sockets');
// const Sockets = require('./map/sockets');
const Sockets = require('../chat/models/sockets');
const { dbConnection } = require('../chat/database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    dbConnection(); // db Conection
    this.server = http.createServer(this.app); // Http server
    this.io = socketio(this.server, { /* config */ }); // Sockets config

    this.sockets = new Sockets(this.io);
  }

  middlewares() {
    // deploy public dir
    this.app.use(express.static(path.resolve(__dirname, '../public')));
    // CORS
    this.app.use(cors());

    // Get last tickets
    this.app.get('/ultimos', (req, res) => {
      res.json({
        ok: true,
        ultimos: this.sockets.ticketList.ultimos
      });
    });

    // ChatServer Endpoints
    this.app.use(express.json());
    this.app.use('/api/login', require('../chat/router/auth'));
    this.app.use('/api/mensajes', require('../chat/router/mensajes'));
  }

  // this config can stay here or in a prop class
  configurarSockets() {
    new Sockets(this.io);
  }

  execute() {
    // init Middlewares
    this.middlewares();

    // init sockets
    // this.configurarSockets();

    // init Server
    this.server.listen(this.port, () => {
      console.log('Server corriendo en puerto:', this.port);
    });
  }

}

module.exports = Server;