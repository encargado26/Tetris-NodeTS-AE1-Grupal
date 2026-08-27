import { _Cell } from './Cell';

export class _Board {
  private _ancho: number;
  private _largo: number;
  private _celdas: _Cell[][];

  constructor(ancho: number, largo: number) {
    this._ancho = ancho;
    this._largo = largo;
    this._celdas = Array.from({ length: largo }, () =>
      Array.from({ length: ancho }, () => new _Cell())
    );
  }

  // Getters y setters adecuados para ancho, largo y celdas
  get ancho(): number {
    return this._ancho;
  }

  set ancho(valor: number) {
    if (valor > 0) {
      this._ancho = valor;
    }
  }

  get largo(): number {
    return this._largo;
  }

  set largo(valor: number) {
    if (valor > 0) {
      this._largo = valor;
    }
  }

  get celdas(): _Cell[][] {
    return this._celdas;
  }

  // Con esto accedemos a una celda específica del tablero usando coordenadas (x, y)
  obtenerCelda(x: number, y: number): _Cell {
    return this._celdas[y][x];
  }
}