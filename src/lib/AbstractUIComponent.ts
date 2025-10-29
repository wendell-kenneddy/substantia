import type { Action } from "./Action";
import type { EventType } from "./types";

export abstract class AbstractUIComponent {
  protected readonly _id: string;
  protected HTMLElement: HTMLElement | null;
  protected actions: Action[] = [];
  protected observedEvents: EventType[] = [];

  constructor(id: string) {
    const HTMLElement: HTMLElement | null = document.getElementById(id);

    this._id = id;
    this.HTMLElement = HTMLElement;
  }

  public get id(): string {
    return this._id;
  }

  public abstract updateDisplayValue(value: unknown): void;

  public show(): void {
    this.HTMLElement?.classList.remove("hidden");
  }

  public hide(): void {
    this.HTMLElement?.classList.add("hidden");
  }

  public get isHidden(): boolean {
    if (!this.HTMLElement) return true;
    return this.HTMLElement.classList.contains("hidden");
  }

  public appendChild(element: HTMLElement): void {
    this.HTMLElement?.appendChild(element);
  }

  public appendSelf(target: AbstractUIComponent): void {
    if (!this.HTMLElement) return;
    target.appendChild(this.HTMLElement);
  }

  public destroy(): void {
    this.removeEventListeners();
    this.actions = [];
    this.observedEvents = [];
    this.HTMLElement?.remove();
  }

  public attachAction(action: Action): void {
    if (!this.observedEvents.includes(action.triggerEvent)) {
      this.observedEvents.push(action.triggerEvent);
      this.HTMLElement?.addEventListener(action.triggerEvent, (e) => this.runActions(e));
    }

    this.actions.push(action);
  }

  private runActions(event: Event): void {
    this.actions.forEach((action) => {
      if (action.triggerEvent === event.type) action.run(event);
    });
  }

  private removeEventListeners() {
    this.observedEvents.forEach((o) =>
      this.HTMLElement?.removeEventListener(o, (e) => this.runActions(e))
    );
  }
}
