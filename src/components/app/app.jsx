import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor'

function App() {
  return (
    <div className={styles.App}>
      <AppHeader />
      <section className={styles.container}>
        <BurgerIngredients />
        <BurgerConstructor />
      </section>
    </div>
  );
}

export default App;
