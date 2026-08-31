import { _Board } from "./Board";
import { _Clock } from "./Clock";
import { _Cell } from "./Cell";
import { _PiezaBase } from "./PieceBase";
import { _PiezaT } from "./PieceT";
import { _PiezaL } from "./PieceL";
import { _PiezaCuadrado } from "./PieceSquare";
import { _PiezaStick } from "./PieceStick";
import { _PiezaDog } from "./PieceDog";

export class Tetris {
  private _board: _Board;
  private _clock: _Clock;
  private _piezaActual: _PiezaBase | null;
  private _gameOver: boolean;
  private _completedLines: number;
  private _maxLines: number;

  constructor(ancho: number = 10, largo: number = 20, maxLines: number = 5) {
    this._board = new _Board(ancho, largo);
    this._clock = new _Clock();
    this._piezaActual = null;
    this._gameOver = false;
    this._completedLines = 0;
    this._maxLines = maxLines;
  }

  get gameOver(): boolean {
    return this._gameOver;
  }

  get piezaActual(): _PiezaBase | null {
    return this._piezaActual;
  }

  // Crear nueva pieza aleatoria en la primera fila
  spawnPiece(): void {
    const piezas = [_PiezaT, _PiezaL, _PiezaCuadrado, _PiezaStick, _PiezaDog];
    const piezaClass = piezas[Math.floor(Math.random() * piezas.length)];
    const posX = Math.floor(this._board.ancho / 2);
    this._piezaActual = new piezaClass(posX, 0);

    // si no cabe en la primera fila → game over
    if (!this.canPlace(this._piezaActual)) this._gameOver = true;
  }

  // Tick del reloj → bajar pieza
  tick(): void {
    if (this._gameOver) return; 

    this._clock.tick();
    if (this._piezaActual) { 
      this._piezaActual.moverAbajo();
      !this.canPlace(this._piezaActual) && this.handleLock();
    }
  }

  // Movimiento lateral
  moveLeft(): void {
    if (!this._piezaActual) return; 
    this._piezaActual.moverIzquierda();
    !this.canPlace(this._piezaActual) && this._piezaActual.moverDerecha();
  }

  moveRight(): void {
    if (!this._piezaActual) return; 
    this._piezaActual.moverDerecha();
    !this.canPlace(this._piezaActual) && this._piezaActual.moverIzquierda(); 
  }

  // Rotación
  rotate(): void {
    if (!this._piezaActual) return; 
    const oldForma = this._piezaActual.forma;
    this._piezaActual.rotate();
    !this.canPlace(this._piezaActual) && (this._piezaActual.forma = oldForma);
  }

  // Bloquear pieza en el tablero
  private lockPiece(): void {
    if (!this._piezaActual) return; // if 1

    this._piezaActual.forma.forEach((fila, y) =>
      fila.forEach((valor, x) => {
        if (valor !== 1) return;

        const celda = this._board.obtenerCelda(this._piezaActual!.posX + x, this._piezaActual!.posY + y);
        if (celda) celda.ocupar();
      })
    );

    this._piezaActual = null;
  }

  // Manejo completo cuando la pieza no puede bajar
  private handleLock(): void {
    this._piezaActual!.posY -= 1; // revertimos movimiento
    this.lockPiece();
    this.clearLines();
    this.checkGameOver();
    !this._gameOver && this.spawnPiece(); // si no terminó, generamos otra
  }

  // Eliminar líneas completas
  private clearLines(): void {
    const nuevasFilas = this._board.celdas.filter(fila => !fila.every(c => c.ocupado));
    const eliminadas = this._board.largo - nuevasFilas.length;
    this._completedLines += eliminadas;

    while (nuevasFilas.length < this._board.largo) {
      nuevasFilas.unshift(Array.from({ length: this._board.ancho }, () => new _Cell()));
    }

    this._board.celdas.splice(0, this._board.largo, ...nuevasFilas);
  }

  // Verificar fin del juego
  private checkGameOver(): void {
    if (this._completedLines >= this._maxLines) this._gameOver = true; 
  }

  // Validar si la pieza cabe en el tablero
  private canPlace(pieza: _PiezaBase): boolean {
    return pieza.forma.every((fila, y) =>
      fila.every((valor, x) =>
        valor === 0 || (
          pieza.posX + x >= 0 &&
          pieza.posX + x < this._board.ancho &&
          pieza.posY + y >= 0 &&
          pieza.posY + y < this._board.largo &&
          this._board.obtenerCelda(pieza.posX + x, pieza.posY + y) !== undefined &&
          !this._board.obtenerCelda(pieza.posX + x, pieza.posY + y)!.ocupado
        )
      )
    );
  }
}