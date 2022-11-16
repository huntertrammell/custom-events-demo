export class FormSubmitHandler {
  constructor() {
    this.endpoint = "";
    this.form = null;
    this.formData = null;
    this.isSubmissionProcessing = false;
    this.registerSubmit();
  }

  registerSubmit() {
    document.addEventListener("form:submit", (e) => {
      if (!this.isSubmissionProcessing) {
        this.form = e.target;
        this.endpoint = e.target.getAttribute("data-form");
        this.formData = Object.fromEntries(new FormData(this.form));
        this.handleSubmission();
      }
      this.isSubmissionProcessing = true;
    });
  }

  async handleSubmission() {
    try {
      const response = await fetch(this.endpoint, {
        method: "POST",
        body: JSON.stringify(this.formData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        // trigger error notification
        this.isSubmissionProcessing = false;
        this.form.dispatchEvent(
          new CustomEvent("alert:show", {
            bubbles: true,
            detail: {
              title: "Sorry, something went wrong.",
              body: "Please try to submit the form again.",
              type: "error",
            },
          })
        );
        return;
      }

      const data = await response.json();
      console.log("data: ", data);

      this.form.dispatchEvent(
        new CustomEvent("alert:show", {
          bubbles: true,
          detail: {
            title: "Your form has been successfully submitted!",
            body: "We will reach out as soon as possible.",
            type: "success",
          },
        })
      );

      this.form.dispatchEvent(
        new CustomEvent("form:reset", {
          bubbles: true,
        })
      );
      this.isSubmissionProcessing = false;
    } catch (error) {
      this.form.dispatchEvent(
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
  }
}
