import styles from "./login.module.css";
import {} from "@ya.praktikum/react-developer-burger-ui-components";

export function NotFound404() {
  return (
    <div className={styles.App}>
      <section className={styles.container}>
        <form className={styles.form}>
          <p className="text text_type_main-medium mb-6">
            Такой страницы не нашлось :&#40;
          </p>
        </form>
      </section>
    </div>
  );
}
