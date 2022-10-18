class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }


  _checkResponse(res){
    return res.ok ? res.json() : Promise.reject(res.StatusText)
  }


  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    }).then(this._checkResponse)
  }

  editProfile = (name, about) => {
    return fetch(this._baseUrl + '/users/me', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      })
    })
    .then(this._checkResponse)
  }

  editAvatar(avatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers:
        this._headers,
        // Authorization: `Bearer ${localStorage.getItem('token') }`  //app.js..handlelogin 1st parameter 'token'
    })
    .then(this._checkResponse)
  } //name  & link in the body check m.

  addCard(name, link,) {
    return fetch(this._baseUrl + '/cards', {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      })
    })
    .then(this._checkResponse)
  }

  addLike = (id) => {
    return fetch(this._baseUrl + '/cards/likes/' + id, {
      method: "PUT",
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  removeLike = (id) => {
    return fetch(this._baseUrl + '/cards/likes/' + id, {
      method: "DELETE",
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  cardLikeStatusChange = (id, isLiked) => {
    const method = !isLiked ? "DELETE" : "PUT";
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
    method: method,
    headers: this._headers
    })
    .then(res => this._checkResponse(res))
  }

  deleteCard(id) {
    return fetch(this._baseUrl + '/cards/' + id, {
      method: "DELETE",
      headers: this._headers
    })
    .then(this._checkResponse)
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "9398a483-484e-4ebd-a374-b6b3b985e9c4",
    "Content-Type": "application/json"
  }
}) // this._baseUrl // this._headers

export default api;
