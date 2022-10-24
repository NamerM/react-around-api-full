// export const BASE_URL = "http://localhost:3001";
export const BASE_URL = "https://api.mnamer.students.nomoredomainssbs.ru"

// let node_env = "production";

// export let BASE_URL =
//   node_env === "production"
//     ? "https://api.mnamer.students.nomoredomainssbs.ru"
//     : "http://localhost:3000"

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
      authorization: `Bearer ${token}`
    },
  })
}

