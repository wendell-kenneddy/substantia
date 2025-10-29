import type { AbstractUIComponent } from "./AbstractUIComponent";
import type { UIComponent } from "./UIComponent";

export class UIManager {
  private UIComponents: AbstractUIComponent[] = [];

  constructor() {}

  public registerComponent(component: AbstractUIComponent): void {
    if (!!this.UIComponents.find((c) => c.id == component.id))
      throw new Error("Component already registered.");

    this.UIComponents.push(component);
  }

  public unregisterComponent(component: AbstractUIComponent): void {
    this.UIComponents = this.UIComponents.filter((c) => c.id != component.id);
  }

  public getComponentById(id: string): AbstractUIComponent {
    const component: UIComponent | undefined = this.UIComponents.find((c) => c.id === id);
    if (!component) throw new Error("Component not found.");
    return component;
  }

  public getAllComponents(): AbstractUIComponent[] {
    return this.UIComponents;
  }
}
