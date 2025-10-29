import type { AbstractHypothesis } from "./AbstractHypothesis";
import { AbstractSelfCreatingUIComponent } from "./AbstractSelfCreatingUIComponent";
import type { AbstractUIComponent } from "./AbstractUIComponent";
import {
  ALL_ENTITY_COLORS,
  ENTITY_COLOR_TRANSLATIONS,
  ENTITY_SHAPE_TRANSLATIONS,
  type EntityShape
} from "./config";
import { Utils } from "./Utils";

export class HypothesesUIComponent extends AbstractSelfCreatingUIComponent {
  private _built: boolean = false;
  private _targetShape: EntityShape;
  private _allowedHypotheses: AbstractHypothesis[] = [];

  constructor(id: string, targetShape: EntityShape) {
    super(id);
    this._targetShape = targetShape;
  }

  public get built(): boolean {
    return this._built;
  }

  public updateDisplayValue(): void {}

  public addHypothesis(hypothesis: AbstractHypothesis): void {
    this._allowedHypotheses.push(hypothesis);
  }

  public build(): void {
    if (!this._allowedHypotheses.length) throw new Error("At least one Hypothesis is needed.");
    if (this._built) throw new Error("Component already built.");
    this.createHypothesesWrapper().createDisplayTitle().createInputGroup();
    this._built = true;
  }

  public appendSelf(target: AbstractUIComponent): void {
    if (!this._built || !this.HTMLElement)
      throw new Error("Component needs to be built first before being appended.");
    target.appendChild(this.HTMLElement);
  }

  private createHypothesesWrapper(): HypothesesUIComponent {
    const wrapper: HTMLElement = document.createElement("div");
    wrapper.classList.add("theory-form-hypothesis-wrapper");
    this.HTMLElement = wrapper;
    return this;
  }

  private createDisplayTitle(): HypothesesUIComponent {
    if (!this.HTMLElement) throw new Error("HTML Element not created yet.");
    const title: HTMLHeadingElement = document.createElement("h3");
    title.innerText = `${Utils.capitalize(ENTITY_SHAPE_TRANSLATIONS[this._targetShape])}(s)`;
    this.HTMLElement.appendChild(title);
    return this;
  }

  private createInputGroup(): HypothesesUIComponent {
    const inputGroup: HTMLElement = document.createElement("div");
    inputGroup.classList.add("input-group");
    inputGroup.appendChild(this.createHypothesesSelectElement());
    inputGroup.appendChild(this.createColorTargetSelectElement());
    this.HTMLElement?.appendChild(inputGroup);
    return this;
  }

  private createHypothesesSelectElement(): HTMLSelectElement {
    const select: HTMLSelectElement = document.createElement("select");
    const selectID: string = `${this._targetShape}-hypothesis`;
    select.name = selectID;
    select.id = selectID;

    this._allowedHypotheses.forEach((h) => {
      const option: HTMLOptionElement = document.createElement("option");
      option.value = h.id;
      option.innerText = h.displayText;
      select.appendChild(option);
    });

    return select;
  }

  private createColorTargetSelectElement(): HTMLSelectElement {
    const select: HTMLSelectElement = document.createElement("select");
    const selectID: string = `${this._targetShape}-hypothesis-color-target`;
    select.name = selectID;
    select.id = selectID;

    ALL_ENTITY_COLORS.forEach((c) => {
      const option: HTMLOptionElement = document.createElement("option");
      option.value = c;
      option.innerText = Utils.capitalize(ENTITY_COLOR_TRANSLATIONS[c]);
      select.appendChild(option);
    });

    return select;
  }
}
