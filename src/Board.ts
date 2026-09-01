import { _Cell } from "../src/Cell";

export class _Board {
  private _celdas: _Cell[][];
  private _ancho: number;
  private _largo: number;

  constructor(ancho: number, largo: number) {
    this._ancho = ancho;
    this._largo = largo;
    this._celdas = Array.from({ length: largo }, () =>
      Array.from({ length: ancho }, () => new _Cell())
    );
  }

  get ancho(): number {
    return this._ancho;
  }

  set ancho(valor: number) {
    if (valor > 0) this._ancho = valor;
  }

  get largo(): number {
    return this._largo;
  }

  set largo(valor: number) {
    if (valor > 0) this._largo = valor;
  }

  // fila (y), columna (x)
  obtenerCelda(x: number, y: number): _Cell | undefined {
    if (y < 0 || y >= this._largo || x < 0 || x >= this._ancho) {
      return undefined;
    }
    return this._celdas[y][x];
  }

  get celdas(): _Cell[][] {
    return this._celdas;
  }
}