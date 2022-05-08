import styles from './modal-overlay.module.css'
import PropTypes from 'prop-types';

export default function ModalOverlay({onClick}) {
  return (
    <div className={styles.modal__overlay} onClick={onClick}>
    </div>
  )
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
}