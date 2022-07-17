import { TIngredient, TOrder } from "../services/types/data";

export const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
};

export function totalSumm(object: Array<TIngredient>, key: string) {
  let res = object.reduce((total, current: any) => {
    return total + Number(current[key]);
  }, object[0]?.price);
  return res;
}

export const counter = (
  targetItem: string,
  array: Array<any>,
  currItem?: string
) => {
  const counts: any = {};
  let idsOfArray = array.map((item) => {
    return item[targetItem];
  });
  idsOfArray.forEach((item, i) => {
    counts[item] = (counts[item] || 0) + 1;
  });
  //Если передали конкретный элемент возвращаем его количество
  if (currItem) {
    return counts[currItem];
  }
  //Иначе возвращаем Массив уникальных ингредиентов
  return Object.keys(counts).map((id, index) => {
    return array.find((item) => item._id == id);
  });
};

export const statusToString = (status: string) => {
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

export const dateToString = (createdAt: string) => {
  const created = new Date(createdAt);
  const dayDiff = daysAgo(created);
  let daysOffset = "";

  if (dayDiff === 0) {
    daysOffset = "Сегодня";
  } else if (dayDiff === 1) {
    daysOffset = `${dayDiff} ${dayDiff < 5 ? "дней" : "дня"} назад`;
  } else {
    daysOffset = "Вчера";
  }

  return `${daysOffset}, ${pad(created.getHours())}:${pad(
    created.getMinutes()
  )} i-GMT+3`;
};

const daysAgo = (checkDay: Date) => {
  return Math.ceil(
    (new Date().setUTCHours(0, 0, 0, 0) - checkDay.getTime()) /
      1000 /
      60 /
      60 /
      24
  );
};

const pad = (num: number) => {
  return num.toString().padStart(2, "0");
};

//получить куку(имя)
export function getCookie(name: string) {
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
export function setCookie(name: string, value: string, props: any) {
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

export function deleteCookie(name: string) {
  setCookie(name, "", { expires: -1 });
}
