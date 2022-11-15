import { FormInputValidation } from "./validation.js";
import { FormErrorHandler } from "./error.js";

export class FormService {
  constructor() {
    this.registerValidator();

    try {
      new FormErrorHandler();
    } catch (error) {
      console.log(error);
    }
  }

  registerValidator() {
    const forms = document.querySelectorAll("[data-form]");

    forms.forEach((form) => {
      try {
        new FormInputValidation(form);
      } catch (error) {
        console.error(error);
      }
    });
  }
}
