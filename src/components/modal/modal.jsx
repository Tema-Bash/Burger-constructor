import {React, useState,useEffect } from 'react';
import ReactDOM from 'react-dom'
import styles from './modal.module.css'
import PropTypes from 'prop-types';

import { 
  CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
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
        <div className={styles.title + ' mt-10 ml-10 mr-10'}>
          <p className="text text_type_main-large">
            {title}
          </p>
          <CloseIcon type="primary" onClick={onOverlayClick}/>
        </div>
        {children}
      </div>
      <ModalOverlay onClick={onOverlayClick} />
    </>,
    modalsContainer 
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onOverlayClick: PropTypes.func.isRequired,
  onEscKeydown: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};