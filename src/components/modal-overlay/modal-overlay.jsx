import {React, useState,useEffect } from 'react';
import styles from './modal-overlay.module.css'


export default function ModalOverlay({onClick}) {
  return (
    <div className={styles.modal__overlay} onClick={onClick}>
    </div>
  )
}