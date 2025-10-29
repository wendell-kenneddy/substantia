import { AbstractUIComponent } from "./AbstractUIComponent";

export abstract class AbstractSelfCreatingUIComponent extends AbstractUIComponent {
  public abstract built: boolean;
  public abstract build(): void;
}
