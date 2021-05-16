import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const inputAvatarRef = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputAvatarRef.current.value
    });
  }

  return(
    <PopupWithForm title="Обновить аватар" name="avatar" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <>
        <input ref={inputAvatarRef} id="email-avatar" type="url" name="avatar" className="form__input form__input_value_avatar" placeholder="Ссылка на аватарку" required />
        <span className="form__input-error email-avatar-error"></span>
        <button type="submit" className="form__btn form__btn_type_avatar">Сохранить</button>
      </>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
