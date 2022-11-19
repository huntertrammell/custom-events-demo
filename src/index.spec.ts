import { FormService } from "./form/form.service";
import { vi } from "vitest";
import { initApp } from ".";

describe("index.ts", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    document.body.innerHTML = initHTML();
  });

  describe("DOMContentLoaded", () => {
    it("should initialize services when DOMContentLoaded is triggered", () => {
      let eventSpy = vi.spyOn(document, "addEventListener");

      initApp();

      document.dispatchEvent(new CustomEvent("DOMContentLoaded"));

      expect(eventSpy).toBeCalledWith("DOMContentLoaded", expect.any(Function));
    });
  });

  const initHTML = () => {
    return `
         <form data-form>
            <input name="first-name" id="first-name" data-form-field/>
            <button data-form-submit type="button">Click me pls</button>
         </form>
        `;
  };
});
