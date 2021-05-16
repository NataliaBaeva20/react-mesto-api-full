export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards/`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse)
    .then(data => {
      return data;
    });
  }

  postCard({name, link}) {
    return fetch(`${this._url}/cards`, {
       method: 'POST',
       headers: this._headers,
       body: JSON.stringify({
         name: name,
         link: link
       })
     })
       .then(this._checkResponse);
   }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  getUserInfo() {
     return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  setUserInfo({name, about}) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._checkResponse);
  }

  setUserAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(this._checkResponse);
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    authorization: '809cbb8d-69a2-4b7e-91ef-1af1ed19e42a',
    'Content-Type': 'application/json'
  }
});

export default api;
