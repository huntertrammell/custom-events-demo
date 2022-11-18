export class FormResetHandler {
  constructor() {
    document.addEventListener("form:reset", (e) => {
      this.resetForm(e.target as HTMLFormElement);
    });
  }

  resetForm(form: HTMLFormElement) {
    const inputs = form.querySelectorAll("[data-form-field]") as NodeListOf<HTMLInputElement>;
    const submit = form.querySelector("[data-form-submit]") as HTMLButtonElement;

    inputs.forEach((input: HTMLInputElement) => {
      input.value = "";
    });
    submit.ariaDisabled = "true";
  }
}
