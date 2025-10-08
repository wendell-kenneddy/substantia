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

  public run(): void {
    this.setupMainMenuListeners();
  }

  private setupMainMenuListeners(): void {
    this.openHowToPlayModalButton.addEventListener("click", () => {
      this.mainMenuSection.classList.add("hidden");
      this.howToPlayModal.classList.remove("hidden");
    });

    this.closeHowToPlayModalButton.addEventListener("click", () => {
      this.howToPlayModal.classList.add("hidden");
      this.mainMenuSection.classList.remove("hidden");
    });

    this.startGameButton.addEventListener("click", () => {
      this.mainMenuSection.classList.add("hidden");
      this.gameUI.classList.remove("hidden");
    });
  }
}
