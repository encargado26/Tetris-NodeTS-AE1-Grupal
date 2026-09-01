import { describe, expect, test } from "vitest";
import { _Reloj } from "../src/Clock";

describe("_Reloj", () => {

  test("se crea con cero ticks", () => {
    const reloj = new _Reloj();

    expect(reloj.ticks).toBe(0);
  });

  test("tick aumenta el contador en uno", () => {
    const reloj = new _Reloj();

    reloj.tick();

    expect(reloj.ticks).toBe(1);
  });

  test("cada tick aumenta el contador en uno", () => {
    const reloj = new _Reloj();

    reloj.tick();
    reloj.tick();
    reloj.tick();

    expect(reloj.ticks).toBe(3);
  });
});