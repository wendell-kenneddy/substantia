import { AbstractHypothesis, type HypothesisValidationResult } from "./AbstractHypothesis";
import {
  type EntityShape,
  type EntityColor,
  ENTITY_SHAPE_TRANSLATIONS,
  ENTITY_COLOR_TRANSLATIONS
} from "./config";
import { Entity } from "./Entity";
import type { UIComponent } from "./UIComponent";

export class ShapeCanBeOfChosenColorHipothesis extends AbstractHypothesis {
  private readonly _displayText: string = "podem ser da cor";
  private readonly _id: string = "can-be-of-chosen-color";

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
    let correct: boolean = false;
    let i: number = 0;

    while (i < components.length) {
      const component: UIComponent = components[i];

      if (component instanceof Entity && component.shape === shape && component.color === color) {
        correct = true;
        break;
      }

      i++;
    }

    const message: string = `A hipótese de que ${
      ENTITY_SHAPE_TRANSLATIONS[shape]
    }s podem ser da cor ${ENTITY_COLOR_TRANSLATIONS[color]} está ${
      correct ? "correta" : "incorreta"
    }.`;

    return { message, correct };
  }
}
