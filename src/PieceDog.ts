import { _PiezaBase } from "./PieceBase";

export class _PiezaDog extends _PiezaBase {

  constructor(posX: number = 0, posY: number = 0) {
    super(
      [
        [0, 1, 1],
        [1, 1, 0]
      ],
      posX,
      posY
    );
  }
}