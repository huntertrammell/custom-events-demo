import { FormInputValidation } from "./validation";
import { vi } from "vitest";
import { FormErrorHandler } from "./error";
import { FormSubmitHandler } from "./submission";

describe("validation.ts", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    document.body.innerHTML = initHTML();
  });

  describe("validation service", () => {
    it("should initialize the service", () => {
      const form = document.querySelector("[data-form]") as HTMLFormElement;
      const service = new FormInputValidation(form);

      expect(service).toBeDefined();
    });

    it("should listen for change events on the form", () => {
      const form = document.querySelector("[data-form]") as HTMLFormElement;
      const service = new FormInputValidation(form);

      const validationSpy = vi.spyOn(service, "validateForm");

      form.dispatchEvent(new Event("change"));

      expect(validationSpy).toBeCalled;
    });

    it("should listen for input events on the form", () => {
      const form = document.querySelector("[data-form]") as HTMLFormElement;
      const service = new FormInputValidation(form);

      const validationSpy = vi.spyOn(service, "validateForm");

      form.dispatchEvent(new Event("input"));

      expect(validationSpy).toBeCalled;
    });

    it("should toggle the state of the submit button", () => {
      const form = document.querySelector("[data-form]") as HTMLFormElement;
      const service = new FormInputValidation(form);
      const button = document.querySelector("[data-form-submit]");
      const input = document.querySelector(
        "[data-form-field]"
      ) as HTMLInputElement;

      input.value = "hello world";

      service.validateForm();

      expect(service.isFormValid).toBe(true);
      expect(button?.ariaDisabled).toBe("false");
    });

    it("should validate input on input", () => {
      const form = document.querySelector("[data-form]") as HTMLFormElement;
      const service = new FormInputValidation(form);
      const errorService = new FormErrorHandler();
      const errorSpy = vi.spyOn(errorService, "resetInputErrorState");
      const input = document.querySelector(
        "[data-form-field]"
      ) as HTMLInputElement;

      input.value = "hello world";

      service.registerInputs();

      input.dispatchEvent(new Event("input"));

      expect(errorSpy).toBeCalled();
    });

    it("should validate input on blur", () => {
      const form = document.querySelector("[data-form]") as HTMLFormElement;
      const service = new FormInputValidation(form);
      const errorService = new FormErrorHandler();
      const errorSpy = vi.spyOn(errorService, "applyInputErrorState");
      const input = document.querySelector(
        "[data-form-field]"
      ) as HTMLInputElement;

      service.registerInputs();

      input.dispatchEvent(new Event("blur"));

      expect(errorSpy).toBeCalled();
    });

    it("should trigger form validation when form submit is clicked", () => {
      const form = document.querySelector("[data-form]") as HTMLFormElement;
      const service = new FormInputValidation(form);
      const submitService = new FormSubmitHandler();
      const submitSpy = vi.spyOn(submitService, "handleSubmission");
      const input = document.querySelector(
        "[data-form-field]"
      ) as HTMLInputElement;
      const button = document.querySelector(
        "[data-form-submit]"
      ) as HTMLButtonElement;

      input.value = "hello world";

      service.handleSubmit();
      button.dispatchEvent(new Event("click"));

      expect(submitSpy).toBeCalled();
    });

    it("should trigger form validation when form submit is clicked", () => {
      const form = document.querySelector("[data-form]") as HTMLFormElement;
      const service = new FormInputValidation(form);
      const submitService = new FormSubmitHandler();
      const submitSpy = vi.spyOn(submitService, "handleSubmission");
      const button = document.querySelector(
        "[data-form-submit]"
      ) as HTMLButtonElement;

      service.handleSubmit();
      button.dispatchEvent(new Event("click"));

      expect(submitSpy).not.toBeCalled();
    });
  });

  const initHTML = () => {
    return `
         <form data-form="/url/test">
            <input name="first-name" id="first-name" data-form-field aria-invalid="false" required/>
            <p id="errorField" aria-hidden="true"></p>
            <button data-form-submit type="button" aria-disabled="false">Click me pls</button>
         </form>
        `;
  };
});
