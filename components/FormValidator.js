export default class FormValidator {
  constructor(settings, formEl) {
    this._settings = settings;
    this._formEl = formEl;

    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;

    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._inputList = [];
  }

  _showInputError(inputElement, message) {
    const err = this._formEl.querySelector(`#${inputElement.id}-error`);
    if (!err) return;
    inputElement.classList.add(this._inputErrorClass);
    err.textContent = message;
    err.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const err = this._formEl.querySelector(`#${inputElement.id}-error`);
    if (!err) return;
    inputElement.classList.remove(this._inputErrorClass);
    err.textContent = "";
    err.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState(buttonElement) {
    if (!buttonElement) return;
    const hasInvalid = this._inputList.some((i) => !i.validity.valid);
    if (hasInvalid) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );

    const buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );

    this._toggleButtonState(buttonElement);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(buttonElement);
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

    this._inputList.forEach((input) => {
      this._hideInputError(input);
      input.value = "";
    });
    this._toggleButtonState(buttonElement);
  }
}
