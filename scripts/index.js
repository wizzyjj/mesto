const editButton = document.querySelector(".profile__edit-button");
const formProfile = document.querySelector('.popup__form-edit');
const popupName = formProfile.querySelector(".form__input_field_name");
const popupProfession = formProfile.querySelector(".form__input_field_job");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const cardsContainer = document.querySelector('.elements__ul');
const cardAddButton = document.querySelector('.profile__add-button');
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
  item.addEventListener('mousedown', closeByOverlay);
 document.addEventListener('keydown', closeByEscBtn);
}

function closePopup(item) {
  item.closest('.popup').classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscBtn);
}

function submitEditProfileForm(event) {
  event.preventDefault();
  profileName.textContent = popupName.value;
  profileJob.textContent = popupProfession.value;
  closePopup(editPopup);
}

formProfile.addEventListener('submit', submitEditProfileForm);
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

 cardImage.addEventListener('click', function() {
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

initialCards.forEach((item) => {
  addCard(createCard(item.name, item.link));
})

formAddCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  addCard(createCard(titleCardElem.value, linkCardElem.value));
  closePopup(addCardPopup);
  formAddCard.reset();
});

function closeByOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    console.log('Overlay clicked');
    closePopup(evt.target);
  };
}

function closeByEscBtn(evt) {
  if (evt.key === 'Escape') {
    console.log('Escape pressed');
    const popup = document.querySelectorAll('.popup');
    popup.forEach(closePopup);
  };
}