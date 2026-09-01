import { _PiezaBase } from "./PieceBase";

export class _PiezaStick extends _PiezaBase {

  constructor(posX: number = 0, posY: number = 0) {
    super(
      [
        [1],
        [1],
        [1],
        [1]
      ],
      posX,
      posY
    );
  }
}