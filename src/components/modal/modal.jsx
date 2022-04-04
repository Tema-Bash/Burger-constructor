import {React, useState,useEffect } from 'react';
import ReactDOM from 'react-dom'
import { 
  CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalsContainer = document.querySelector('#modals');

export default function Modal({ title, onOverlayClick, onEscKeydown, children }) {
  useEffect(() => {
    document.addEventListener('keydown', onEscKeydown);

    return () => {
      document.removeEventListener('keydown', onEscKeydown);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.title}>
          <h3>{title}</h3>
          <CloseIcon type="primary" onClick={onOverlayClick}/>
        </div>
        {children}
      </div>
      <ModalOverlay onClick={onOverlayClick} />
    </>,
    modalsContainer 
  );
};
