# Custom Events

This is a simple a11y friendly form and alert service implementation that relies on custom events to trigger error states. This service was built to support multiple forms on the same page. The alert markup is reused and reset after each event. 

Live Demo: https://form-validation-service.netlify.app/

## Installation

```bash
yarn install
```

```js
yarn dev // Start dev server
yarn build // Build for production
yarn preview // Preview production build
yarn test // Run tests
yarn coverage // Generate coverage maps
```

## Form Service

- `data-form`: Added to the form element, the value passed in should be the endpoint the form should POST to.
- `data-form-field`: Added to each element to be validated. **Required attributes: `aria-invalid`, `name`**
  - Error handling works by providing the same id as the corresponding input and appending `-error` to the end. **Required attributes: `aria-hidden`**
- `data-form-submit`: Added onto the button used for submission. Note that submission rely's on click. **Required attributes: `aria-disabled`**

### Usage

```html
<form data-form="https://jsonplaceholder.typicode.com/">
  <input
    data-form-field
    type="text"
    name="example"
    id="example"
    aria-invalid="false"
    aria-describedBy="example-error"
  />
  <p aria-hidden="true" id="example-error">Please correct the errors</p>
  <button aria-disabled="true" data-form-submit type="button">Submit</button>
</form>
```

```js
new FormService();
```

## Alert Service

- `data-alert`: Accepts the following types: `success` or `error`, when no value is provided alert is hidden
- `data-alert-title`: Defines the text to be displayed in bold at the top of the alert
- `data-alert-body`: Defines the text to be displayed at the bottom of the alert

### Usage

```html
<div role="alert" data-alert>
  <p data-alert-title></p>
  <p data-alert-body></p>
</div>
```

```js
new AlertService();
```

## Endpoint Mocking

When `/api/test` is hit it will mock a sucessful API response for testing purposes. If `/api/test/error` is set as the endpoint for the form, it will return a bad response.

