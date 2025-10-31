import { AbstractUIComponent } from "./AbstractUIComponent";
import { type Informations } from "./config";
import { type ShapeContainers } from "./config";
import { ENTITY_SHAPE_TRANSLATIONS } from "./config";
import { ENTITY_COLOR_TRANSLATIONS } from "./config";

export class Page extends AbstractUIComponent {
  private _informations: Informations[] = [];
  private _containers: ShapeContainers[] = [];

  public updateDisplayValue(value: string): void {
    if (!this.HTMLElement) return;
    this.HTMLElement.innerText = value;
  }

  public createShapeContainer(container_class: string, shape: string, color: string): void {
    const container: HTMLElement = document.createElement("div");
    container.classList.add(container_class);
    const title: HTMLElement = document.createElement("h2");
    title.classList.add("title");
    title.innerText = ENTITY_SHAPE_TRANSLATIONS[shape as "cube" | "pyramid" | "sphere"];
    container.append(title);
    const informations = { shape: shape, colors: { [color]: 1 } };
    this._informations.push(informations);
    this._containers.push({ shape: shape, container: container });
    this.showColors(shape);
    this.appendChild(container);
  }

  public childQuantity(): number {
    return this._containers.length;
  }

  public showColors(shape: string): void {
    this._containers.forEach((c) => {
      if (c.shape === shape) {
        this._informations.forEach((b) => {
          if (b.shape === shape) {
            Object.entries(b.colors).forEach(([color, value]) => {
              let exist = false;
              if (c.container.querySelectorAll("p").length > 0) {
                c.container.querySelectorAll("p").forEach((d) => {
                  if ((d.textContent ?? "").includes(ENTITY_COLOR_TRANSLATIONS[color as "red" | "green" | "blue" | "pink" | "yellow"])) {
                    d.innerText = `${value} ${ENTITY_COLOR_TRANSLATIONS[color as "red" | "green" | "blue" | "pink" | "yellow"]}`;
                    exist = true;
                  }
                });
              }

              if (c.container.querySelectorAll("p").length == 0 || exist === false) {
                const colorP: HTMLElement = document.createElement("p");
                colorP.classList.add(color);
                colorP.classList.add("p-color");
                colorP.innerText = `${value} ${ENTITY_COLOR_TRANSLATIONS[color as "red" | "green" | "blue" | "pink" | "yellow"]}`;
                c.container.appendChild(colorP);
              }
            });
          }
        });
      }
    });
  }

  public addColorCount(shape: string, color: string): void {
    this._informations.forEach((c) => {
      if (c.shape === shape) {
        if (color in c.colors) {
          c.colors[color] += 1;
        } else {
          c.colors[color] = 1;
        }
      }

      this.showColors(shape);
    });
  }

  public verifyContainer(shape: string): boolean {
    let exist: boolean = false;
    this._containers.forEach((c) => {
      if (c.shape === shape) {
        exist = true;
      }
    });
    return exist;
  }

  public reset(): void {
    this.updateDisplayValue("");
    this._containers = [];
    this._informations = [];
  }
}
