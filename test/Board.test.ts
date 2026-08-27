import { describe, expect, test } from "vitest";
import { _Board } from "../src/Board";

describe("_Board", () => {
  test("el tablero se crea con celdas vacías", () => {
    const tablero = new _Board(10, 20);

    expect(tablero.obtenerCelda(0, 0).ocupado).toBe(false);
    expect(tablero.obtenerCelda(9, 19).ocupado).toBe(false);
  });

  test("se puede ocupar y liberar una celda del tablero", () => {
    const tablero = new _Board(10, 20);
    const celda = tablero.obtenerCelda(0, 0);

    celda.ocupar();
    expect(celda.ocupado).toBe(true);

    celda.liberar();
    expect(celda.ocupado).toBe(false);
  });

  test("ancho y largo se asignan correctamente desde el constructor", () => {
    const tablero = new _Board(5, 8);
    expect(tablero.ancho).toBe(5);
    expect(tablero.largo).toBe(8);
  });

  test("el setter de ancho funciona con valores válidos", () => {
    const tablero = new _Board(5, 8);
    tablero.ancho = 12;
    expect(tablero.ancho).toBe(12);
  });

  test("el setter de largo funciona con valores válidos", () => {
    const tablero = new _Board(5, 8);
    tablero.largo = 15;
    expect(tablero.largo).toBe(15);
  });

  test("el setter de ancho no cambia si el valor es inválido", () => {
    const tablero = new _Board(5, 8);
    tablero.ancho = -3; // debería ignorar
    expect(tablero.ancho).toBe(5);
  });

  test("el setter de largo no cambia si el valor es inválido", () => {
    const tablero = new _Board(5, 8);
    tablero.largo = 0; // debería ignorar
    expect(tablero.largo).toBe(8);
  });

  test("obtenerCelda devuelve la celda correcta y refleja cambios", () => {
    const tablero = new _Board(5, 8);
    const celda = tablero.obtenerCelda(2, 3);

    expect(celda.ocupado).toBe(false);

    celda.ocupar();
    expect(tablero.obtenerCelda(2, 3).ocupado).toBe(true);
  });
});