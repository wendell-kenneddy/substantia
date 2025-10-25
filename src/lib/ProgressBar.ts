import { UIComponent } from "./UIComponent";

export class ProgressBar extends UIComponent {
  private _maxValue: number;
  private _currentValue: number;

  constructor(id: string, maxValue: number, initialValue: number) {
    super(id);
    this._maxValue = maxValue;
    this._currentValue = initialValue;
    this.updateElementWidth();
  }

  public get currentValue(): number {
    return this._currentValue;
  }

  public get maxValue(): number {
    return this._maxValue;
  }

  public set currentValue(value: number) {
    if (value > this._maxValue)
      throw new Error("Progress Bar current value can't exceed max value.");

    this._currentValue = value;
    this.updateElementWidth();
  }

  private updateElementWidth(): void {
    const element = this.HTMLElement;
    if (!element) return;
    const width = Math.floor((this._currentValue / this._maxValue) * 100);
    element.style.width = `${width}%`;
  }
}
