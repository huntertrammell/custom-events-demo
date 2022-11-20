import { FormInputValidation } from "./validation";
import { vi } from "vitest";

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
