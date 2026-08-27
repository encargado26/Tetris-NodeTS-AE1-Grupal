import { describe, expect, test } from "vitest";
import { Tetris } from "../src/Tetris";
import { _PiezaT } from "../src/PieceT";

describe("Tetris", () => {
  test("se crea con tablero vacío", () => {
    const juego = new Tetris();
    expect(juego.board.ancho).toBe(10);
    expect(juego.board.largo).toBe(20);
    expect(juego.piezaActual).toBeNull();
  });

  test("puede generar una nueva pieza T", () => {
    const juego = new Tetris();
    juego.nuevaPieza();
    expect(juego.piezaActual).toBeInstanceOf(_PiezaT);
    expect(juego.piezaActual?.posY).toBe(0);
  });

  test("la pieza T se mueve hacia abajo", () => {
    const juego = new Tetris();
    juego.nuevaPieza();
    juego.moverAbajo();
    expect(juego.piezaActual?.posY).toBe(1);
  });

  test("la pieza T se mueve a la izquierda y derecha", () => {
    const juego = new Tetris();
    juego.nuevaPieza();
    const pieza = juego.piezaActual!;
    const posInicial = pieza.posX;

    juego.moverIzquierda();
    expect(pieza.posX).toBe(posInicial - 1);

    juego.moverDerecha();
    expect(pieza.posX).toBe(posInicial);
  });
});