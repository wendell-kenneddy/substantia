import { Action } from "./Action";
import { UIManager } from "./UIManager";
import { Utils } from "./Utils";
import { GameManager } from "./GameManager";
import { ProgressBar } from "./ProgressBar";
import { config } from "./config";
import type { AbstractUIComponent } from "./AbstractUIComponent";
import { UIComponent } from "./UIComponent";

export class ApplicationContext {
  private _UIManager: UIManager = new UIManager();
  private gameManager: GameManager = new GameManager(this._UIManager);

  public run(): void {
    this.registerUIComponents();
    this.attachUIComponentsActions();
  }

  private registerUIComponents(): void {
    this.registerHowToPlayModalUIComponent();
    this.registerAboutModalUIComponent();
    this.registerOpenAboutModalButtonUIComponent();
    this.registerCloseAboutModalButtonUIComponent();
    this.registerMainMenuUIComponent();
    this.registerGameUIComponent();
    this.registerProgressBarUIComponents();
    this.registerSettingsMenuUIComponent();
    this.registerOpenSettingsMenuButtonUIComponent();
    this.registerPlayerBookModalUIComponent();
    this.registerOpenPlayerBookModalButtonUIComponent();
    this.registerOpenTheoryModalButtonUIComponent();
    this.registerTheoryModalUIComponent();
    this.registerPlayableAreaUIComponent();
    this.registerActionPointsCounterUIComponent();
    this.registerElapsedTimeCounterUIComponent();
    this.registerHypothesesContainerUIComponent();
    this.registerCloseTheoryModalUIComponent();
    this.registerTheoryFormUIComponent();
    this.registerResultsModalUIComponent();
  }

  private attachUIComponentsActions(): void {
    this.attachHowToPlayModalActions();
    this.attachOpenAboutModalButtonActions();
    this.attachCloseAboutModalButtonActions();
    this.attachMainMenuActions();
    this.attachSettingsMenuActions();
    this.attachOpenSettingsMenuButtonActions();
    this.attachPlayerBookModalActions();
    this.attachOpenPlayerBookModalActions();
    this.attachOpenTheoryModalButtonActions();
    this.attachCloseTheoryModalButtonActions();
    this.attachTheoryFormActions();
  }

  private registerResultsModalUIComponent(): void {
    this._UIManager.registerComponent(new UIComponent("results-modal"));
  }

  private registerHypothesesContainerUIComponent(): void {
    this._UIManager.registerComponent(new UIComponent("theory-form-hypotheses-container"));
  }

  private registerGameUIComponent() {
    this._UIManager.registerComponent(new UIComponent("game-ui"));
  }

  private registerHowToPlayModalUIComponent(): void {
    const howToPlayModal: UIComponent = new UIComponent("how-to-play-modal");
    this._UIManager.registerComponent(howToPlayModal);
  }

  private attachHowToPlayModalActions() {
    const howToPlayModal = this._UIManager.getComponentById("how-to-play-modal");

    howToPlayModal.attachAction(
      new Action("click", (e) => {
        const target: EventTarget | null = e.target;
        if (!target) return;
        const HTMLElement: HTMLElement = target as HTMLElement;

        if (HTMLElement.id == "close-how-to-play-modal-button") howToPlayModal.hide();
      })
    );
  }

  private registerAboutModalUIComponent(): void {
    this._UIManager.registerComponent(new UIComponent("about-modal"));
  }

  private registerOpenAboutModalButtonUIComponent(): void {
    this._UIManager.registerComponent(new UIComponent("open-about-modal-button"));
  }

  private attachOpenAboutModalButtonActions(): void {
    const openAboutModalButton: UIComponent =
      this._UIManager.getComponentById("open-about-modal-button");

    openAboutModalButton.attachAction(
      new Action("click", () => {
        const aboutModal: UIComponent = this._UIManager.getComponentById("about-modal");
        aboutModal.show();
      })
    );
  }

  private registerCloseAboutModalButtonUIComponent(): void {
    this._UIManager.registerComponent(new UIComponent("close-about-modal-button"));
  }

  private attachCloseAboutModalButtonActions(): void {
    const closeAboutModalButton: UIComponent = this._UIManager.getComponentById(
      "close-about-modal-button"
    );

    closeAboutModalButton.attachAction(
      new Action("click", () => {
        const aboutModal: UIComponent = this._UIManager.getComponentById("about-modal");
        aboutModal.hide();
      })
    );
  }

  private registerMainMenuUIComponent(): void {
    const mainMenu: UIComponent = new UIComponent("main-menu");
    this._UIManager.registerComponent(mainMenu);
  }

  private attachMainMenuActions() {
    const mainMenu: UIComponent = this._UIManager.getComponentById("main-menu");

    mainMenu.attachAction(
      new Action("click", (e) => {
        const target: EventTarget | null = e.target;
        if (!target) return;
        const HTMLElement: HTMLElement = target as HTMLElement;

        switch (HTMLElement.id) {
          case "open-how-to-play-modal-button":
            this._UIManager.getComponentById("how-to-play-modal").show();
            break;
          case "start-game-button":
            this.gameManager.start();
            break;
          default:
            break;
        }
      })
    );
  }

