// src/_PiezaT.ts
import { _PiezaBase } from "./PieceBase";

export class _PiezaT extends _PiezaBase {
  constructor(posX: number = 0, posY: number = 0) {
    super(
      [
        [1, 1, 1],
        [0, 1, 0]
      ],
      posX,
      posY
    );
  }
}