export class Shape {

  public element: HTMLElement;
  public shapeElement: HTMLElement;

  public constructor() {
    this.element = document.createElement("div");
    this.element.style.margin = "1rem"; //16px
    this.element.classList.add("entity");
    this.shapeElement = document.createElement("div");
  }

  public setGridPosition(col: number, row: number): void {
    this.element.style.gridColumnStart = String(col);
    this.element.style.gridRowStart = String(row);
  }

  public setGeometry(geometry: string): void {
    this.shapeElement.classList.add("entity-unknown-shape", geometry)
    this.element.appendChild(this.shapeElement);
  }

  public setColor(color: string): void {
    this.shapeElement.classList.remove("entity-unknown-shape")
    this.shapeElement.classList.add("entity-shape", color)
  }
}
