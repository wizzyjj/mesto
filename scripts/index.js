const popupElement = document.querySelector(".popup");
const editButton = document.querySelector(".profile__edit-button");
const formElement = document.querySelector(".form");
const popupName = formElement.querySelector(".form__input_field_name");
const popupProfession = formElement.querySelector(".form__input_field_job");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const formProfile = document.querySelector('.form_modal_profile');
const cardsContainer = document.querySelector('.elements__ul');
const cardAddButton = document.querySelector('.profile__add-button');
const popupEditSave = document.querySelector('.popup__form-edit');
const formAddCard = document.querySelector('.popup__form-add');
const cardPopup = document.querySelector('.popup_pic');
const addCardPopup = document.querySelector('.popup_add');
const buttonsClosePopup = document.querySelectorAll('.popup__button');
const buttonOpenPopupAddCard = document.querySelector('.profile__add-button');
const cardPopupImage = document.querySelector('.popup__image');
const cardPopupCaption = document.querySelector('.popup__caption');
const titleCardElem = document.querySelector('.form__input_name');
const linkCardElem = document.querySelector('.form__input_link');
const editPopup = document.querySelector('.popup_edit'); 

function openPopup(item) {
  item.classList.add('popup_opened');
}

function closePopup(item) {
  item.classList.remove('popup_opened');
}

function submitEditProfileForm(event) {
  event.preventDefault();
  profileName.textContent = popupName.value;
  profileJob.textContent = popupProfession.value;
  closePopup(editPopup);
}

popupEditSave.addEventListener('submit', submitEditProfileForm);
editButton.addEventListener('click', function () {
  openPopup(editPopup);
  popupName.value = profileName.innerText;
  popupProfession.value = profileJob.innerText;
});

buttonOpenPopupAddCard.addEventListener('click', function () {
  openPopup(addCardPopup);
});

buttonsClosePopup.forEach(button => button.addEventListener('click', () => {
  const closeBtn = button.closest('.popup');
  closePopup(closeBtn);
}));

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

  const cardElements = initialCards.map(function (item) {
    return {
      name: item.name,
      link: item.link,
    }
  });

  const createCard = (cardTitle, cardLink) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardContentClone = cardTemplate.querySelector('.element').cloneNode(true);
    const cardImage = cardContentClone.querySelector('.element__image');
    cardImage.src = cardLink;
    cardImage.alt = cardTitle;
    cardContentClone.querySelector('.element__title').textContent = cardTitle;
    cardContentClone.querySelector('.element__like').addEventListener('click', function(evt) {
       evt.target.classList.toggle('card__like_active'); 
    });

  cardContentClone.querySelector('.element__trash').addEventListener('click', function () {
    cardContentClone.remove();
  }); 

  cardContentClone.querySelector('.element__image').addEventListener('click', function() {
    openPopup(cardPopup);
    cardPopupImage.src = cardLink;
    cardPopupImage.alt = cardTitle;
    cardPopupCaption.textContent = cardTitle;
  });
  return cardContentClone
}

const addCard = (newCard) => {
cardsContainer.prepend(newCard);
}

cardElements.forEach((item) => {
addCard(createCard(item.name, item.link))
})

formAddCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  addCard(createCard(titleCardElem.value, linkCardElem.value));
  closePopup(addCardPopup);
  formAddCard.reset();
});







