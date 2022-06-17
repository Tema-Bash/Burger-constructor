import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export function ProtectedRoute({ anonymous = false, children }) {
  const { user } = useSelector((store) => store.auth);
  const isAuth = Object.keys(user).length !== 0;

  // Если разрешен только неавторизованный доступ, а пользователь авторизован...
  if (anonymous && isAuth) {
    // ...то отправляем его, например, на главную
    return <Navigate to="/" replace={true} />;
    console.log("Отправляем мистера в конструктор");
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !isAuth) {
    // ...то отправляем его, например, на форму входа
    return <Navigate to="/login" replace={true} />;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return <>{children}</>;
}

ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
