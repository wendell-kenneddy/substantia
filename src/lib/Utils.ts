export class Utils {
  public static getEventTarget(e: Event): HTMLElement {
    const target: EventTarget | null = e.target;
    if (!target) throw new Error("No target identified.");
    return target as HTMLElement;
  }

  public static getRandomInteger(max: number): number {
    return Math.floor(Math.random() * (max + 1));
  }
}
