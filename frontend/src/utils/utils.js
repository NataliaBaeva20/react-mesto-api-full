export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__btn',
  inactiveButtonClass: 'form__btn_invalid',
  inputErrorClass: 'form__input_invalid'
}

export const editPopupSelector = '.popup_type_edit';
export const addPopupSelector  = '.popup_type_add';
export const imagePopupSelector = '.popup_type_image';
export const deletePopupSelector = '.popup_type_delete';
export const avatarPopupSelector = '.popup_type_avatar';

export const formEditElement = document.querySelector('.form_type_edit');
export const formAddElement = document.querySelector('.form_type_add');
export const formAvararElement = document.querySelector('.form_type_avatar');

export const buttonFormAdd = document.querySelector('.form__btn_type_add');
export const buttonFormEdit = document.querySelector('.form__btn_type_edit');
export const buttonFormAvatar = document.querySelector('.form__btn_type_avatar');
