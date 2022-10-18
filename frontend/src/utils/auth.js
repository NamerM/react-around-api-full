export const BASE_URL = "https://register.nomoreparties.co";

const checkFetch = (url, headers) => {
  return fetch(url, headers).then((res) =>
  res.ok ? res.json() : Promise.reject(res.StatusText)
  )
}

export const signup = (email, password) => {  //register yerine signup var
  return checkFetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password }),
  })
    // .then((response) => {
    //   if (response.status === 201) {
    //     return response.json();
    //   }
    //   if (response.status === 400) {
    //     throw new Error('Missing information in one or more fields');
    //   }
    // })
 };

export const signin = (email, password) => {   // login yerine signin
  return checkFetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password }),
  })
  // .then((response) => {
  //   if (response.status === 200) {
  //     return response.json();
  //   }
  //   if (response.status === 400) {
  //     throw new Error('Missing information in one or more fields');
  //   }
  //   if (response.status === 401) {
  //     throw new Error('The user with the specified email has not found');
  //   }
  // })
    .then((data) => {
      if(data) {
          localStorage.setItem("token", data.token);   //"token" = "jwt"
          localStorage.setItem("email", email);
          return data;
        } else {
          return
        }
      })

}

export const checkToken = (token) => {
  return checkFetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`  //${localStorage.getItem(token)}
    },
  })
  // .then((response) => {
  //   if (response.status === 200 || response.status === 201) {
  //     return response.json();
  //   }
  //   if (response.status === 400) {
  //     throw new Error ('Token is missing or provided in wrong Format')
  //   }
  // })
  // .then((res) => {
  //   return res;
  // })
}

