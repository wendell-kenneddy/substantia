import type { AbstractHypothesis, HypothesisValidationResult } from "./AbstractHypothesis";
import type { AbstractUIComponent } from "./AbstractUIComponent";
import { Action } from "./Action";
import { config, type EntityColor, type EntityShape } from "./config";
import { Entity } from "./Entity";
import { HypothesesUIComponent } from "./HypothesesUIComponent";
import type { ProgressBar } from "./ProgressBar";
import { ResultsScreen } from "./ResultsScreen";
import { ShapeCanNeverBeOfChosenColorHipothesis } from "./ShapeCanNeverBeOfChosenColorHipothesis";
import { ShapeIsMostlyOfChosenColorHipothesis } from "./ShapeIsMostlyOfChosenColorHipothesis";
import { ShapeIsRarelyOfChosenColorHipothesis } from "./ShapeIsRarelyOfChosenColorHipothesis";
import { UIComponent } from "./UIComponent";
import type { UIManager } from "./UIManager";
import { Utils } from "./Utils";
import { Page } from "./Page";

export class GameManager {
  private isRunning: boolean = false;
  private uiManager: UIManager;
  private currentActionPoints: number = config.MAX_ACTION_POINTS;
  private allowedShapes: EntityShape[] = [];
  private allowedColorsPerShape: Record<string, EntityColor[]> = {};
  private allowedHypotheses: AbstractHypothesis[] = [
    new ShapeCanNeverBeOfChosenColorHipothesis(),
    new ShapeIsMostlyOfChosenColorHipothesis(),
    new ShapeIsRarelyOfChosenColorHipothesis()
  ];
  private left_page: Page;
  private right_page: Page;

  constructor(uiManager: UIManager) {
    this.uiManager = uiManager;
    this.left_page = new Page("left-page");
    this.right_page = new Page("right-page");
  }

  public start(): void {
    if (this.isRunning) return;

    const mainMenu: UIComponent = this.uiManager.getComponentById("main-menu");
    const gameUI: UIComponent = this.uiManager.getComponentById("game-ui");

    mainMenu.hide();
    this.pickAllowedShapes();
    this.pickAllowedColorsPerShape();
    this.updateActionPointsProgressBar();
    this.updateActionsPointsCounter();
    this.updateElapsedTimeProgressBar();
    this.updateElapsedTimeCounter();
    this.spawnEntities();
    this.appendHypothesisInputs();
    gameUI.show();

    this.isRunning = true;
  }

  public stop(): void {
    if (!this.isRunning) return;

    const settingsMenu: UIComponent = this.uiManager.getComponentById("settings-menu");
    const mainMenu: UIComponent = this.uiManager.getComponentById("main-menu");
    const gameUI: UIComponent = this.uiManager.getComponentById("game-ui");

    settingsMenu.hide();
    gameUI.hide();
    this.hideResultsModal();
    this.resetGameState();
    this.destroyEntities();
    this.destroyShapesInformations();
    mainMenu.show();

    this.isRunning = false;
  }

  private hideResultsModal(): void {
    const resultsModal: UIComponent = this.uiManager.getComponentById("results-modal");
    resultsModal.hide();
  }

  private restartGame(): void {
    if (!this.isRunning) return;
    this.hideResultsModal();
    this.resetGameState();
    this.destroyEntities();
    this.pickAllowedShapes();
    this.pickAllowedColorsPerShape();
    this.spawnEntities();
    this.appendHypothesisInputs();
    this.updateElapsedTimeCounter();
    this.updateElapsedTimeProgressBar();
    this.destroyShapesInformations();
  }

