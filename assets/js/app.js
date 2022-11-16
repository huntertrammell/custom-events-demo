import { FormService } from "./form/form.service.js";
import { AlertService } from "./alert/alert.service.js";

document.addEventListener("DOMContentLoaded", () => {
  try {
    new FormService();
    new AlertService();
  } catch (error) {
    document.dispatchEvent(
      new CustomEvent("alert:show", {
        bubbles: true,
        detail: {
          title: "Sorry, something went wrong.",
          body: error.message,
          type: "error",
        },
      })
    );
  }

  const coreFetch = window.fetch;

  window.fetch = (input, init) => {
    if (input === "/api/test") {
      return new Promise((resolve) => {
        resolve({
          status: 200,
          ok: true,
          json: () => Promise.resolve(JSON.parse(init.body)),
        });
      });
    } else if (input === "/api/test/error") {
      return new Promise((resolve) => {
        resolve({
          status: 500,
          ok: false,
        });
      });
    } else {
      return coreFetch(input, init);
    }
  };
});
