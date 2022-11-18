import { IInputError } from "../form.events";

export class FormErrorHandler {
  constructor() {
    document.addEventListener("input:error", ({ target, detail }) =>
      this.applyInputErrorState(target as HTMLInputElement, detail)
    );
    document.addEventListener("input:valid", ({ target, detail }) => {
      this.resetInputErrorState(target as HTMLInputElement, detail);
    });
  }

  applyInputErrorState(target: HTMLInputElement, { errorField }: IInputError) {
    target.ariaInvalid = "true";
    errorField.ariaHidden = "false";
  }

  resetInputErrorState(target: HTMLInputElement, { errorField }: IInputError) {
    target.ariaInvalid = "false";
    errorField.ariaHidden = "true";
  }
}
