import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import Preloader from "../pages/preloader";

export function ProtectedRoute({ anonymous = false, children }) {
  const { user } = useSelector((store) => store.auth);
  const { isAuthChecked } = useSelector((store) => store.auth);
  const isAuth = Object.keys(user).length !== 0;
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  } else if (!anonymous && !isAuth) {
    // Если требуется авторизация, а пользователь не авторизован...
    return (
      <Navigate
        to="/login"
        replace={true}
        state={{ from: location.pathname }}
      />
    );
  } else if (anonymous && isAuth) {
    // Если разрешен только неавторизованный доступ, а пользователь авторизован...
    return <Navigate to={location.state?.from || "/"} replace={true} />;
  } else {
    // Если все ок, то рендерим внутреннее содержимое
    return <>{children}</>;
  }
}

ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
