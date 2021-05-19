import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api.js';
import * as auth from '../utils/auth';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from "./ProtectedRoute";


function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({avatar: '', name: 'имя', about: 'о себе'});
  const [cards, setCards] = React.useState([]);
  const [email, setEmail] = React.useState('');

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltip, setInfoTooltip] = React.useState({isOpen: false, message: '', success: false});
  const [selectedCard, setselectedCard] = React.useState({isOpen: false, link: '', title: ''});
  const history = useHistory();

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setselectedCard({isOpen: true, link: card.link, title: card.name});
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setselectedCard({link: '', title: '', isOpen: false});
    setInfoTooltip({isOpen: false, message: ''});
  }

  function handleUpdateUser({name, about}) {
    api.setUserInfo({name, about}, localStorage.getItem('jwt'))
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar({avatar}) {
    api.setUserAvatar(avatar, localStorage.getItem('jwt')).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleAddPlaceSubmit({name, link}) {
    api.postCard({name, link}, localStorage.getItem('jwt'))
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card.cardId, !isLiked, localStorage.getItem('jwt')).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card.cardId ? newCard : c));
    })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card.cardId, localStorage.getItem('jwt')).then(() => {
      setCards((state) => state.filter((c) => c._id === card.cardId ? '' : c));
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  }

  function handelRegisterUser(password, email) {
    if(!password || !email) {
      return setInfoTooltip({isOpen: true, message: 'Одно из полей не заполнено.', success: false});
    }
    auth.register(password, email).then((res) => {
      console.log(res);
      setInfoTooltip({isOpen: true, message: 'Вы успешно зарегистрировались!', success: true});
    })
    .catch((err) => {
      console.log(err);
      setInfoTooltip({isOpen: true, message: 'Что-то пошло не так! Попробуйте еще раз.', success: false});
    });
  }

  function handleLoginUser(password, email) {
    if(!password || !email) {
      return setInfoTooltip({isOpen: true, message: 'Одно из полей не заполнено.', success: false});
    }
    auth.authorize(password, email).then((data) => {
        if(data.token) {
          setEmail(email);
          setLoggedIn(true);
          history.push('/');
        }
    })
    .catch(err => {
      console.log(err);
      setInfoTooltip({isOpen: true, message: 'Пользователь не найден.', success: false})
    });
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  function tokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        auth.getContent(jwt).then((res) => {
          if (res) {
            setEmail(res.email);
            setLoggedIn(true);
            history.push('/');
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      api.getInitialCards(localStorage.getItem('jwt'))
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      api.getUserInfo(localStorage.getItem('jwt'))
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {loggedIn && (<Header link="" email={email} nameLink="Выйти" onSignOut={handleSignOut} />)}
        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path="/sign-up">
            <Header link="/sign-in" nameLink="Войти"/>
            <Register onRegister={handelRegisterUser} />
          </Route>
          <Route path="/sign-in">
            <Header link="/sign-up" nameLink="Регистрация"/>
            <Login onLogin={handleLoginUser} />
          </Route>
        </Switch>
        {loggedIn && (<Footer />)}
      </div>

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

      <PopupWithForm title="Вы уверены?" name="delete">
        <>
          <button type="submit" className="form__btn form__btn_type_delete">Да</button>
        </>
      </PopupWithForm>
      <InfoTooltip tooltip={isInfoTooltip} onClose={closeAllPopups}/>
      <ImagePopup card={selectedCard}  onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
