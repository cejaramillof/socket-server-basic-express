// Server Model: express server + socket.io config
// const Server = require('./models/server');
const Server = require('./chat/models/server');

// load env vars
require('dotenv').config();

// initialize server
const server = new Server();

// execute server
server.execute();
