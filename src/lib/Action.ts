import type { EventType } from "./types";

export class Action {
  private readonly _triggerEvent: EventType;
  private readonly runnable: (e: Event) => void;

  constructor(triggerEvent: EventType, runnable: (e: Event) => void) {
    this._triggerEvent = triggerEvent;
    this.runnable = runnable;
  }

  public run(e: Event): void {
    this.runnable(e);
  }

  public get triggerEvent(): EventType {
    return this._triggerEvent;
  }
}
