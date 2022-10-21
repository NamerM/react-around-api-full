// let node_env = 'production';
export const BASE_URL = "http://localhost:3001";

//  "https://mnamer.students.nomoredomainssbs.ru"


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
 };

export const signin = (email, password) => {
  return checkFetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password }),
  })
    // .then((data) => {
    //   if(data) {
    //       localStorage.setItem("token", data.token);   //"token" = "jwt"
    //       localStorage.setItem("email", email);
    //       return data;
    //     } else {
    //       return
    //     }
    //   })
}

export const checkToken = (token) => {
  return checkFetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`  //${localStorage.getItem(token)}
    },
  })
}

