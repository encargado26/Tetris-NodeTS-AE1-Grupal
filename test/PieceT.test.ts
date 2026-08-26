// tests/PieceT.test.ts
import { describe, expect, test } from "vitest";
import { PieceT } from "../src/PieceT";

describe("PieceT", () => {
  test("se crea en la posicion inicial y forma la T", () => {
    const piece = new PieceT();
    expect(piece.x).toBe(0);
    expect(piece.y).toBe(0);
    expect(piece.shape).toEqual([
      [1, 1, 1],
      [0, 1, 0]
    ]);
  });

  test("se mueve correctamente", () => {
    const piece = new PieceT(5, 5);
    piece.moveLeft();
    expect(piece.x).toBe(4);

    piece.moveRight();
    expect(piece.x).toBe(5);

    piece.moveDown();
    expect(piece.y).toBe(6);
  });

  test("rota 90° en sentido horario", () => {
    const piece = new PieceT();
    piece.rotate();
    expect(piece.shape).toEqual([
      [0, 1],
      [1, 1],
      [0, 1]
    ]);
  });
});