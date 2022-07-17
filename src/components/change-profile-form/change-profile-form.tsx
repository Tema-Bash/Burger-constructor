import styles from "./change-profile-form.module.css";
import { useState, useCallback, SyntheticEvent, useEffect } from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../services/hooks";
import { getCookie } from "../../utils/utils";
import {
  profileRequest,
  updateRequest,
} from "../../services/actions/authorization";

interface IFormState {
  name: string;
  login: string;
  password: string;
}

function ProfileForm() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  // Состояние, в котором содержится значения полей ввода
  const [form, setValue] = useState<IFormState>({
    name: "",
    login: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setValue({ ...form, name: user.name, login: user.email });
    }
  }, [user]);

  const rule = () => {
    if (!user) {
      return;
    }
    return !(form.login == user.email) || !(form.name == user.name);
  };

  // Обработчик изменения полей ввода обновляет состояние
  const handleChange = (e: SyntheticEvent) => {
    let target = e.target as HTMLInputElement;
    setValue({ ...form, [target.name]: target.value });
  };

  let cancelHandler = useCallback(async (e) => {
    e.preventDefault();
    dispatch(profileRequest(getCookie("accessToken")));
    if (user) {
      setValue({ ...form, name: user.name, login: user.email, password: "" });
    }
  }, []);

  let saveProfile = useCallback(
    async (e) => {
      e.preventDefault();
      await dispatch(
        updateRequest(
          getCookie("accessToken"),
          form.login,
          form.name,
          form.password
        )
      );
      if (user) {
        setValue({ ...form, name: user.name, login: user.email });
      }
    },

    [form]
  );

  if (!user) {
    return null;
  }

  return (
    <form onSubmit={saveProfile} className={`${styles.form} mt-30`}>
      <div className={styles.inputContainer + " mb-6"}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChange}
          icon={"EditIcon"}
          value={form.name}
          name={"name"}
          error={false}
          //ref={inputRef}
          //onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
        />
      </div>
      <div className={styles.inputContainer + " mb-6"}>
        <Input
          type={"text"}
          placeholder={"Логин"}
          onChange={handleChange}
          icon={"EditIcon"}
          value={form.login}
          name={"login"}
          error={false}
          //ref={inputRef}
          //onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
        />
      </div>
      <div className={styles.inputContainer + " mb-6"}>
        <Input
          type={"password"}
          placeholder={"Пароль"}
          onChange={handleChange}
          icon={"EditIcon"}
          value={form.password}
          name={"password"}
          error={false}
          //ref={inputRef}
          //onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
        />
      </div>
      {rule() && (
        <div className={styles.buttons}>
          <Button onClick={cancelHandler} type="secondary" size="medium">
            Отмена
          </Button>
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
}

export default ProfileForm;
