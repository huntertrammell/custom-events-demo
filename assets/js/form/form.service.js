import { FormInputValidation } from "./validation.js";
import { FormErrorHandler } from "./error.js";
import { FormSubmitHandler } from "./submission.js";
import { FormResetHandler } from "./reset.js";

export class FormService {
  constructor() {
    this.registerValidator();

    try {
      new FormErrorHandler();
      new FormSubmitHandler();
      new FormResetHandler();
    } catch (error) {
      document.dispatchEvent(
        new CustomEvent("alert:show", {
          bubbles: true,
          detail: {
            title: "Sorry, something went wrong.",
            body: error.message,
            type: "error",
          },
        })
      );
    }
  }

  registerValidator() {
    const forms = document.querySelectorAll("[data-form]");

    forms.forEach((form) => {
      try {
        new FormInputValidation(form);
      } catch (error) {
        document.dispatchEvent(
          new CustomEvent("alert:show", {
            bubbles: true,
            detail: {
              title: "Sorry, something went wrong.",
              body: error.message,
              type: "error",
            },
          })
        );
      }
    });
  }
}
