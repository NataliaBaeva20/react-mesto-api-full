import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.owner === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.likes.some(i => i === currentUser._id);

  function handleClick() {
    props.onCardClick(props);
  }

  function handleLikeClick() {
    props.onCardLike(props);
  }

  function handleDeleteClick() {
    props.onCardDelete(props);
  }

  return (
    <article className="card" >
      <button type="button" className={`card__trash-btn ${isOwn && 'card__trash-btn_visible'}`} onClick={handleDeleteClick}></button>
      <img alt="Изображение места" src={props.link} className="card__image" onClick={handleClick} />
      <div className="card__block">
        <h2 className="card__title">{props.name}</h2>
        <div className="card__like-block">
          <button type="button" className={`card__like ${isLiked && 'card__like_active'}`} onClick={handleLikeClick}></button>
          <p className="card__like-count">{props.likesCount}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
