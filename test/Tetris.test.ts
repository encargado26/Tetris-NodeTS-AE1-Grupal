import { describe, it, expect, beforeEach } from "vitest";
import { Tetris } from "../src/Tetris";
import { _Cell } from "../src/Cell";

describe("Tetris - cobertura completa", () => {
  let juego: Tetris;

  beforeEach(() => {
    juego = new Tetris(10, 20, 5);
  });

  // spawnPiece 
  it("spawnPiece debe crear una pieza en la primera fila", () => {
    juego.spawnPiece();
    expect(juego.piezaActual).not.toBeNull();
    expect(juego.piezaActual!.posY).toBe(0);
  });

  it("spawnPiece termina el juego si la primera fila está ocupada", () => {
    juego["_board"].celdas[0] = Array.from({ length: juego["_board"].ancho }, () => {
      const celda = new _Cell();
      celda.ocupar();
      return celda;
    });
    juego.spawnPiece();
    expect(juego.gameOver).toBe(true);
  });

  // tick 
  it("tick debe bajar la pieza una posición", () => {
    juego.spawnPiece();
    const yInicial = juego.piezaActual!.posY;
    juego.tick();
    expect(juego.piezaActual!.posY).toBe(yInicial + 1);
  });

  it("tick bloquea pieza cuando no puede bajar", () => {
    juego.spawnPiece();
    juego.piezaActual!.posY = juego["_board"].largo - 2;
    juego.tick();
    expect(juego.piezaActual).not.toBeNull();
  });

  it("tick no hace nada si gameOver es true", () => {
    juego["_completedLines"] = 5;
    juego["checkGameOver"]();
    expect(juego.gameOver).toBe(true);
    const yAntes = juego.piezaActual ? juego.piezaActual.posY : 0;
    juego.tick();
    if (juego.piezaActual) {
      expect(juego.piezaActual.posY).toBe(yAntes);
    }
  });

  it("tick no hace nada si no hay piezaActual", () => {
    juego.tick();
    expect(juego.piezaActual).toBeNull();
    expect(juego.gameOver).toBe(false);
  });

  it("tick llama a handleLock cuando la pieza no cabe", () => {
    juego.spawnPiece();
    const pieza = juego.piezaActual!;
    let bloqueX = 0, bloqueY = 0;
    pieza.forma.some((fila, y) =>
      fila.some((valor, x) => {
        if (valor === 1) {
          bloqueX = x;
          bloqueY = y;
          return true;
        }
        return false;
      })
    );
    const celda = juego["_board"].obtenerCelda(pieza.posX + bloqueX, pieza.posY + bloqueY + 1);
    if (celda) celda.ocupar();
    juego.tick();
    expect(juego.piezaActual).not.toBeNull();
  });

  // movimientos
  it("moveLeft debe mover la pieza a la izquierda", () => {
    juego.spawnPiece();
    const xInicial = juego.piezaActual!.posX;
    juego.moveLeft();
    expect(juego.piezaActual!.posX).toBe(xInicial - 1);
  });

  it("moveRight debe mover la pieza a la derecha", () => {
    juego.spawnPiece();
    const xInicial = juego.piezaActual!.posX;
    juego.moveRight();
    expect(juego.piezaActual!.posX).toBe(xInicial + 1);
  });

  it("rotate debe cambiar la forma de la pieza si corresponde", () => {
    juego.spawnPiece();
    const formaInicial = JSON.stringify(juego.piezaActual!.forma);
    juego.rotate();
    const formaRotada = JSON.stringify(juego.piezaActual!.forma);

    if (formaInicial === "[[1,1],[1,1]]") {
      expect(formaRotada).toBe(formaInicial);
    } else {
      expect(formaRotada).not.toBe(formaInicial);
    }
  });

  it("rotate revierte si la pieza no cabe", () => {
    juego.spawnPiece();
    juego.piezaActual!.posX = -5;
    const formaInicial = JSON.stringify(juego.piezaActual!.forma);
    juego.rotate();
    expect(JSON.stringify(juego.piezaActual!.forma)).toBe(formaInicial);
  });

  // ramas true (sin pieza)
  it("moveLeft no rompe si no hay piezaActual", () => {
    expect(() => juego.moveLeft()).not.toThrow();
  });

  it("moveRight no rompe si no hay piezaActual", () => {
    expect(() => juego.moveRight()).not.toThrow();
  });

  it("rotate no rompe si no hay piezaActual", () => {
    expect(() => juego.rotate()).not.toThrow();
  });

  it("lockPiece no hace nada si no hay piezaActual", () => {
    expect(juego.piezaActual).toBeNull();
    expect(() => juego["lockPiece"]()).not.toThrow();
    expect(juego.piezaActual).toBeNull();
  });

  // ramas false (con pieza)
  it("moveLeft ejecuta bloque interno si hay piezaActual", () => {
    juego.spawnPiece();
    const xInicial = juego.piezaActual!.posX;
    juego.moveLeft();
    expect(juego.piezaActual!.posX).toBe(xInicial - 1);
  });

  it("moveRight ejecuta bloque interno si hay piezaActual", () => {
    juego.spawnPiece();
    const xInicial = juego.piezaActual!.posX;
    juego.moveRight();
    expect(juego.piezaActual!.posX).toBe(xInicial + 1);
  });

  it("lockPiece ocupa celdas si hay piezaActual", () => {
    juego.spawnPiece();
    juego.piezaActual!.posY = 0;
    juego["lockPiece"]();
    const algunaOcupada = juego["_board"].celdas.some(fila => fila.some(c => c.ocupado));
    expect(algunaOcupada).toBe(true);
  });

  // bloquea pieza, limpia líneas y genera nueva
  it("handleLock bloquea pieza, limpia líneas y genera nueva", () => {
    juego.spawnPiece();
    juego.piezaActual!.posY = juego["_board"].largo - 2;
    juego["handleLock"]();
    expect(juego.piezaActual).not.toBeNull();
  });

  // Eliminar líneas
  it("clearLines debe eliminar una fila completa", () => {
    juego["_board"].celdas[19] = Array.from({ length: juego["_board"].ancho }, () => {
      const celda = new _Cell();
      celda.ocupar();
      return celda;
    });
    juego["clearLines"]();
    const ultimaFilaOcupada = juego["_board"].celdas[19].every(c => c.ocupado);
    expect(ultimaFilaOcupada).toBe(false);
    expect(juego["_completedLines"]).toBe(1);
  });

  it("clearLines elimina múltiples filas completas", () => {
    for (let y = 18; y < 20; y++) {
      juego["_board"].celdas[y] = Array.from({ length: juego["_board"].ancho }, () => {
        const celda = new _Cell();
        celda.ocupar();
        return celda;
      });
    }
    juego["clearLines"]();
    expect(juego["_completedLines"]).toBe(2);
  });

  // verificar GameOver 
  it("checkGameOver debe terminar el juego al alcanzar maxLines", () => {
    juego["_completedLines"] = 5;
    juego["checkGameOver"]();
    expect(juego.gameOver).toBe(true);
  });

  // canPlace
  it("canPlace devuelve false si la pieza está fuera del tablero", () => {
    juego.spawnPiece();
    juego.piezaActual!.posX = -5;
    expect(juego["canPlace"](juego.piezaActual!)).toBe(false);
  });

  it("canPlace devuelve false si la celda está ocupada", () => {
    juego.spawnPiece();
    const pieza = juego.piezaActual!;
    let bloqueX = 0, bloqueY = 0;
    pieza.forma.some((fila, y) =>
      fila.some((valor, x) => {
        if (valor === 1) {
          bloqueX = x;
          bloqueY = y;
          return true;
        }
        return false;
      })
    );
    const celda = juego["_board"].obtenerCelda(pieza.posX + bloqueX, pieza.posY + bloqueY);
    if (celda) celda.ocupar();
    expect(juego["canPlace"](pieza)).toBe(false);
  });

  it("canPlace devuelve true si la pieza cabe en el tablero", () => {
    juego.spawnPiece();
    expect(juego["canPlace"](juego.piezaActual!)).toBe(true);
  });

    // moveLeft (izquierda) con piezaActual presente (cubre rama false línea 62) 
  it("moveLeft entra al bloque interno si hay piezaActual", () => {
    juego.spawnPiece();
    const xInicial = juego.piezaActual!.posX;
    juego.moveLeft(); // entra al else del if
    expect(juego.piezaActual!.posX).toBeLessThanOrEqual(xInicial);
  });

  // moveRight (derecha) con piezaActual presente (cubre rama false línea 68)
  it("moveRight entra al bloque interno si hay piezaActual", () => {
    juego.spawnPiece();
    const xInicial = juego.piezaActual!.posX;
    juego.moveRight();
    expect(juego.piezaActual!.posX).toBeGreaterThanOrEqual(xInicial);
  });

  // lockPiece (bloquear pieza) con piezaActual presente (cubre rama false línea 88)
  it("Bloquear Pieza entra al bloque interno si hay piezaActual", () => {
    juego.spawnPiece();
    juego.piezaActual!.posY = 0;
    juego["lockPiece"]();
    const algunaOcupada = juego["_board"].celdas.some(fila => fila.some(c => c.ocupado));
    expect(algunaOcupada).toBe(true);
  });
});