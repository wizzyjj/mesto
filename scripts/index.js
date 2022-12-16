const popupElement = document.querySelector(".popup");
const closeButton = popupElement.querySelector(".popup__button");
const editButton = document.querySelector(".profile__edit-button");
const formElement = document.querySelector(".form");
const nameInput = formElement.querySelector(".form__input_field_name");
const jobInput = formElement.querySelector(".form__input_field_job");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");




const openPopup = function () {
nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;
popupElement.classList.add("popup_opened");
};

editButton.addEventListener("click", openPopup);




const closePopup = function () {
popupElement.classList.remove("popup_opened");
};

closeButton.addEventListener("click", closePopup);




function formSubmitHandler(evt) {
evt.preventDefault();
profileName.textContent = nameInput.value;
profileJob.textContent = jobInput.value;
closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);



