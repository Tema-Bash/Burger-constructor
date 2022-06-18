import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalsContainer = document.querySelector("#modals");
export default function Modal({ title, onClose, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  // Обработка нажатия Esc
  const handleEscKeydown = (e) => {
    e.key === "Escape" && onClose();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscKeydown);
    return () => {
      document.removeEventListener("keydown", handleEscKeydown);
    };
  }, []);

  const { selectedIngredient } = useSelector((store) => store.ingredients);
  useEffect(() => {
    if (!selectedIngredient) {
      navigate("/");
    }
  }, [selectedIngredient, navigate, location]);

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

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};
