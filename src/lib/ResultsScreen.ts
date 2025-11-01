import type { HypothesisValidationResult } from "./AbstractHypothesis";
import { AbstractSelfCreatingUIComponent } from "./AbstractSelfCreatingUIComponent";

export class ResultsScreen extends AbstractSelfCreatingUIComponent {
  private _built: boolean = false;
  private _results: HypothesisValidationResult[] = [];
  private _mainMenuCallback: () => void;
  private _playAgainCallback: () => void;

  constructor(
    title: string,
    results: HypothesisValidationResult[],
    mainMenuCallback: () => void,
    playAgainCallback: () => void
  ) {
    super(title);
    this._results = results;
    this._mainMenuCallback = mainMenuCallback;
    this._playAgainCallback = playAgainCallback;
  }

  public get built(): boolean {
    return this._built;
  }

  public updateDisplayValue(): void {}

  public build(): void {
    if (this._built) return;
    this.createResultsContainer()
      .createResultTitle()
      .createAssertionsContianer()
      .createButtonGroup();
    this._built = true;
  }

  private createResultsContainer(): ResultsScreen {
    const container: HTMLElement = document.createElement("div");
    container.id = "results-screen";
    this.HTMLElement = container;
    return this;
  }

  private createResultTitle(): ResultsScreen {
    if (!this.HTMLElement) throw new Error("Result Modal container not yet created.");
    const title: HTMLHeadingElement = document.createElement("h3");
    let text: string = "Vitória!";
    let i = 0;

    while (this._results.length > i) {
      if (!this._results[i].correct) {
        text = "Derrota...";
        break;
      }

      i++;
    }

    title.innerText = text;
    this.HTMLElement.appendChild(title);
    return this;
  }

  private createAssertionsContianer(): ResultsScreen {
    const container: HTMLElement = document.createElement("div");
    const ul: HTMLUListElement = document.createElement("ul");
    const scoreDisplay: HTMLSpanElement = document.createElement("span");
    let score: number = 0;

    this._results.forEach((r) => {
      if (r.correct) score++;
      const li = document.createElement("li");
      li.innerText = r.message;
      ul.appendChild(li);
    });

    scoreDisplay.innerText = `Resultado: ${score}/${this._results.length}`;
    container.id = "assertions-container";
    scoreDisplay.id = "score";

    container.appendChild(ul);
    container.appendChild(scoreDisplay);
    this.HTMLElement?.appendChild(container);

    return this;
  }

  private createButtonGroup(): ResultsScreen {
    const buttonGroup: HTMLElement = document.createElement("div");
    const mainMenuButton: HTMLButtonElement = document.createElement("button");
    const playAgainButton: HTMLButtonElement = document.createElement("button");

    buttonGroup.classList.add("button-group");
    mainMenuButton.innerText = "menu principal";
    playAgainButton.innerText = "jogar novamente";

    mainMenuButton.addEventListener("click", () => {
      console.log("going back to main menu");
      this._mainMenuCallback();
    });
    playAgainButton.addEventListener("click", () => this._playAgainCallback());

    buttonGroup.appendChild(mainMenuButton);
    buttonGroup.appendChild(playAgainButton);
    this.HTMLElement?.appendChild(buttonGroup);

    return this;
  }
}
