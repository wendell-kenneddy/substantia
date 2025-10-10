export class ApplicationContext {
  private mainMenuSection: HTMLElement = document.getElementById("main-menu") as HTMLElement;
  private howToPlayModal: HTMLElement = document.getElementById("how-to-play") as HTMLElement;
  private openHowToPlayModalButton: HTMLButtonElement = document.getElementById(
    "open-how-to-play-modal-button"
  ) as HTMLButtonElement;
  private closeHowToPlayModalButton: HTMLButtonElement = document.getElementById(
    "close-how-to-play-modal-button"
  ) as HTMLButtonElement;
  private gameUI: HTMLElement = document.getElementById("game-ui") as HTMLElement;
  private startGameButton: HTMLButtonElement = document.getElementById(
    "start-game-button"
  ) as HTMLButtonElement;
  private settingsMenu: HTMLElement = document.getElementById("settings-menu") as HTMLElement;
  private openGameSettingsMenuButton: HTMLButtonElement = document.getElementById(
    "open-game-settings-menu-button"
  ) as HTMLButtonElement;
  private goBackToMainMenuButton: HTMLButtonElement = document.getElementById(
    "go-back-to-main-menu-button"
  ) as HTMLButtonElement;
  private openHowToPlayModalButtonInGame: HTMLButtonElement = document.getElementById(
    "open-how-to-play-modal-button-in-game"
  ) as HTMLButtonElement;
  private playerBookModal: HTMLElement = document.getElementById(
    "player-book-modal"
  ) as HTMLElement;
  private openPlayerBookModalButton: HTMLButtonElement = document.getElementById(
    "open-player-book-modal-button"
  ) as HTMLButtonElement;
  private closePlayerBookModalButton: HTMLButtonElement = document.getElementById(
    "close-player-book-modal-button"
  ) as HTMLButtonElement;
  private mainMenuListenersSet: boolean = false;
  private inGameListenersSet: boolean = false;

  public run(): void {
    this.addMainMenuListeners();
  }

  private addMainMenuListeners(): void {
    if (this.mainMenuListenersSet) return;

    this.openHowToPlayModalButton.addEventListener("click", () => {
      this.howToPlayModal.classList.remove("hidden");
    });

    this.closeHowToPlayModalButton.addEventListener("click", () => {
      this.howToPlayModal.classList.add("hidden");
    });

    this.startGameButton.addEventListener("click", () => {
      this.mainMenuSection.classList.add("hidden");
      this.gameUI.classList.remove("hidden");
      this.addInGameListeners();
    });

    this.mainMenuListenersSet = true;
  }

  private addInGameListeners(): void {
    if (this.inGameListenersSet) return;

    this.openGameSettingsMenuButton.addEventListener("click", () => {
      if (this.settingsMenu.classList.contains("hidden"))
        this.settingsMenu.classList.remove("hidden");
      else {
        this.settingsMenu.classList.add("hidden");
      }
    });

    this.openPlayerBookModalButton.addEventListener("click", () => {
      this.playerBookModal.classList.remove("hidden");
    });

    this.closePlayerBookModalButton.addEventListener("click", () => {
      this.playerBookModal.classList.add("hidden");
    });

    this.goBackToMainMenuButton.addEventListener("click", () => {
      this.settingsMenu.classList.add("hidden");
      this.gameUI.classList.add("hidden");
      this.mainMenuSection.classList.remove("hidden");
    });

    this.openHowToPlayModalButtonInGame.addEventListener("click", () => {
      this.howToPlayModal.classList.remove("hidden");
    });

    this.inGameListenersSet = true;
  }
}
