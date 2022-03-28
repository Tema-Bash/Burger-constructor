import React from 'react';
import styles from './App.module.css';
import AppHeader from './components/app-header/app-header'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor'

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
