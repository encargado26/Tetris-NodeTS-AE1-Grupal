import { PieceBase } from "./PieceBase";

export class PieceSquare extends PieceBase {
  constructor(x: number = 0, y: number = 0) {
    super(
      [
        [1, 1],
        [1, 1]
      ],
      x,
      y
    );
  }
}