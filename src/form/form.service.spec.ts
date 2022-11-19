import { FormService } from "./form.service";
import { vi } from "vitest";

describe("form.service.ts", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    document.body.innerHTML = initHTML();
  });

  describe("form service", () => {
    it("should initialize the service", () => {
      const FormClassSpy = vi.spyOn(FormService.prototype, "registerValidator");
      const service = new FormService();

      expect(service).toBeDefined();
      expect(FormClassSpy).toHaveBeenCalled();
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
