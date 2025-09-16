import { checkInputValidity, toggleButtonState } from "../scripts/validate.js";

class FormValidator {
  constructor(settings, formEl) {
    this._settings = settings;
    this._formEl = formEl;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputList = [];
  }

  checkInputValidity(inputElement) {
    checkInputValidity(this._formEl, inputElement, this._settings);
  }

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
    this._formEl.addEventListener("submit", (e) => e.preventDefault());
    this.setEventListeners();
  }

  resetValidation() {
    const buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );
    toggleButtonState(this._inputList, buttonElement, this._settings);

    this._inputList.forEach((input) => {
      input.value = "";
      const err = this._formEl.querySelector(`#${input.id}-error`);
      if (err) err.textContent = "";
      input.classList.remove(this._settings.inputErrorClass);
    });
  }
}

export default FormValidator; // <-- IMPORTANT
