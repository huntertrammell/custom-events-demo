export class FormResetHandler {
  constructor() {
    document.addEventListener("form:reset", (e) => {
      this.resetForm(e.target);
    });
  }

  resetForm(form) {
    const inputs = form.querySelectorAll("[data-form-field]");
    const submit = form.querySelector("[data-form-submit]");

    inputs.forEach((input) => {
      input.value = "";
    });
    submit.ariaDisabled = true;
  }
}
