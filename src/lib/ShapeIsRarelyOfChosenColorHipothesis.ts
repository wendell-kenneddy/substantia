import { AbstractHypothesis, type HypothesisValidationResult } from "./AbstractHypothesis";
import {
  type EntityShape,
  type EntityColor,
  ENTITY_SHAPE_TRANSLATIONS,
  ENTITY_COLOR_TRANSLATIONS
} from "./config";
import { Entity } from "./Entity";
import type { UIComponent } from "./UIComponent";

export class ShapeIsRarelyOfChosenColorHipothesis extends AbstractHypothesis {
  private readonly _displayText: string = "raramente são da cor";
  private readonly _id: string = "is-rearely-of-chosen-color";

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
    let chosenShapeTotal: number = 0;
    let chosenShapesOfChosenColor: number = 0;
    let i: number = 0;

    while (i < components.length) {
      const component: UIComponent = components[i];

      if (component instanceof Entity && component.shape === shape) {
        chosenShapeTotal++;

        if (component.color === color) {
          chosenShapesOfChosenColor++;
        }
      }

      i++;
    }

    const correct: boolean = chosenShapesOfChosenColor / chosenShapeTotal <= 0.3;
    const message: string = `A hipótese de que ${
      ENTITY_SHAPE_TRANSLATIONS[shape]
    }s raramente são da cor ${ENTITY_COLOR_TRANSLATIONS[color]} está ${
      correct ? "correta" : "incorreta"
    }.`;

    return { correct, message };
  }
}
