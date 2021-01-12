class Escritorios {
  constructor() {
    this.escritorios = [];
  }

  get cantidadEscritorios() {
    return this.escritorios.length;
  }

  addEscritorio(escritorio) {
    this.escritorios.push(escritorio);
  }

  removeEscritorio(escritorio) {
    this.escritorios = this.escritorios.filter(curr => curr !== escritorio);
  }
}

module.exports = Escritorios;