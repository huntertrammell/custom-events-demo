import { FormInputValidation } from "./utils/validation";
import { FormErrorHandler } from "./utils/error";
import { FormSubmitHandler } from "./utils/submission";
import { FormResetHandler } from "./utils/reset";
import { catchError } from "../utils/error";

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
            body: catchError(error),
            type: "error",
          },
        })
      );
    }
  }

  registerValidator() {
    const forms = document.querySelectorAll("[data-form]") as NodeListOf<HTMLFormElement>;

    forms.forEach((form) => {
      try {
        new FormInputValidation(form);
      } catch (error) {
        document.dispatchEvent(
          new CustomEvent("alert:show", {
            bubbles: true,
            detail: {
              title: "Sorry, something went wrong.",
              body: catchError(error),
              type: "error",
            },
          })
        );
      }
    });
  }
}
