import { Cell } from './Cell';

export class Board {
    public width: number;
    public height: number; 
    public cells: Cell[][]; 

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.cells = Array.from({ length: height }, () => Array.from({ length: width }, () => new Cell())); 
        
    }
}