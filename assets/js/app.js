import { FormService } from "./form/form.service.js";

document.addEventListener("DOMContentLoaded", () => {
  try {
    new FormService();
  } catch (error) {
    console.error(error);
  }
});
