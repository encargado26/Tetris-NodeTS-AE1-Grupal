import { PieceBase } from "./PieceBase";

export class PieceT extends PieceBase {

  constructor(x: number = 0, y: number = 0) {
    super(
      [
        [1, 1, 1],
        [0, 1, 0]
      ],
      x,
      y
    );
  }
}