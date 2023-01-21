import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from 'components/hooks/useAuth';
import { useDispatch } from 'react-redux';
import { refreshUser } from 'Redux/auth/authOperations';
import { Layout } from 'components/Layout/Layout';
import { PrivateRout } from 'components/CustomRouts/PrivateRoute';
import { RestrictedRout } from 'components/CustomRouts/RestrictedRout';

const HomePage = lazy(() =>
  import('../../Pages/HomePage/HomePage').then(module => ({
    ...module,
    default: module.HomePage,
  }))
);

const PhoneBookPage = lazy(() =>
  import('../../Pages/PhoneBook/PhoneBook').then(module => ({
    ...module,
    default: module.PhoneBookPage,
  }))
);
const NotFoundPage = lazy(() =>
  import('../../Pages/NotFoundPage/NotFoundPage').then(module => ({
    ...module,
    default: module.NotFoundPage,
  }))
);

const RegisterPage = lazy(() =>
  import('../../Pages/Registre/RegisterPage').then(module => ({
    ...module,
    default: module.RegisterPage,
  }))
);

const LoginPage = lazy(() =>
  import('../../Pages/LogIn/LoginPage').then(module => ({
    ...module,
    default: module.LoginPage,
  }))
);

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b
      style={{
        display: 'block',
        textAlign: 'center',
      }}
    >
      Page is refreshing ...
    </b>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route
          path="phoneBook"
          element={<PrivateRout redirectTo="/" component={<PhoneBookPage />} />}
        />
        <Route
          path="register"
          element={
            <RestrictedRout
              redirectTo="/phoneBook"
              component={<RegisterPage />}
            />
          }
        />
        <Route
          path="logIn"
          element={
            <RestrictedRout redirectTo="/phoneBook" component={<LoginPage />} />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
