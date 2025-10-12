import type { UIComponent } from "./UIComponent";

export class UIManager {
  private readonly UIComponents: UIComponent[] = [];

  constructor() {}

  public registerComponent(component: UIComponent): void {
    if (!!this.UIComponents.find((c) => c.id == component.id))
      throw new Error("Component already registered.");

    this.UIComponents.push(component);
  }

  public getComponentById(id: string): UIComponent {
    const component: UIComponent | undefined = this.UIComponents.find((c) => c.id === id);
    if (!component) throw new Error("Component not fouund.");
    return component;
  }
}
