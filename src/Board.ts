export class Cell {
    clear() {
        throw new Error('Method not implemented.');
    }
    occupy() {
        throw new Error('Method not implemented.');
    }
    occupied(occupied: any) {
        throw new Error('Method not implemented.');
    }
}

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