import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import AppHeader from "../app-header/app-header";
import { IngredientsShop } from "../../pages/ingredients-shop";
import { LoginPage } from "../../pages/login";
import { RegistrationPage } from "../../pages/registration.jsx";
import { ForgotPasswordPage } from "../../pages/forgot-password.jsx";
import { ResetPasswordPage } from "../../pages/reset-password.jsx";
import { ProfilePage } from "../../pages/profile.jsx";
import { NotFound404 } from "../../pages/not-found.jsx";
import { ProtectedRoute } from "../protectedRoute";
import { IngredientPage } from "../../pages/ingredient-page";
import FeedPage from "../../pages/feed";
import OrderPage from "../../pages/order-page";
import { useDispatch, useSelector } from "react-redux";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { CLEAR_ORDER_NUMBER } from "../../services/actions/order";
import { AUTH_CHECKED } from "../../services/actions/authorization";
import OrderInformation from "../order-information/order-information";
import { useEffect } from "react";
import { getCookie } from "../../utils/utils";
import { profileRequest } from "../../services/actions/authorization";
import Preloader from "../../pages/preloader";
import { getIngredients } from "../../services/actions/ingredients";

export default function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const isAuth = Object.keys(user).length !== 0;

  useEffect(async () => {
    if (!isAuth) {
      const token = getCookie("accessToken");
      if (token) {
        await dispatch(profileRequest(token));
      } else {
        dispatch({ type: AUTH_CHECKED });
      }
    }
  }, [user, dispatch]);

  const { ingredients, ingredientsRequested, ingredientsFailed } = useSelector(
    (store) => store.ingredients
  );
  const { orderNumber, orderRequested } = useSelector((store) => store.order);

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(getIngredients());
    }
  }, [ingredients, dispatch]);

  //Посещал ли пользователь первый этап восстановления пароля
  const [visitForgotPass, setVisitForgotPass] = useState(false);

  const closeAllModals = () => {
    dispatch({ type: CLEAR_ORDER_NUMBER });
    navigate(-1);
  };

  const location = useLocation();
  const background = location.state?.background;

  if (ingredientsFailed) {
    return <Preloader text={`Игредиенты не загружены`} />;
  }
  return (
    <>
      <AppHeader />
      {ingredientsRequested ? (
        <Preloader text={`Грузим ингредиенты`} />
      ) : orderRequested ? (
        <Preloader text={`Готовим заказ`} />
      ) : (
        <Routes location={background ?? location}>
          <Route path="/" element={<IngredientsShop />}></Route>
          {background && (
            <>
              <Route
                path="/ingredients/:id"
                element={
                  <>
                    <IngredientsShop />
                    <Modal title="Детали ингредиента" onClose={closeAllModals}>
                      <IngredientDetails />
                    </Modal>
                  </>
                }
              ></Route>
              <Route
                path="/feed/:id"
                element={
                  <>
                    <FeedPage />
                    <Modal onClose={closeAllModals}>
                      <OrderInformation />
                    </Modal>
                  </>
                }
              />
              <Route
                path="/profile/orders/:id"
                element={
                  <ProtectedRoute anonymous={false}>
                    <ProfilePage />
                    <Modal onClose={closeAllModals}>
                      <OrderInformation secure={true} />
                    </Modal>
                  </ProtectedRoute>
                }
              ></Route>
            </>
          )}
          <Route
            path="/login"
            element={
              <ProtectedRoute anonymous={true}>
                <LoginPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <ProtectedRoute anonymous={true}>
                <RegistrationPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/forgot-password"
            element={
              <ProtectedRoute anonymous={true}>
                <ForgotPasswordPage setVisitForgotPass={setVisitForgotPass} />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/reset-password"
            element={
              <ProtectedRoute anonymous={true}>
                <ResetPasswordPage visitForgotPass={visitForgotPass} />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/profile/orders/:id"
            element={
              <ProtectedRoute anonymous={false}>
                <OrderPage secure={true} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/*"
            element={
              <ProtectedRoute anonymous={false}>
                <ProfilePage />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/feed/*" element={<FeedPage />}></Route>
          <Route path="/feed/:id" element={<OrderPage secure={false} />} />
          <Route path="/ingredients/:id" element={<IngredientPage />}></Route>
          <Route path="*" element={<NotFound404 />}></Route>
        </Routes>
      )}
    </>
  );
}
