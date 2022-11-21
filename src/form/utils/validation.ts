export class FormInputValidation {
  form: HTMLFormElement;
  inputs: NodeListOf<HTMLInputElement>;
  submit: HTMLButtonElement;
  isFormValid: boolean;

  constructor(form: HTMLFormElement) {
    this.form = form;
    this.inputs = this.form.querySelectorAll("[data-form-field]");
    this.submit = this.form.querySelector(
      "[data-form-submit]"
    ) as HTMLButtonElement;
    this.isFormValid = false;
    this.registerForm();
    this.registerInputs();
    this.handleSubmit();
  }

  registerForm() {
    this.form.addEventListener("change", () => {
      this.validateForm();
    });
    this.form.addEventListener("input", () => {
      this.validateForm();
    });
  }

  validateForm() {
    this.isFormValid = true;

    this.inputs.forEach((input) => {
      if (!input.checkValidity()) {
        this.isFormValid = false;
      }
    });

    this.isFormValid
      ? (this.submit.ariaDisabled = "false")
      : (this.submit.ariaDisabled = "true");
  }

  registerInputs() {
    this.inputs.forEach((input) => {
      const errorField = document.getElementById(
        `${input.id}-error`
      ) as HTMLElement;

      input.addEventListener("input", ({ target }) => {
        this.validateInput(target as HTMLInputElement, errorField);
      });
      input.addEventListener("blur", ({ target }) => {
        this.validateInput(target as HTMLInputElement, errorField);
      });
    });
  }

  validateInput(input: HTMLInputElement, errorField: HTMLElement) {
    if (!input.checkValidity()) {
      input.dispatchEvent(
        new CustomEvent("input:error", {
          bubbles: true,
          detail: { errorField },
        })
      );
    } else {
      input.dispatchEvent(
        new CustomEvent("input:valid", {
          bubbles: true,
          detail: { errorField },
        })
      );
    }
  }

  handleSubmit() {
    this.submit.addEventListener("click", () => {
      this.validateForm();
      if (this.isFormValid) {
        this.form.dispatchEvent(
          new CustomEvent("form:submit", {
            bubbles: true,
          })
        );
      } else {
        return;
      }
    });
  }
}
