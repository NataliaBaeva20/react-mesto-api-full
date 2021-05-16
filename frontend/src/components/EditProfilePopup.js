import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChange(e) {
    e.target.name === 'name' ? setName(e.target.value) : setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return(
    <PopupWithForm title="Редактировать профиль" name="edit" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <>
        <input id="name-profile" type="text" name="name" value={name} onChange={handleChange} className="form__input form__input_value_name" placeholder="Имя пользователя" required minLength="2" maxLength="40" />
        <span className="form__input-error name-profile-error"></span>
        <input id="job-profile" type="text" name="description" value={description} onChange={handleChange} className="form__input form__input_value_job" placeholder="О себе" required minLength="2" maxLength="200" />
        <span className="form__input-error job-profile-error"></span>
        <button type="submit" className="form__btn form__btn_type_edit">Сохранить</button>
      </>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
