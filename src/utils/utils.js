export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export function totalSumm(object, key) {
  let res = object.reduce((total, current) => {
    return total + Number(current[key]);
  }, object[0]?.price);
  return res;
}

export const statusToString = (status) => {
  switch (status) {
    case "created":
      return "Создан";
    case "pending":
      return "Готовится";
    case "done":
      return "Выполнен";
    default:
      alert(`Order not found`);
  }
};

export const dateToString = (createdAt) => {
  const created = new Date(createdAt);
  const dayDiff = daysAgo(created);
  let daysOffset = "";

  if (dayDiff === 0) {
    daysOffset = "Сегодня";
    if (dayDiff === 1) {
      daysOffset = `${dayDiff} ${dayDiff < 5 ? "дней" : "дня"} назад`;
    }
  } else {
    daysOffset = "Вчера";
  }

  return `${daysOffset}, ${pad(created.getHours())}:${pad(
    created.getMinutes()
  )} i-GMT+3`;
};

const daysAgo = (checkDay) => {
  return Math.ceil(
    (new Date().setUTCHours(0, 0, 0, 0) - checkDay) / 1000 / 60 / 60 / 24
  );
};

const pad = (num) => {
  return num.toString().padStart(2, "0");
};

//получить куку(имя)
export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

//записать в куку(имя, значение, пропсы)
export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}