  public validateTheory(e: Event): void {
    if (!(e instanceof SubmitEvent)) return;
    e.preventDefault();

    const formData: FormData = new FormData(e.target as HTMLFormElement, e.submitter);
    const results: HypothesisValidationResult[] = this.calculateResults(formData);
    const theoryModal: UIComponent = this.uiManager.getComponentById("theory-modal");
    const resultsModal: UIComponent = this.uiManager.getComponentById("results-modal");
    const resultsScreen: ResultsScreen = new ResultsScreen(
      "results-screen",
      results,
      () => this.stop(),
      () => this.restartGame()
    );

    resultsScreen.build();
    resultsScreen.appendSelf(resultsModal);
    theoryModal.hide();
    resultsModal.show();
    this.uiManager.registerComponent(resultsScreen);
  }

  private calculateResults(data: FormData): HypothesisValidationResult[] {
    const formDataArray: [string, FormDataEntryValue][] = Array.from(data);
    const results: HypothesisValidationResult[] = [];
    const components: AbstractUIComponent[] = this.uiManager.getAllComponents();

    this.allowedShapes.forEach((s) => {
      const playerHypothesis = formDataArray.reduce<{
        title?: FormDataEntryValue;
        color?: EntityColor;
      }>((prev, curr) => {
        if (curr[0] == `${s}-hypothesis`) {
          prev["title"] = curr[1];
        } else if (curr[0] == `${s}-hypothesis-color-target`) {
          prev["color"] = curr[1] as EntityColor;
        }

        return prev;
      }, {});

      const validator: AbstractHypothesis = this.allowedHypotheses.find(
        (h) => h.id === playerHypothesis.title
      ) as AbstractHypothesis;
      const result: HypothesisValidationResult = validator.validate(
        components,
        s,
        playerHypothesis.color as EntityColor
      );
      results.push(result);
    });

    return results;
  }

  private resetGameState(): void {
    this.allowedShapes = [];
    this.allowedColorsPerShape = {};
    this.currentActionPoints = config.MAX_ACTION_POINTS;
  }

  private pickAllowedColorsPerShape(): void {
    for (let i = 0; i < this.allowedShapes.length; i++) {
      const shape = this.allowedShapes[i];

      const colorOptions: EntityColor[] = config.ALL_ENTITY_COLORS.map((c) => c);
      const allowedColors: EntityColor[] = [];

      while (allowedColors.length < config.ENTITIY_COLOR_POOL_SIZE) {
        const randomInteger: number = Utils.getRandomInteger(colorOptions.length - 1);
        allowedColors.push(colorOptions[randomInteger]);
        colorOptions.splice(randomInteger, 1);
      }

      this.allowedColorsPerShape[shape] = allowedColors;
    }
  }

  private pickAllowedShapes(): void {
    const shapeOptions: EntityShape[] = config.ALL_ENTITY_SHAPES.map((s) => s);

    while (this.allowedShapes.length < config.ENTITIY_SHAPE_POOL_SIZE) {
      const randomInteger: number = Utils.getRandomInteger(shapeOptions.length - 1);
      this.allowedShapes.push(shapeOptions[randomInteger]);
      shapeOptions.splice(randomInteger, 1);
    }
  }

  private appendHypothesisInputs(): void {
    const container: UIComponent = this.uiManager.getComponentById(
      "theory-form-hypotheses-container"
    );

    this.allowedShapes.forEach((s) => {
      const component = new HypothesesUIComponent(`${s}-hypotheses-component`, s);

      this.allowedHypotheses.forEach((h) => component.addHypothesis(h));
      component.build();
      this.uiManager.registerComponent(component);
      component.appendSelf(container);
    });
  }

