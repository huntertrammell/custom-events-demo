import { FormInputValidation } from "./utils/validation";
import { FormErrorHandler } from "./utils/error";
import { FormSubmitHandler } from "./utils/submission";
import { FormResetHandler } from "./utils/reset";

export class FormService {
  constructor() {
    this.registerValidator();

    new FormErrorHandler();
    new FormSubmitHandler();
    new FormResetHandler();
  }

  registerValidator() {
    const forms = document.querySelectorAll(
      "[data-form]"
    ) as NodeListOf<HTMLFormElement>;

    forms.forEach((form) => {
      new FormInputValidation(form);
    });
  }
}
