export class cell {
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