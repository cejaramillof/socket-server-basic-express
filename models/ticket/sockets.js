const Escritorios = require('./escritorios');
const TicketList = require('./ticket-list');

class Sockets {
  constructor(io) {
    this.io = io;
    // Instance of ticket list
    this.ticketList = new TicketList();
    this.escritorios = new Escritorios();
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on('connection', (socket) => {
      console.log('cliente conectado');
      socket.on('solicitar-ticket', (data, callback) => {
        const nuevoTicket = this.ticketList.crearTicket();
        callback(nuevoTicket);
      });
      socket.on('siguiente-ticket-trabajar', ({ agente, escritorio }, callback) => {
        const suTicket = this.ticketList.asignarTicket(agente, escritorio);
        callback(suTicket);
        this.io.emit('ticket-asignado', this.ticketList.ultimos13);
      })
      socket.on('crear-escritorio', ({ escritorio }) => {
        this.escritorios.addEscritorio(escritorio);
        this.io.emit('cantidad-escritorios', this.escritorios.cantidadEscritorios);
      });
      socket.on('remover-escritorio', ({ escritorio },) => {
        this.escritorios.removeEscritorio(escritorio);
        this.io.emit('cantidad-escritorios', this.escritorios.cantidadEscritorios);
      });

    });
  }
}

module.exports = Sockets;