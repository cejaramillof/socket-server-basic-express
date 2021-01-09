class Sockets {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        // on connection
        this.io.on('connection', (socket) => {
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
                // socket.emit('new-server-msg', { msg })
                // only will notify current client (socket)

                this.io.emit('new-server-msg', { msg })
                // will notify all sockets (clients connecteds)
            });
        });
    }


}

module.exports = Sockets;
