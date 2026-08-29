import { IRotator } from "./IRotator";
export abstract class _PiezaBase implements IRotator {
  private _posX: number;
  private _posY: number;
  private _forma: number[][];

  constructor(forma: number[][], posX: number = 0, posY: number = 0) {
    this._forma = forma;
    this._posX = posX;
    this._posY = posY;
  }

  // Getters y setters
  get posX(): number {
    return this._posX;
  }

  set posX(valor: number) {
    this._posX = valor;
  }

  get posY(): number {
    return this._posY;
  }

  set posY(valor: number) {
    this._posY = valor;
  }

  get forma(): number[][] {
    return this._forma;
  }

  set forma(valor: number[][]) {
    this._forma = valor;
  }

  // Métodos de movimiento
  moverIzquierda(): void {
    this._posX -= 1;
  }

  moverDerecha(): void {
    this._posX += 1;
  }

  moverAbajo(): void {
    this._posY += 1;
  }

  // Rotación 90° en sentido horario
  rotate(): void {
    this._forma = this._forma[0].map((_, i) =>
      this._forma.map(fila => fila[i]).reverse()
    );
  }
}