class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }


  _checkResponse(res){
    return res.ok ? res.json() : Promise.reject(res.StatusText)
  }


  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
    .then(this._checkResponse)
  }

  editProfile = (name, about) => {
    console.log(name, about)
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name,
        about,
      })
    })
    .then(this._checkResponse)
  }

  editAvatar(avatar) {
    console.log(avatar);
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        avatar
      })
    })
    .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('jwt') }`   //app.js..handlelogin 1st parameter 'jwt'
      }
    })
    .then(this._checkResponse)
  } //name  & link in the body check m.

  addCard({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      method: "POST",
      body: JSON.stringify({ name, link })
    })
    .then(this._checkResponse)
  }

  addLike = (id) => {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  removeLike = (id) => {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`},
    })
    .then(this._checkResponse)
  }

  cardLikeStatusChange = (id, isLiked) => {
    const method = isLiked ? "DELETE" : "PUT";
    console.log(id, isLiked);
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
    method: method,
    })
    .then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      method: "DELETE",
    })
    .then(this._checkResponse)
  }
}


const api = new Api({
  baseUrl: 'http://localhost:3001',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    "Content-Type": "application/json"
  }
})

export default api;
