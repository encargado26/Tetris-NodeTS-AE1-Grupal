import { describe, expect, test } from 'vitest';
import { Board } from '../src/Board';

describe('Board', () => {
    test('El Tablero se Crea con Celdas Vacias', () => {
        const board = new Board(10,20);
        // primera celda
        expect(board.cells[0][0].occupied).toBe(false);
        // ultima celda
        expect(board.cells[19][9].occupied).toBe(false);
    });

    test('Se puede Ocupar una Celda del Tablero', () => {
        const board = new Board(10,20);
        board.cells[0][0].occupy();
        expect(board.cells[0][0].occupied).toBe(true);
    });

    test('Se puede Liberar una Celda del Tablero', () => {
        const board = new Board(10,20);
        board.cells[0][0].occupy();
        board.cells[0][0].clear();
        expect(board.cells[0][0].occupied).toBe(false);
    });
});