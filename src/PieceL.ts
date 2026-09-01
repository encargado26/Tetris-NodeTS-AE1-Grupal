import { _PiezaBase } from "./PieceBase";

export class _PiezaL extends _PiezaBase {

  constructor(posX: number = 0, posY: number = 0) {
    super(
      [
        [1, 0],
        [1, 0],
        [1, 1]
      ],
      posX,
      posY
    );
  }
}