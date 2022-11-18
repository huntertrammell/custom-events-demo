import { IAlertShow } from "./alert.events";

export class AlertService {
  alert: HTMLElement;
  alertTitle: HTMLElement;
  alertBody: HTMLElement;

  constructor() {
    this.alert = document.querySelector("[data-alert]") as HTMLElement;
    this.alertTitle = this.alert.querySelector(
      "[data-alert-title]"
    ) as HTMLElement;
    this.alertBody = this.alert.querySelector(
      "[data-alert-body]"
    ) as HTMLElement;

    document.addEventListener("alert:show", (e) => {
      this.populateAlert(e.detail);
      setTimeout(
        () =>
          this.populateAlert({ title: "", body: "", type: "" } as IAlertShow),
        5000
      );
    });
  }

  populateAlert({ title, body, type }: IAlertShow) {
    this.alert.setAttribute("data-alert", type);
    this.alertTitle.textContent = title;
    this.alertBody.textContent = body;
  }
}
