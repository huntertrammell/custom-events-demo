import { FormErrorHandler } from "./error";
import { vi } from "vitest";

describe("error.ts", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    document.body.innerHTML = initHTML();
  });

  describe("error service", () => {
    it("should initialize the service", () => {
      const eventSpy = vi.spyOn(document, "addEventListener");
      const service = new FormErrorHandler();

      expect(service).toBeDefined();
      expect(eventSpy).toBeCalledWith("input:error", expect.any(Function));
      expect(eventSpy).toBeCalledWith("input:valid", expect.any(Function));
    });

    it("should apply error state when input:error is called", () => {
      const service = new FormErrorHandler();
      const errorHandlerSpy = vi.spyOn(service, "applyInputErrorState");
      const input = document.querySelector(
        "[data-form-field]"
      ) as HTMLInputElement;
      const errorField = document.getElementById("errorField");

      input.dispatchEvent(
        new CustomEvent("input:error", {
          bubbles: true,
          detail: {
            errorField,
          },
        })
      );

      expect(errorHandlerSpy).toBeCalledWith(input, { errorField });
    });

    it("should apply error state when input:valid is called", () => {
      const service = new FormErrorHandler();
      const errorHandlerSpy = vi.spyOn(service, "resetInputErrorState");
      const input = document.querySelector(
        "[data-form-field]"
      ) as HTMLInputElement;
      const errorField = document.getElementById("errorField");

      input.dispatchEvent(
        new CustomEvent("input:valid", {
          bubbles: true,
          detail: {
            errorField,
          },
        })
      );

      expect(errorHandlerSpy).toBeCalledWith(input, { errorField });
    });
  });

  const initHTML = () => {
    return `
         <form data-form>
            <input name="first-name" id="first-name" data-form-field aria-invalid="false"/>
            <p id="errorField" aria-hidden="true"></p>
            <button data-form-submit type="button">Click me pls</button>
         </form>
        `;
  };
});
