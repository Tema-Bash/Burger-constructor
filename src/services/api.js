import { URL, tokenlifeTime } from "../utils/consts";
import { checkResponse, setCookie } from "../utils/utils";

export const getUser = (accessTokenValue) => {
  return fetchWithRefresh(`${URL}/auth/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessTokenValue}`,
    },
  });
};

export const updateUser = (accessTokenValue, email, name, password) => {
  return fetchWithRefresh(`${URL}/auth/user`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessTokenValue}`,
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  });
};

export const login = (email, password) => {
  return fetch(`${URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then(checkResponse);
};

export const register = (name, email, password) => {
  return fetch(`${URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  }).then(checkResponse);
};

export const logout = async (refreshTokenValue) => {
  return await fetch(`${URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshTokenValue,
    }),
  }).then(checkResponse);
};

export const forgotPass = (email) => {
  return fetch(`${URL}/password-reset`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
    }),
  }).then(checkResponse);
};

export const resetPass = (token, password) => {
  return fetch(`${URL}/password-reset/reset`, {
    method: "POST",
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  }).then(checkResponse);
};

export const refreshToken = (refreshTokenValue) => {
  return fetch(`${URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshTokenValue,
    })
      .then(checkResponse)
      .then((refreshData) => {
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        setCookie(
          "accessToken",
          refreshData.accessToken.split("Bearer ")[1],
          tokenlifeTime
        );
        localStorage.setItem("refreshToken", refreshData.refreshToken);
        return refreshData;
      }),
  });
};

const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      console.log(`token update`);
      const refreshData = await refreshToken(
        localStorage.getItem("refreshToken")
      );
      options.headers.authorization = refreshData.accessToken;

      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const sendOrder = (ingredients, accessTokenValue) => {
  return fetchWithRefresh(`${URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessTokenValue}`,
    },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  });
};
