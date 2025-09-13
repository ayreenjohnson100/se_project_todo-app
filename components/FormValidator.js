import { validationConfig } from "../utils/constants.js";

class FormValidator {
  constructor(settings, formEl) {
    this._settings = settings;
    this._formEl = formEl;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
  }

  // TODO #1 — check a single input
  checkInputValidity(inputElement) {
    checkInputValidity(this._formEl, inputElement, this._settings);
  }

  // TODO #2 — wire listeners + button state
  setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );

    const buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );
    toggleButtonState(this._inputList, buttonElement, this._settings);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.checkInputValidity(inputElement);
        toggleButtonState(this._inputList, buttonElement, this._settings);
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this.setEventListeners();
  }
}

export default FormValidator;
