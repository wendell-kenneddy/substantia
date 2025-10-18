import { Action } from "./Action";
import { UIComponent } from "./UIComponent";
import { UIManager } from "./UIManager";
import { Utils } from "./Utils";
import { Shape } from "./Shape"

export class ApplicationContext {
  private _UIManager: UIManager = new UIManager();

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
    this.spawnShapesInGridComponent(8);
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
    this.attachTheoryModalActions();
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
            const gameUI = this._UIManager.getComponentById("game-ui");
            mainMenu.hide();
            gameUI.show();
            break;
          default:
            break;
        }
      })
    );
  }

  private registerProgressBarUIComponents(): void {
    const actionPointsProgressBar = new UIComponent("action-points-progress-bar");
    const elapsedTimeProgressBar = new UIComponent("elapsed-time-progress-bar");
    this._UIManager.registerComponent(actionPointsProgressBar);
    this._UIManager.registerComponent(elapsedTimeProgressBar);
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
            const mainMenu: UIComponent = this._UIManager.getComponentById("main-menu");
            const gameUI: UIComponent = this._UIManager.getComponentById("game-ui");

            settingsMenu.hide();
            gameUI.hide();
            mainMenu.show();
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
        console.log("aaaaaa");
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

  private attachTheoryModalActions(): void {
    const theoryModal: UIComponent = this._UIManager.getComponentById("theory-modal");

    theoryModal.attachAction(
      new Action("click", (e) => {
        const target: HTMLElement = Utils.getEventTarget(e);

        switch (target.id) {
          case "close-theory-modal-button":
            console.log("test");
            theoryModal.hide();
            break;
          case "validate-theory":
            e.preventDefault();
            break;
          default:
            break;
        }
      })
    );
  }

  private spawnShapesInGridComponent(count: number): void {

    function randomColor(): string {
      const colors: string[] = ["red", "blue", "green"];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function randomImageURL(): string {
      const urls: string[] = [
        "/cube.svg",
        "/pyramid.svg",
        "/sphere.svg",
      ];
      return urls[Math.floor(Math.random() * urls.length)];
    }

    const container: HTMLElement = document.getElementById("game-ui-playable-area") as HTMLElement;

    if (!container) throw new Error("Container not found.");
  
    const cols: number = 10;
    const rows: number = 6;
    const usedCells: Set<string> = new Set();

    for (let i = 0; i < count; i++) {
      let col: number, row: number;
      let tries: number = 0;

      do {
        col = Math.floor(Math.random() * cols) + 1; 
        row = Math.floor(Math.random() * rows) + 1;
        tries++;
      } while (usedCells.has(`${col},${row}`) && tries < 100);

      usedCells.add(`${col},${row}`);

      const shape: Shape = new Shape(randomColor(), randomImageURL(), 60);
      shape.setGridPosition(col, row);
      container.appendChild(shape.element);
    }
  }
}
