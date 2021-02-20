const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado,
  usuarioDesconectado,
  grabarMensaje,
  getUsuarios } = require('../controllers/sockets');

class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }
  socketEvents() {
    this.io.on('connection', async (socket) => {
      const [valido, uid] = comprobarJWT(socket.handshake.query['x-token']);
      if (!valido) {
        console.log('socket no identificado');
        return socket.disconnect();
      }
      await usuarioConectado(uid);
      
      /*
        socket.join('gamer-room'); // will join current socket to this room
        this.io.to('gamer-room').emit(''); // will dispatch this event to all sockets subscribeds
      */
      socket.join(uid);

      this.io.emit('lista-usuarios', await getUsuarios())

      socket.on('mensaje-personal', async (payload) => {
        const mensaje = await grabarMensaje(payload);
        this.io.to(payload.para).emit('mensaje-personal', mensaje);
        this.io.to(payload.de).emit('mensaje-personal', mensaje);
      });

      socket.on('disconnect', async () => {
        await usuarioDesconectado(uid);
        this.io.emit('lista-usuarios', await getUsuarios())
      })
    });
  }
}

module.exports = Sockets;
