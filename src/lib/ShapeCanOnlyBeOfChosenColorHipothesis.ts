import { AbstractHypothesis, type HypothesisValidationResult } from "./AbstractHypothesis";
import {
  type EntityShape,
  type EntityColor,
  ENTITY_SHAPE_TRANSLATIONS,
  ENTITY_COLOR_TRANSLATIONS
} from "./config";
import { Entity } from "./Entity";
import type { UIComponent } from "./UIComponent";

export class ShapeCanOnlyBeOfChosenColorHipothesis extends AbstractHypothesis {
  private readonly _displayText: string = "são somente da cor";
  private readonly _id: string = "can-only-be-of-chosen-color";

  public get id(): string {
    return this._id;
  }

  public get displayText(): string {
    return this._displayText;
  }

  validate(
    components: UIComponent[],
    shape: EntityShape,
    color: EntityColor
  ): HypothesisValidationResult {
    let i: number = 0;
    let correct: boolean = true;

    while (i < components.length) {
      const component: UIComponent = components[i];

      if (component instanceof Entity && component.shape === shape && component.color !== color) {
        correct = false;
        break;
      }

      i++;
    }

    const message: string = `A hipótese de que ${
      ENTITY_SHAPE_TRANSLATIONS[shape]
    }s são somente da cor ${ENTITY_COLOR_TRANSLATIONS[color]} está ${
      correct ? "correta" : "incorreta"
    }.`;

    return { message, correct };
  }
}
