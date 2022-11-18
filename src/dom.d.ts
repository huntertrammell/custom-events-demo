import { IAlertShow } from "./alert/alert.events";
import { IFormReset, IFormSubmit, IInputError, IInputValid } from "./form/form.events";

interface CustomEventMap {
  "alert:show": CustomEvent<IAlertShow>;
  "input:error": CustomEvent<IInputError>;
  "input:valid": CustomEvent<IInputValid>;
    "form:submit": CustomEvent<IFormSubmit>;
    "form:reset": CustomEvent<IFormReset>
}
declare global {
  interface Document {
    addEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => void
    ): void;
  }
}

export {};
