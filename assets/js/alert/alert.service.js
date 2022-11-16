export class AlertService {
  constructor() {
    this.alert = document.querySelector("[data-alert]");
    this.alertTitle = this.alert.querySelector("[data-alert-title]");
    this.alertBody = this.alert.querySelector("[data-alert-body]");

    document.addEventListener("alert:show", (e) => {
      this.populateAlert(e.detail);
      setTimeout(() => this.populateAlert("", "", ""), 5000);
    });
  }

  populateAlert({ title, body, type }) {
    this.alert.setAttribute("data-alert", type);
    this.alertTitle.textContent = title;
    this.alertBody.textContent = body;
  }
}
