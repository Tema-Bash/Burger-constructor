import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useSelector } from "../services/hooks";
import Preloader from "../pages/preloader";

type TProtectedRouteProps = {
  anonymous?: boolean;
  children?: ReactNode; //комплексный тип, включающий множество элементов, которые может вернуть render() метод: type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;.
};

type LocationState = {
  from: string | null;
};

export function ProtectedRoute({
  anonymous = false,
  children,
}: TProtectedRouteProps) {
  const { user } = useSelector((store) => store.auth);
  const { isAuthChecked } = useSelector((store) => store.auth);
  const isAuth = Object.keys(user).length !== 0;
  const location = useLocation();
  const LocationState = location.state as LocationState;

  if (!isAuthChecked) {
    return <Preloader text={""} />;
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
    return <Navigate to={LocationState?.from || "/"} replace={true} />;
  } else {
    // Если все ок, то рендерим внутреннее содержимое
    return <>{children}</>;
  }
}