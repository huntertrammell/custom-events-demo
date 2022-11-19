import "./styles/main.css";
import { FormService } from "./form/form.service";
import { AlertService } from "./alert/alert.service";
import { catchError } from "./utils/error";
import { mockFetch } from "./utils/mockFetch";

export function initApp() {
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
            body: catchError(error),
            type: "error",
          },
        })
      );
    }
  });
}

mockFetch();
initApp();
