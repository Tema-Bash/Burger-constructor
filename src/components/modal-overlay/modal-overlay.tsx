import styles from "./modal-overlay.module.css";

interface IModalOverlay {
  onClick: () => void;
}

export default function ModalOverlay({ onClick }: IModalOverlay) {
  return <div className={styles.modal__overlay} onClick={onClick}></div>;
}
