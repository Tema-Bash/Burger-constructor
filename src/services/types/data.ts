export type TIngredient = {
  _id: string;
  name: string;
  type: "bun" | "main" | "sauce";
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v?: number;
  uniqueId?: string;
  uuid?: string;
};

export type TOrder = {
  _id: string;
  ingredients: Array<string>;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name?: string;
};

export type TWsMessage = {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
};

export type TUser = {
  name: string;
  email: string;
  password: string;
};
