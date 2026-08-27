import { _Board } from "./Board";
import { _PiezaT } from "./PieceT";

export class Tetris {
  private _board: _Board;
  private _piezaActual: _PiezaT | null;

  constructor(ancho: number = 10, largo: number = 20) {
    this._board = new _Board(ancho, largo);
    this._piezaActual = null;
  }

  get board(): _Board {
    return this._board;
  }

  get piezaActual(): _PiezaT | null {
    return this._piezaActual;
  }

  nuevaPieza(): void {
    this._piezaActual = new _PiezaT(Math.floor(this._board.ancho / 2), 0);
  }

  moverAbajo(): void {
    if (this._piezaActual && this._piezaActual.posY < this._board.largo - 1) {
      this._piezaActual.moverAbajo();
    }
  }

  moverIzquierda(): void {
    if (this._piezaActual && this._piezaActual.posX > 0) {
      this._piezaActual.moverIzquierda();
    }
  }

  moverDerecha(): void {
    if (this._piezaActual && this._piezaActual.posX < this._board.ancho - 1) {
      this._piezaActual.moverDerecha();
    }
  }
}