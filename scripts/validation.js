  const showInputError = (formElement, inputElement, errorMessage, selectors) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
    inputElement.classList.add(selectors.inputErrorClass); 
    errorElement.classList.add(selectors.errorClass); 
    errorElement.textContent = errorMessage; 
  };
  

  const hideInputError = (formElement, inputElement, selectors) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(selectors.inputErrorClass); 
    errorElement.classList.remove(selectors.errorClass);
    errorElement.textContent = ''; 
  };
  

  const isValid = (formElement, inputElement, selectors) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, selectors); 
    } else {
      hideInputError(formElement, inputElement, selectors); 
    }
  }
  

  const hasInvalid = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
  }
  

  const setEventListeners = (formElement, selectors) => {
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
      inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, selectors);
        setButtonState(inputList, buttonElement, selectors);
      });
    });
    setButtonState(inputList, buttonElement, selectors); 
  };
  

  const setButtonState = (inputList, buttonElement, selectors) => {
    if (hasInvalid(inputList)) { 
      buttonElement.classList.add(selectors.inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove(selectors.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }
  

  const enableValidation = (selectors) => {
    const formList = Array.from(document.querySelectorAll(selectors.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement, selectors);
    });
  };

  enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__submit-button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  });
  
