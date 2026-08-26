import { describe, expect, test } from "vitest";
import { PieceSquare } from "../src/PieceSquare";

describe("PieceSquare", () => {
  test("se crea con forma cuadrada y posición inicial", () => {
    const piece = new PieceSquare();
    expect(piece.x).toBe(0);
    expect(piece.y).toBe(0);
    expect(piece.shape).toEqual([
      [1, 1],
      [1, 1]
    ]);
  });

  test("siempre tiene 4 bloques", () => {
    const piece = new PieceSquare();
    const countBlocks = piece.shape.flat().filter(v => v === 1).length;
    expect(countBlocks).toBe(4);

    piece.rotate(); // aunque rote, sigue igual
    expect(piece.shape).toEqual([
      [1, 1],
      [1, 1]
    ]);
  });
});