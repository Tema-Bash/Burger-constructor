import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export function ProtectedRoute({ anonymous = false, children }) {
  const { user } = useSelector((store) => store.auth);
  const isAuth = Object.keys(user).length !== 0;
  const location = useLocation();
  // Если разрешен только неавторизованный доступ, а пользователь авторизован...
  if (anonymous && isAuth) {
    return <Navigate to={location.state?.from || "/"} replace={true} />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !isAuth) {
    return (
      <Navigate
        to="/login"
        replace={true}
        state={{ from: location.pathname }}
      />
    );
  }

  // Если все ок, то рендерим внутреннее содержимое
  return <>{children}</>;
}

ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};