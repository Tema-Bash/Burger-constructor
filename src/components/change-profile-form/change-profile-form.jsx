import styles from "./change-profile-form.module.css";
import { useState, useCallback } from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../utils/utils";
import {
  profileRequest,
  updateRequest,
} from "../../services/actions/authorization.js";

function ProfileForm() {
  const { user } = useSelector((store) => store.auth);
  // Состояние, в котором содержится значения полей ввода
  const [form, setValue] = useState({
    name: user?.name,
    login: user?.email,
    password: "",
  });
  const dispatch = useDispatch();

  //Правило для отображения кнопок "сохранить" и "отмена"
  let rule = !(form.login == user.email) || !(form.name == user.name);

  // Обработчик изменения полей ввода обновляет состояние
  const handleChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let cancelHandler = useCallback(async (e) => {
    e.preventDefault();
    dispatch(profileRequest(getCookie("accessToken")));
    setValue({ ...form, name: user.name, login: user.email, password: "" });
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
      setValue({ ...form, name: user.name, login: user.email });
    },
    [form]
  );

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
      {rule && (
        <div className={styles.buttons}>
          <Button onClick={cancelHandler} type="secoundary" size="medium">
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
