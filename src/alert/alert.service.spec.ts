import { vi } from "vitest";
import { IAlertShow } from "./alert.events";
import { AlertService } from "./alert.service";

describe("alert.service.ts", () => {
  let alert: AlertService;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.useFakeTimers();
    document.body.innerHTML = initHTML();

    alert = new AlertService();
  });

  describe("alert service", () => {
    it("should initialize the service", () => {
      expect(alert).toBeDefined();
    });

    it("should initialize the service", () => {
      const alertObj: IAlertShow = {
        title: "Hello World",
        body: "my test",
        type: "success",
      };

      alert.populateAlert(alertObj);

      expect(alert.alert.getAttribute("data-alert")).toStrictEqual("success");
      expect(alert.alertTitle.textContent).toStrictEqual(alertObj.title);
      expect(alert.alertBody.textContent).toStrictEqual(alertObj.body);
    });

    describe("alert:show", () => {
      it("should populate text with event.detail", () => {
        const alertObj: IAlertShow = {
          title: "Hello",
          body: "World",
          type: "error",
        };

        document.dispatchEvent(
          new CustomEvent("alert:show", { detail: alertObj })
        );

        expect(alert.alert.getAttribute("data-alert")).toStrictEqual("error");
        expect(alert.alertTitle.textContent).toStrictEqual(alertObj.title);
        expect(alert.alertBody.textContent).toStrictEqual(alertObj.body);
      });

      it("should remove alert text after 5 seconds", () => {
        const alertObj: IAlertShow = {
          title: "Hello",
          body: "World",
          type: "error",
        };

        document.dispatchEvent(
          new CustomEvent("alert:show", { detail: alertObj })
        );

        vi.runAllTimers();

        expect(alert.alert.getAttribute("data-alert")).toStrictEqual("");
        expect(alert.alertTitle.textContent).toStrictEqual("");
        expect(alert.alertBody.textContent).toStrictEqual("");
      });
    });
  });

  const initHTML = () => {
    return `
         <div data-alert>
            <p data-alert-title></p>
            <p data-alert-body></p>
         </div>
        `;
  };
});
