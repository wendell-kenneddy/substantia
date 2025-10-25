import type { EntityColor, EntityShape } from "./config";
import { UIComponent } from "./UIComponent";

export class Entity extends UIComponent {
  private _revealed: boolean = false;
  private _color: EntityColor;
  private _shape: EntityShape;
  private _position: [number, number];

  constructor(id: string, position: [number, number], color: EntityColor, shape: EntityShape) {
    super(id);
    this._position = position;
    this._color = color;
    this._shape = shape;
    this.createHTMLElement();
    this.addEntityStyles();
    this.addUnknownEntityStyles();
  }

  public get revealed(): boolean {
    return this._revealed;
  }

  public reveal(): void {
    if (this._revealed) return;

    const element: HTMLElement = this.HTMLElement as HTMLElement;
    element.classList.remove("entity-unknown-shape");
    element.classList.add("entity-shape", this._color, this._shape);

    this._revealed = true;
  }

  private addEntityStyles(): void {
    if (!this.HTMLElement) return;
    this.HTMLElement.classList.add("entity");
    this.HTMLElement.style.gridColumnStart = this._position[0].toString();
    this.HTMLElement.style.gridRowStart = this._position[1].toString();
  }

  private addUnknownEntityStyles(): void {
    this.HTMLElement?.classList.add("entity-unknown-shape");
  }

  private createHTMLElement(): void {
    const element: HTMLElement = document.createElement("div");
    element.id = this._id;
    this.HTMLElement = element;
  }
}
