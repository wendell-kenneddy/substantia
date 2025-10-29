import type { AbstractUIComponent } from "./AbstractUIComponent";
import type { EntityColor, EntityShape } from "./config";

export interface HipothesisValidationOption {
  id: string;
  displayText: string;
}

export type HypothesisValidationResult = { message: string; correct: boolean };

export abstract class AbstractHypothesis {
  public abstract readonly id: string;
  public abstract readonly displayText: string;
  public abstract validate(
    components: AbstractUIComponent[],
    shape: EntityShape,
    color: EntityColor
  ): HypothesisValidationResult;
}
