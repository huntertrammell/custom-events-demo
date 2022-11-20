import { FormSubmitHandler } from "./submission";
import { mockFetch } from "../../utils/mockFetch";
import { vi } from "vitest";

describe("submission.ts", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    document.body.innerHTML = initHTML();
  });

  describe("submit service", () => {
    it("should initialize the service", () => {
      const service = new FormSubmitHandler();

      expect(service).toBeDefined();
    });

    it("should listen for the form:submit event", () => {
      const service = new FormSubmitHandler();
      const resetHandlerSpy = vi.spyOn(service, "registerSubmit");
      const form = document.querySelector("[data-form]") as HTMLFormElement;
      const input = document.querySelector(
        "[data-form-field]"
      ) as HTMLInputElement;

      input.value = "hello world";

      service.registerSubmit();

      form.dispatchEvent(
        new CustomEvent("form:submit", {
          bubbles: true,
        })
      );

      expect(resetHandlerSpy).toBeCalled();
      expect(service.isSubmissionProcessing).toStrictEqual(true);
      expect(service.formData).toStrictEqual({ "first-name": "hello world" });
    });

    it("should handle a successful API response", async () => {
      mockFetch();
      const service = new FormSubmitHandler();
      const fetchSpy = vi.spyOn(window, "fetch");

      service.endpoint = "/api/test";

      service.handleSubmission();

      expect(fetchSpy).toBeCalled();
    });

    it("should handle a bad API response", () => {
      mockFetch();
      const service = new FormSubmitHandler();
      const input = document.querySelector(
        "[data-form-field]"
      ) as HTMLInputElement;
      const fetchSpy = vi.spyOn(window, "fetch");

      service.endpoint = "/api/test/error";
      input.value = "hello world";

      service.handleSubmission();

      expect(fetchSpy).toBeCalled();
    });
  });

  const initHTML = () => {
    return `
         <form data-form="/url/test">
            <input name="first-name" id="first-name" data-form-field aria-invalid="false"/>
            <p id="errorField" aria-hidden="true"></p>
            <button data-form-submit type="button" aria-disabled="false">Click me pls</button>
         </form>
        `;
  };
});
