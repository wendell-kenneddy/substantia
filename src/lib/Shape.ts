export class Shape {
  private color: string;
  private url: string;
  public element: HTMLElement;
  private size: number;

  public constructor(color: string, url: string, size: number) {
    this.color = color;
    this.url = url;
    this.element = document.createElement("div");
    this.size = size;
    this.element.style.width = `${this.size}px`;
    this.element.style.height = `${this.size}px`;
    this.element.style.backgroundImage = `url(${this.url})`;
    this.element.style.backgroundSize = "cover";
    this.element.style.backgroundPosition = "center";
    this.element.style.backgroundRepeat = "no-repeat";
    this.element.style.margin = "1rem"; //16px
  }

  public setGridPosition(col: number, row: number): void {
    this.element.style.gridColumnStart = String(col);
    this.element.style.gridRowStart = String(row);
  }
}
