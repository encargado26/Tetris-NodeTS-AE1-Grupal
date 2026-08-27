export class _Cell {
  private _ocupado: boolean;

  constructor() {
    this._ocupado = false; // por defecto la celda está vacía
  }

  // Getter y setter
  get ocupado(): boolean {
    return this._ocupado;
  }

  set ocupado(valor: boolean) {
    this._ocupado = valor;
  }

  // Métodos
  ocupar(): void {
    this._ocupado = true;
  }

  liberar(): void {
    this._ocupado = false;
  }
}