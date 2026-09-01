export class _Reloj {

  private _ticks: number;

  constructor() {
    this._ticks = 0;
  }

  get ticks(): number {
    return this._ticks;
  }

  tick(): void {
    this._ticks += 1;
  }
}