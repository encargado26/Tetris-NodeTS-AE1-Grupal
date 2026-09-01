import { describe, expect, test } from "vitest";
import { _Cell } from "../src/Cell";

describe("_Celda", () => {
  
  test("la celda se crea vacía", () => {
    const celda = new _Cell();
    expect(celda.ocupado).toBe(false);
  });

  test("se puede ocupar la celda", () => {
    const celda = new _Cell();
    celda.ocupar();
    expect(celda.ocupado).toBe(true);
  });

  test("se puede liberar la celda", () => {
    const celda = new _Cell();
    celda.ocupar();
    celda.liberar();
    expect(celda.ocupado).toBe(false);
  });

  test("se puede asignar ocupado con el setter", () => {
    const celda = new _Cell();
    celda.ocupado = true;
    expect(celda.ocupado).toBe(true);
  });
});