  private registerProgressBarUIComponents(): void {
    const actionPointsProgressBar = new ProgressBar(
      "action-points-progress-bar",
      config.MAX_ACTION_POINTS,
      config.MAX_ACTION_POINTS
    );
    const elapsedTimeProgressBar = new ProgressBar(
      "elapsed-time-progress-bar",
      config.MAX_ACTION_POINTS * config.ELAPSED_TIME_PER_ACTION_POINT_CONSUMED,
      0
    );
    this._UIManager.registerComponent(actionPointsProgressBar);
    this._UIManager.registerComponent(elapsedTimeProgressBar);
  }

  private registerActionPointsCounterUIComponent(): void {
    this._UIManager.registerComponent(new UIComponent("action-points-counter"));
  }

  private registerElapsedTimeCounterUIComponent(): void {
    this._UIManager.registerComponent(new UIComponent("elapsed-time-counter"));
  }

  private registerSettingsMenuUIComponent(): void {
    this._UIManager.registerComponent(new UIComponent("settings-menu"));
  }

  private attachSettingsMenuActions(): void {
    const settingsMenu: UIComponent = this._UIManager.getComponentById("settings-menu");

    settingsMenu.attachAction(
      new Action("click", (e) => {
        const target: HTMLElement = Utils.getEventTarget(e);

        switch (target.id) {
          case "go-back-to-main-menu-button":
            this.gameManager.stop();
            break;
          case "open-how-to-play-modal-button-in-game":
            this._UIManager.getComponentById("how-to-play-modal").show();
            break;
          default:
            break;
        }
      })
    );
  }

  private registerOpenSettingsMenuButtonUIComponent(): void {
    this._UIManager.registerComponent(new UIComponent("open-game-settings-menu-button"));
  }

  private attachOpenSettingsMenuButtonActions() {
    const openGameSettingsMenuButton = this._UIManager.getComponentById(
      "open-game-settings-menu-button"
    );

    openGameSettingsMenuButton.attachAction(
      new Action("click", () => {
        const settingsMenu = this._UIManager.getComponentById("settings-menu");
        if (settingsMenu.isHidden) return settingsMenu.show();
        settingsMenu.hide();
      })
    );
  }

  private registerPlayerBookModalUIComponent(): void {
    this._UIManager.registerComponent(new UIComponent("player-book-modal"));
  }

  private attachPlayerBookModalActions(): void {
    const playerBookModal = new UIComponent("player-book-modal");

    playerBookModal.attachAction(
      new Action("click", (e) => {
        const target: EventTarget | null = e.target;
        if (!target) return;
        const HTMLElement: HTMLElement = target as HTMLElement;

        if (HTMLElement.id === "close-player-book-modal-button") playerBookModal.hide();
      })
    );
  }

  private registerOpenPlayerBookModalButtonUIComponent(): void {
    this._UIManager.registerComponent(new UIComponent("open-player-book-modal-button"));
  }

  private attachOpenPlayerBookModalActions(): void {
    const openPlayerBookModalButton: UIComponent = this._UIManager.getComponentById(
      "open-player-book-modal-button"
    );

    openPlayerBookModalButton.attachAction(
      new Action("click", () => {
        this._UIManager.getComponentById("player-book-modal").show();
      })
    );
  }

  private registerOpenTheoryModalButtonUIComponent(): void {
    this._UIManager.registerComponent(new UIComponent("open-theory-modal-button"));
  }

  private attachOpenTheoryModalButtonActions(): void {
    const openTheoryModalButton: UIComponent = this._UIManager.getComponentById(
      "open-theory-modal-button"
    );

    openTheoryModalButton.attachAction(
      new Action("click", () => {
        this._UIManager.getComponentById("theory-modal").show();
      })
    );
  }

  private registerTheoryModalUIComponent(): void {
    this._UIManager.registerComponent(new UIComponent("theory-modal"));
  }

  private registerCloseTheoryModalUIComponent(): void {
    this._UIManager.registerComponent(new UIComponent("close-theory-modal-button"));
  }

  private attachCloseTheoryModalButtonActions(): void {
    const button: AbstractUIComponent = this._UIManager.getComponentById(
      "close-theory-modal-button"
    );
    button.attachAction(
      new Action("click", () => {
        const theoryModal: UIComponent = this._UIManager.getComponentById("theory-modal");
        theoryModal.hide();
      })
    );
  }

  private registerPlayableAreaUIComponent(): void {
    this._UIManager.registerComponent(new UIComponent("game-ui-playable-area"));
  }

  private registerTheoryFormUIComponent(): void {
    this._UIManager.registerComponent(new UIComponent("theory-form"));
  }

  private attachTheoryFormActions(): void {
    const theoryForm: AbstractUIComponent = this._UIManager.getComponentById("theory-form");
    theoryForm.attachAction(new Action("submit", (e) => this.gameManager.validateTheory(e)));
  }
}
