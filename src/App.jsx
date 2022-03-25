import React from 'react';
import styles from './App.module.css';
import AppHeader from './components/app-header/app-header'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';

function App() {
  return (
    <div className={styles.App}>
      <AppHeader />
      <BurgerIngredients />
    </div>
  );
}

export default App;
