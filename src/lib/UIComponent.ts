import { AbstractUIComponent } from "./AbstractUIComponent";

export class UIComponent extends AbstractUIComponent {
  constructor(id: string) {
    super(id);
  }

  public updateDisplayValue(value: string): void {
    if (!this.HTMLElement) return;
    this.HTMLElement.innerText = value;
  }
}
