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

  getInitialCards(token) {
    return fetch(`${this._url}/cards/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(this._checkResponse)
    .then(data => {
      return data;
    });
  }

  postCard({name, link}, token) {
    return fetch(`${this._url}/cards`, {
       method: 'POST',
       headers: { ...this._headers, Authorization: `Bearer ${token}` },
       body: JSON.stringify({
         name: name,
         link: link
       })
     })
       .then(this._checkResponse);
   }

  deleteCard(id, token) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: { ...this._headers, Authorization: `Bearer ${token}` }
    })
      .then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked, token) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    })
      .then(this._checkResponse);
  }

  getUserInfo(token) {
     return fetch(`${this._url}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(this._checkResponse);
  }

  setUserInfo({name, about}, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._checkResponse);
  }

  setUserAvatar(avatar, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(this._checkResponse);
  }
}

const api = new Api({
  url: 'https://api.mesto.domainname.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
