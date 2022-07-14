import { useEffect, ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

interface IModalProps {
  title?: string;
  onClose: () => void;
  children: ReactNode;
}

const modalsContainer = document.querySelector("#modals");

export default function Modal({ title, onClose, children }: IModalProps) {
  const handleEscKeydown = (evt: KeyboardEvent) => {
    evt.key === "Escape" && onClose();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscKeydown);
    return () => {
      document.removeEventListener("keydown", handleEscKeydown);
    };
  }, []);

  if (!modalsContainer) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.title + " mt-10 ml-10 mr-10"}>
          <p className="text text_type_main-large">{title}</p>
          <CloseIcon type="primary" onClick={onClose} />
        </div>
        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalsContainer
  );
}
