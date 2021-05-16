import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Card from './Card';
import editAvatarPath from '../image/edit-avatar.svg';
import addBtnPath from '../image/add-btn.svg';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content page__content">
      <section className="profile content__section">
        <div className="profile__image-block">
          <img src={currentUser.avatar} alt="Фото профиля" className="profile__image" />
          <div className="profile__image-cover" onClick={props.onEditAvatar}>
            <img src={editAvatarPath} alt="редактирование фото профиля" className="profile__image-edit" />
          </div>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
            <button type="button" className="profile__edit-btn" aria-label="Редактировать" onClick={props.onEditProfile}></button>
            <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-btn" aria-label="Добавить" onClick={props.onAddPlace}><img src={addBtnPath} alt="Изображение кнопки добавить" className="profile__add-btn-image" /></button>
      </section>
      <section className="cards content__section">
        {
          props.cards.map(item => (
                <Card
                  key={item._id}
                  cardId = {item._id}
                  link={item.link}
                  name={item.name}
                  ownerId={item.owner._id}
                  likes = {item.likes}
                  likesCount={item.likes.length}
                  onCardClick={props.onCardClick}
                  onCardLike={props.onCardLike}
                  onCardDelete={props.onCardDelete}
                />
                )
          )
        }
      </section>
    </main>
  );
}

export default Main;
