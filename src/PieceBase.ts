import {IRotator} from "./IRotator";

export abstract class PieceBase implements IRotator {
    public x: number;
    public y: number;
    public shape: number[][];

    constructor(shape: number[][], x: number = 0, y: number = 0) {
        this.shape = shape;
        this.x = x;
        this.y = y
    }

    moveLeft(): void {
    this.x -= 1;
  }

  moveRight(): void {
    this.x += 1;
  }

  moveDown(): void {
    this.y += 1;
  }

  rotate(): void {
    // rotación 90° en sentido horario
    this.shape = this.shape[0].map((_, i) =>
      this.shape.map(row => row[i]).reverse()
    );
  }
}