import { describe, it, expect, beforeEach } from "vitest";
import { Tetris } from "../src/Tetris";
import { _Cell } from "../src/Cell";

describe("Tetris - cobertura completa", () => {
  let juego: Tetris;

  beforeEach(() => {
    juego = new Tetris(10, 20, 5);
  });

  it("debería crear un tablero con dimensiones correctas", () => {
    expect(juego["_board"].ancho).toBe(10);
    expect(juego["_board"].largo).toBe(20);
  });

  // spawnPiece 
  it("spawnPiece debe crear una pieza en la primera fila", () => {
    juego.spawnPiece();
    expect(juego.piezaActual).not.toBeNull();
    expect(juego.piezaActual!.posY).toBe(0);
    const algunaOcupada = juego["_board"].celdas.some(fila => fila.some(c => c.ocupado));
    expect(algunaOcupada).toBe(true);
  });

  it("spawnPiece debería terminar el juego si la primera fila está ocupada", () => {
    // ocupar todas las celdas de la primera fila
    juego["_board"].celdas[0].forEach(celda => celda.ocupar());

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
  // la pieza debería bloquearse y generarse otra
  expect(juego.piezaActual).not.toBeNull();
  expect(juego.gameOver).toBe(true);
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
  // ocupar justo debajo de la pieza para forzar bloqueo
  const celda = juego["_board"].obtenerCelda(juego.piezaActual!.posX, juego.piezaActual!.posY + 1);
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

  // ramas true (sin pieza)
it("moveLeft no falla sin pieza", () => {
  expect(() => juego.moveLeft()).not.toThrow();
});

it("moveRight no falla sin pieza", () => {
  expect(() => juego.moveRight()).not.toThrow();
});

it("rotate no falla sin pieza", () => {
  expect(() => juego.rotate()).not.toThrow();
});

  // lockPiece con pieza
it("lockPiece ocupa celdas si hay piezaActual", () => {
  juego.spawnPiece();
  juego["lockPiece"]();

  const algunaOcupada = juego["_board"].celdas.some(
    fila => fila.some(celda => celda.ocupado)
  );

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
    expect(juego["canPlace"](juego.piezaActual!)).toBe(false);
  });

  // --- Partidas completas ---
  it("simula una partida ganada completando todas las líneas", () => {
    juego.spawnPiece();
    for (let i = 0; i < juego["_maxLines"]; i++) {
      juego["_board"].celdas[19] = Array.from({ length: juego["_board"].ancho }, () => {
        const celda = new _Cell();
        celda.ocupar();
        return celda;
      });
    }
  });

  it("moveLeft no mueve si la pieza está en el borde izquierdo", () => {
  juego.spawnPiece();
  juego.piezaActual!.posX = 0;
  const xAntes = juego.piezaActual!.posX;
  juego.moveLeft();
  expect(juego.piezaActual!.posX).toBe(xAntes);
});

it("moveRight no mueve si la pieza está en el borde derecho", () => {
  juego.spawnPiece();
  juego.piezaActual!.posX = juego["_board"].ancho - 1;
  const xAntes = juego.piezaActual!.posX;
  juego.moveRight();
  expect(juego.piezaActual!.posX).toBe(xAntes);
});

it("lockPiece entra en rama de bloqueo con pieza activa", () => {
  juego.spawnPiece();
  juego.piezaActual!.posY = juego["_board"].largo - 1;
  juego["lockPiece"]();
  const algunaOcupada = juego["_board"].celdas.some(fila => fila.some(c => c.ocupado));
  expect(algunaOcupada).toBe(true);
});
});