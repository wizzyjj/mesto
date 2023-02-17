import initialCards from './cards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupImg = document.querySelector('.popup__image');
const popupForm = document.querySelector('.form');
const formElement = document.querySelector('.popup__container');
const inputName = formElement.querySelector('.form__input_field_name');
const inputJob = formElement.querySelector('.form__input_field_job');
const inputTitle = popupAdd.querySelector('.form__input_name');
const inputLink = popupAdd.querySelector('.form__input_link');
const popupOpenImage = document.querySelector('.popup_pic');
const buttonSaveCardInfo = popupAdd.querySelector('.popup__container');
const popupFigureCaption = document.querySelector('.popup__caption');
const popupButtonsClose = document.querySelectorAll('.popup__button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileButtonAdd = document.querySelector('.profile__add-button');
const profileButtonEdit = document.querySelector('.profile__edit-button');
const sectionGallery = document.querySelector('.elements');

const configuration = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

const closePopupClick = (evt) => {
  if (evt.target === evt.currentTarget) {
    handleClosePopup(evt.target);
  };
};

const closePopupEscape = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    handleClosePopup(popupOpened);
  };
};

export const handleOpenPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
};

export const handleClosePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
};

function prependCard(targetElement) {
  sectionGallery.prepend(targetElement);
}

function createCard(item) {
  const card = new Card(item, '#card-template');
  const cardElement = card.createCard();
  return cardElement
}

function handleSubmitFormAddCard(evt) {
  evt.preventDefault();
  prependCard(createCard(inputTitle.value, inputLink.value));
  evt.target.reset();
  handleClosePopup(popupAdd);
};

const handleSubmitFormProfile = (evt) => {
  evt.preventDefault(); 
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputJob.value;
  handleClosePopup(popupEdit);
};

const openResetAddCard = () => {
  inputTitle.value = '';
  inputLink.value = '';
  formValidAddCard.resetValidation();
  handleOpenPopup(popupAdd);
};

const openAddProfilePopup = () => {
  inputName.value = profileTitle.textContent;
  inputJob.value = profileSubtitle.textContent;
  formValidProfile.resetValidation();
  handleOpenPopup(popupEdit);
};

popupButtonsClose.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => handleClosePopup(popup));
});

profileButtonAdd.addEventListener('click', () => {
  openResetAddCard();
});

profileButtonEdit.addEventListener('click', () => {
  openAddProfilePopup();
});

buttonSaveCardInfo.addEventListener('submit', handleSubmitFormAddCard);

popupForm.addEventListener('submit', (evt) => handleSubmitFormProfile(evt));

popups.forEach((element) => {
  const popup = element.closest('.popup');
  popup.addEventListener('click', (evt) => closePopupClick(evt));
});

 initialCards.forEach((item) => { 
  const card = new Card(item, '#card-template'); 
  const cardElement = card.createCard(); 
  sectionGallery.append(cardElement); 
});  

const formValidProfile = new FormValidator(configuration, popupEdit);
formValidProfile.enableValidation();

const formValidAddCard = new FormValidator(configuration, popupAdd);
formValidAddCard.enableValidation();

export { popupOpenImage, popupImg, popupFigureCaption };