import type { Action } from "./Action";
import type { EventType } from "./types";

export class UIComponent {
  private readonly _id: string;
  private readonly HTMLElement: HTMLElement;
  private readonly actions: Action[] = [];
  private readonly observedEvents: EventType[] = [];

  constructor(id: string) {
    const HTMLElement: HTMLElement | null = document.getElementById(id);
    if (!HTMLElement) throw new Error("Element not found.");

    this._id = id;
    this.HTMLElement = HTMLElement;
  }

  public get id(): string {
    return this._id;
  }

  public show(): void {
    this.HTMLElement.classList.remove("hidden");
  }

  public hide(): void {
    this.HTMLElement.classList.add("hidden");
  }

  public get isHidden(): boolean {
    return this.HTMLElement.classList.contains("hidden");
  }

  public destroy(): void {
    this.removeEventListeners();
    this.HTMLElement.remove();
  }

  public attachAction(action: Action): void {
    if (!this.observedEvents.includes(action.triggerEvent)) {
      this.observedEvents.push(action.triggerEvent);
    }

    this.HTMLElement.addEventListener(action.triggerEvent, (e) => this.runActions(e));
    this.actions.push(action);
  }

  private runActions(event: Event): void {
    this.actions.forEach((action) => {
      if (action.triggerEvent === event.type) action.run(event);
    });
  }

  private removeEventListeners() {
    this.observedEvents.forEach((o) =>
      this.HTMLElement.removeEventListener(o, (e) => this.runActions(e))
    );
  }
}
