import { FormResetHandler } from "./reset";
import { vi } from "vitest";

describe("reset.ts", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    document.body.innerHTML = initHTML();
  });

  describe("reset service", () => {
    it("should initialize the service", () => {
      const service = new FormResetHandler();

      expect(service).toBeDefined();
    });

    it("should listen for the form:reset event", () => {
      const service = new FormResetHandler();
      const resetHandlerSpy = vi.spyOn(service, "resetForm");
      const form = document.querySelector("[data-form]") as HTMLFormElement;

      form.dispatchEvent(
        new CustomEvent("form:reset", {
          bubbles: true,
        })
      );

      expect(resetHandlerSpy).toBeCalledWith(form);
    });

    it("should reset the form", () => {
      const service = new FormResetHandler();
      const form = document.querySelector("[data-form]") as HTMLFormElement;
      const input = document.querySelector(
        "[data-form-field]"
      ) as HTMLInputElement;
      const button = document.querySelector(
        "[data-form-submit]"
      ) as HTMLButtonElement;

      input.value = "hello world";
      button.ariaDisabled = "false";

      service.resetForm(form);

      expect(input.value).toStrictEqual("");
      expect(button.ariaDisabled).toStrictEqual("true");
    });
  });

  const initHTML = () => {
    return `
         <form data-form>
            <input name="first-name" id="first-name" data-form-field aria-invalid="false"/>
            <p id="errorField" aria-hidden="true"></p>
            <button data-form-submit type="button" aria-disabled="false">Click me pls</button>
         </form>
        `;
  };
});
