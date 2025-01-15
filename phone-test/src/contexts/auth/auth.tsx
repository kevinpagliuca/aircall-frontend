import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AuthContextProps } from './auth.types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useMutation, useQuery } from '@apollo/client';
import { LOGIN } from '../../gql/mutations';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { APP_ROUTES, PUBLIC_ROUTES } from '../../routes';
import { COOKIE_NAMES } from '../../constants/cookies';
import { GET_ME_QUERY } from '../../gql/queries';
import { LoadingPage } from '../../pages/Loading';
import { LoginInput } from '../../interfaces/auth';
import { User } from '../../interfaces/user';

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = () => {
  const [user, setUser] = useState<User>();
  const [accessToken, setAccessToken] = useLocalStorage<string>(COOKIE_NAMES.ACCESS_TOKEN);
  const [, setRefreshToken] = useLocalStorage<string>(COOKIE_NAMES.REFRESH_TOKEN);
  const [loginMutation] = useMutation(LOGIN);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const login = useCallback(async (input: LoginInput) => {
    await loginMutation({
      variables: { input },
      onCompleted: ({ login }) => {
        const { access_token, refresh_token, user } = login;
        setAccessToken(access_token, true);
        setRefreshToken(refresh_token);
        setUser(user);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = useCallback(() => {
    setAccessToken(null, true);
    setRefreshToken(null);
    setUser(undefined);
    navigate(APP_ROUTES.LOGIN, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { loading } = useQuery(GET_ME_QUERY, {
    skip: !accessToken,
    onCompleted: ({ me }) => {
      setUser(me);
    },
    onError: () => {
      setAccessToken(null);
      setRefreshToken(null);
      setUser(undefined);
      navigate(APP_ROUTES.LOGIN, { replace: true });
    }
  });

  useEffect(() => {
    if (loading) return;

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
    const isAuthenticated = !!user;

    if (isPublicRoute && isAuthenticated) navigate(APP_ROUTES.CALLS_LIST);
    else if (!isPublicRoute && !isAuthenticated) navigate(APP_ROUTES.LOGIN);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, loading]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user
      }}
    >
      {loading ? <LoadingPage /> : <Outlet />}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