  private spawnEntities(): void {
    const playableArea: UIComponent = this.uiManager.getComponentById("game-ui-playable-area");
    const availableCells: [number, number][] = [];

    for (let i = 0; i < config.ENTITY_GRID_COLUMNS; i++) {
      for (let j = 0; j < config.ENTITY_GRID_ROWS; j++) {
        availableCells.push([i + 1, j + 1]);
      }
    }

    for (let i = 0; i < config.MAX_SPAWNABLE_ENTITIES_PER_GAME; i++) {
      const randomGridPositionIndex: number = Utils.getRandomInteger(availableCells.length - 1);
      const position: [number, number] = availableCells[randomGridPositionIndex];
      const shape: EntityShape = this.allowedShapes[this.getRandomEntityShapeIndex()];
      const color: EntityColor =
        this.allowedColorsPerShape[shape][this.getRandomEntityColorIndex()];

      const entity: Entity = new Entity(`entity-${i}`, position, color, shape);
      this.uiManager.registerComponent(entity);
      entity.appendSelf(playableArea);
      entity.attachAction(
        new Action("click", () => {
          if (this.currentActionPoints > 0 && entity.revealed === false) {
            this.shapesInformations(entity);
          }
          this.revealEntity(entity);
        })
      );
      availableCells.splice(randomGridPositionIndex, 1);
    }
  }

  private revealEntity(entity: Entity): void {
    if (
      this.currentActionPoints < config.CONSUMED_ACTION_POINTS_ON_ENTITY_REVEAL ||
      entity.revealed
    )
      return;
    this.currentActionPoints--;
    this.updateActionPointsProgressBar();
    this.updateActionsPointsCounter();
    this.updateElapsedTimeProgressBar();
    this.updateElapsedTimeCounter();
    entity.reveal();
  }

  private destroyEntities(): void {
    this.uiManager.getAllComponents().forEach((c) => {
      if (c instanceof Entity || c instanceof HypothesesUIComponent || c instanceof ResultsScreen) {
        c.destroy();
        this.uiManager.unregisterComponent(c);
      }
    });
  }

  private updateActionPointsProgressBar(): void {
    const actionPointsProgressBar: ProgressBar = this.uiManager.getComponentById(
      "action-points-progress-bar"
    ) as ProgressBar;
    actionPointsProgressBar.currentValue = this.currentActionPoints;
  }

  private updateElapsedTimeProgressBar(): void {
    const elapsedTimeProgressBar: ProgressBar = this.uiManager.getComponentById(
      "elapsed-time-progress-bar"
    ) as ProgressBar;
    elapsedTimeProgressBar.currentValue =
      (config.MAX_ACTION_POINTS - this.currentActionPoints) *
      config.ELAPSED_TIME_PER_ACTION_POINT_CONSUMED;
  }

  private updateActionsPointsCounter(): void {
    const actionPointsCounter: UIComponent =
      this.uiManager.getComponentById("action-points-counter");
    actionPointsCounter.updateDisplayValue(
      `${this.currentActionPoints}/${config.MAX_ACTION_POINTS}`
    );
  }

  private updateElapsedTimeCounter(): void {
    const elapsedTimeCounter: UIComponent = this.uiManager.getComponentById("elapsed-time-counter");
    elapsedTimeCounter.updateDisplayValue(
      `${
        config.ELAPSED_TIME_PER_ACTION_POINT_CONSUMED *
        (config.MAX_ACTION_POINTS - this.currentActionPoints)
      } ano(s)`
    );
  }

  private getRandomEntityColorIndex() {
    return Utils.getRandomInteger(config.ENTITIY_COLOR_POOL_SIZE - 1);
  }

  private getRandomEntityShapeIndex() {
    return Utils.getRandomInteger(this.allowedShapes.length - 1);
  }

  public shapesInformations(c: Entity): void {
    if (this.left_page.childQuantity() < 2 || this.left_page.verifyContainer(c.shape)) {
      if (!this.left_page.verifyContainer(c.shape)) {
        this.left_page.createShapeContainer("informations-left", c.shape, c.color);
      } else {
        this.left_page.addColorCount(c.shape, c.color);
      }
    } else {
      if (!this.right_page.verifyContainer(c.shape)) {
        this.right_page.createShapeContainer("informations-right", c.shape, c.color);
      } else {
        this.right_page.addColorCount(c.shape, c.color);
      }
    }
  }

  public destroyShapesInformations(): void {
    this.left_page.reset();
    this.right_page.reset();
  }
}
