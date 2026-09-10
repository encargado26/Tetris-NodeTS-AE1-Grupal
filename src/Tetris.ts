import { _Board } from "./Board";
import { _Reloj } from "./Clock";
import { _Cell } from "./Cell";
import { _PiezaBase } from "./PieceBase";
import { _PiezaT } from "./PieceT";
import { _PiezaL } from "./PieceL";
import { _PiezaCuadrado } from "./PieceSquare";
import { _PiezaStick } from "./PieceStick";
import { _PiezaDog } from "./PieceDog";

export class Tetris {
  private _board: _Board;
  private _clock: _Reloj;
  private _piezaActual: _PiezaBase | null;
  private _gameOver: boolean;
  private _completedLines: number;
  private _maxLines: number;
  private _gameWon: boolean;

  constructor(ancho: number = 10, largo: number = 20, maxLines: number = 5) {
    this._board = new _Board(ancho, largo);
    this._clock = new _Reloj();
    this._piezaActual = null;
    this._gameOver = false;
    this._completedLines = 0;
    this._maxLines = maxLines;
    this._gameWon = false;
  }

  get gameOver(): boolean {
    return this._gameOver;
  }

  get piezaActual(): _PiezaBase | null {
    return this._piezaActual;
  }

  get gameWon(): boolean {
  return this._gameWon;
}

  // Crear nueva pieza aleatoria en la primera fila
  spawnPiece(): void {
    const piezas = [_PiezaT, _PiezaL, _PiezaCuadrado, _PiezaStick, _PiezaDog];
    const piezaClass = piezas[Math.floor(Math.random() * piezas.length)];
    const posX = Math.floor(this._board.ancho / 2);
    this._piezaActual = new piezaClass(posX, 0);

    if (!this.canPlace(this._piezaActual)) {
      this._gameOver = true;
      this._gameWon = false;
      return;
    }

    this.placePieceOnBoard(this._piezaActual);
  }

  // Tick del reloj → bajar pieza
  tick(): void {
    if (this._gameOver) return;

    this._clock.tick();
    if (this._piezaActual) {
      this.clearPieceFromBoard(this._piezaActual);
      this._piezaActual.moverAbajo();

      if (!this.canPlace(this._piezaActual)) {
        this._piezaActual.posY -= 1; // revertimos
        this.handleLock();
      } else {
        this.placePieceOnBoard(this._piezaActual);
      }
    }
  }

  // Movimiento lateral
  moveLeft(): void {
    if (!this._piezaActual) return;
    this.clearPieceFromBoard(this._piezaActual);

    this._piezaActual.moverIzquierda();
    if (!this.canPlace(this._piezaActual)) {
      this._piezaActual.moverDerecha();
    }

    this.placePieceOnBoard(this._piezaActual);
  }

  moveRight(): void {
    if (!this._piezaActual) return;
    this.clearPieceFromBoard(this._piezaActual);

    this._piezaActual.moverDerecha();
    if (!this.canPlace(this._piezaActual)) {
      this._piezaActual.moverIzquierda();
    }

    this.placePieceOnBoard(this._piezaActual);
  }

  // Rotación
  rotate(): void {
    if (!this._piezaActual) return;
    this.clearPieceFromBoard(this._piezaActual);

    const oldForma = this._piezaActual.forma;
    this._piezaActual.rotate();

    if (!this.canPlace(this._piezaActual)) {
      this._piezaActual.forma = oldForma;
    }

    this.placePieceOnBoard(this._piezaActual);
  }

  // Bloquear pieza en el tablero
  private lockPiece(): void {
    if (!this._piezaActual) return;
    this.placePieceOnBoard(this._piezaActual);
    this._piezaActual = null;
  }

  private handleLock(): void {
    this.lockPiece();
    this.clearLines();
    this.checkGameOver();
    if (!this._gameOver) this.spawnPiece();
  }

  private clearLines(): void {
    const nuevasFilas = this._board.celdas.filter(fila => !fila.every(c => c.ocupado));
    const eliminadas = this._board.largo - nuevasFilas.length;
    this._completedLines += eliminadas;

    while (nuevasFilas.length < this._board.largo) {
      nuevasFilas.unshift(Array.from({ length: this._board.ancho }, () => new _Cell()));
    }

    this._board.celdas.splice(0, this._board.largo, ...nuevasFilas);
  }

  private checkGameOver(): void {
      if (this._completedLines >= this._maxLines) {
    this._gameOver = true;
    this._gameWon = true;
  }
  }

  private canPlace(pieza: _PiezaBase): boolean {
    return pieza.forma.every((fila, y) =>
      fila.every((valor, x) =>
        valor === 0 ||
        (
          pieza.posX + x >= 0 &&
          pieza.posX + x < this._board.ancho &&
          pieza.posY + y >= 0 &&
          pieza.posY + y < this._board.largo &&
          !this._board.obtenerCelda(pieza.posX + x, pieza.posY + y)!.ocupado
        )
      )
    );
  }

  private placePieceOnBoard(pieza: _PiezaBase): void {
    pieza.forma.forEach((fila, y) => {
      fila.forEach((valor, x) => {
        if (valor === 1) {
          const celda = this._board.obtenerCelda(pieza.posX + x, pieza.posY + y);
          if (celda) celda.ocupar();
        }
      });
    });
  }

  private clearPieceFromBoard(pieza: _PiezaBase): void {
    pieza.forma.forEach((fila, y) => {
      fila.forEach((valor, x) => {
        if (valor === 1) {
          const celda = this._board.obtenerCelda(pieza.posX + x, pieza.posY + y);
          if (celda) celda.ocupado = false;
        }
      });
    });
  }
}