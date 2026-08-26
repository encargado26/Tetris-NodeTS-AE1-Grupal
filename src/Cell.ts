export class Cell {
    public occupied: boolean;

    constructor() {
        this.occupied = false;
    }

    occupy(): void {
        this.occupied = true;
    }

    clear(): void {
        this.occupied = false;
    }
}