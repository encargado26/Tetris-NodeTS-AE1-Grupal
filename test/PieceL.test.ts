import { describe, expect, test } from "vitest";
import { _PiezaL } from "../src/PieceL";

describe("_PiezaL", () => {

  test("se crea con posición inicial y forma L", () => {
    const pieza = new _PiezaL();

    expect(pieza.posX).toBe(0);
    expect(pieza.posY).toBe(0);

    expect(pieza.forma).toEqual([
      [1, 0],
      [1, 0],
      [1, 1]
    ]);
  });

  test("los setters de posX y posY funcionan", () => {
    const pieza = new _PiezaL();

    pieza.posX = 7;
    pieza.posY = 3;

    expect(pieza.posX).toBe(7);
    expect(pieza.posY).toBe(3);
  });

  test("el setter de forma funciona", () => {
    const pieza = new _PiezaL();

    const nuevaForma = [
      [1, 0],
      [1, 1]
    ];

    pieza.forma = nuevaForma;

    expect(pieza.forma).toEqual(nuevaForma);
  });

  test("se mueve correctamente", () => {
    const pieza = new _PiezaL(5, 5);

    pieza.moverIzquierda();
    expect(pieza.posX).toBe(4);

    pieza.moverDerecha();
    expect(pieza.posX).toBe(5);

    pieza.moverAbajo();
    expect(pieza.posY).toBe(6);
  });

  test("rota 90° en sentido horario", () => {
    const pieza = new _PiezaL();

    pieza.rotate();

    expect(pieza.forma).toEqual([
      [1, 1, 1],
      [1, 0, 0]
    ]);
  });

});