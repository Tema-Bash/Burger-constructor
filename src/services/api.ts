import { URL, tokenlifeTime } from "../utils/consts";
import { checkResponse, setCookie } from "../utils/utils";
import { TIngredient } from "../services/types/data";

export const getUser = async (accessTokenValue: string) => {
  return await fetchWithRefresh(`${URL}/auth/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessTokenValue}`,
    },
  });
};

export const updateUser = (
  accessTokenValue: string,
  email: string,
  name: string,
  password: string
) => {
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

export const login = (email: string, password: string) => {
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

export const register = (name: string, email: string, password: string) => {
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

export const logout = async (refreshTokenValue: string) => {
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

export const forgotPass = (email: string) => {
  return fetch(`${URL}/password-reset`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
    }),
  }).then(checkResponse);
};

export const resetPass = (token: string, password: string) => {
  return fetch(`${URL}/password-reset/reset`, {
    method: "POST",
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  }).then(checkResponse);
};

export const refreshToken = async (refreshTokenValue: string | null) => {
  return await fetch(`${URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: `${refreshTokenValue}`,
    }),
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
    })
    .catch((res) => {
      console.log(res);
    });
};

const fetchWithRefresh = async (url: string, options: any) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.status === 403) {
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

export const sendOrder = (
  ingredients: Array<TIngredient>,
  accessTokenValue: string
) => {
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
