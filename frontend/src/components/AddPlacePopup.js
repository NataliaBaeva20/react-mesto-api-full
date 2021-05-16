import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChange(e) {
    e.target.name === 'name' ? setName(e.target.value) : setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link
    });
    setName('');
    setLink('');
  }

  return(
    <PopupWithForm title="Новое место" name="add" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
        <>
          <input  id="name-card" type="text" name="name" value={name} onChange={handleChange} className="form__input form__input_type_add form__input_value_card-name" placeholder="Название" required minLength="2" maxLength="30" />
          <span className="form__input-error name-card-error"></span>
          <input  id="email-card" type="url" name="link" value={link} onChange={handleChange} className="form__input form__input_type_add form__input_value_card-link" placeholder="Ссылка на картинку" required />
          <span className="form__input-error email-card-error"></span>
          <button type="submit" className="form__btn form__btn_type_add">Создать</button>
        </>
      </PopupWithForm>
  );
}

export default AddPlacePopup;
