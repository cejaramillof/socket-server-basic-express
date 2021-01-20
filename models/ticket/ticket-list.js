const Ticket = require('./ticket');

class TicketList {
  constructor() {
    this.ultimoNumero = 0;
    this.pendientes = [];
    this.asignados = [];
  }

  get siguienteNumero() {
    this.ultimoNumero++;
    return this.ultimoNumero;
  }

  // 3 to current and 10 to history
  get ultimos13() {
    return this.asignados.slice(0, 13);
  }

  get ultimos() {
    let enEscritorio = [];
    let historico = [];
    const escritorios = new Map();

    this.asignados.map((ticket) => {
      if (!escritorios[ticket.escritorio]) {
        escritorios[ticket.escritorio] = 1;
        enEscritorio.push(ticket);
        return;
      }
      historico.push(ticket)
    })

    return {
      enEscritorio,
      historico: historico.slice(0, 6),
    }
  }

  crearTicket() {
    const nuevoTicket = new Ticket(this.siguienteNumero);
    this.pendientes.push(nuevoTicket);
    return nuevoTicket;
  }

  asignarTicket(agente, escritorio) {
    if (this.pendientes.length === 0) {
      return null;
    }
    const siguienteTicket = this.pendientes.shift();
    siguienteTicket.agente = agente;
    siguienteTicket.escritorio = escritorio;
    this.asignados.unshift(siguienteTicket);
    return siguienteTicket;
  }
}

module.exports = TicketList;