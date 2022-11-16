export class FormErrorHandler {
  constructor() {
    document.addEventListener("input:error", ({ target, detail }) =>
      this.applyInputErrorState(target, detail)
    );
    document.addEventListener("input:valid", ({ target, detail }) => {
      this.resetInputErrorState(target, detail);
    });
  }

  applyInputErrorState(target, { errorField }) {
    target.ariaInvalid = true;
    errorField.ariaHidden = false;
  }

  resetInputErrorState(target, { errorField }) {
    target.ariaInvalid = false;
    errorField.ariaHidden = true;
  }
}
