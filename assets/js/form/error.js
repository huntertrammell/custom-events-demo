export class FormErrorHandler {
  constructor() {
    document.addEventListener("input:error", ({ detail }) =>
      this.applyInputErrorState(detail)
    );
    document.addEventListener("input:valid", ({ detail }) => {
      this.resetInputErrorState(detail);
    });
  }

  applyInputErrorState({ input, errorField }) {
    input.ariaInvalid = true;
    errorField.ariaHidden = false;
  }

  resetInputErrorState({ input, errorField }) {
    input.ariaInvalid = false;
    errorField.ariaHidden = true;
  }
}
