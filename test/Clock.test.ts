import { describe, expect, test } from "vitest";
import { _Clock } from "../src/Clock";

describe("_Clock", () => {

  test("se crea con cero ticks", () => {
    const clock = new _Clock();

    expect(clock.ticks).toBe(0);
  });

  test("tick aumenta el contador en uno", () => {
    const clock = new _Clock();

    clock.tick();

    expect(clock.ticks).toBe(1);
  });

  test("cada tick aumenta el contador en uno", () => {
    const clock = new _Clock();

    clock.tick();
    clock.tick();
    clock.tick();

    expect(clock.ticks).toBe(3);
  });

});