import { describe, expect, test } from 'vitest';
import { Cell } from '../src/Cell';

describe('Cell', () => {
    test('Una Nueva Celda esta Vacia', () => {
        const cell = new Cell();
        expect(cell.occupied).toBe(false);
    });

    test('Se puede Ocupar una Celda', () => {
        const cell = new Cell();
        cell.occupy();
        expect(cell.occupied).toBe(true);
    });

    test('Se puede Liberar una Celda', () => {
        const cell = new Cell();
        cell.occupy();
        cell.clear();
        expect(cell.occupied).toBe(false);
    });
});