import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage } from '../pages/Error';
import { APP_ROUTES } from './app';
import { NotFoundPage } from '../pages/NotFound';
import LoginPage from '../pages/Login';
import { ProtectedRoute } from '../components/routing/ProtectedRoute';
import { CallsListPage } from '../pages/CallsList';
import { CallDetailsPage } from '../pages/CallDetails';
import { AuthProvider } from '../contexts/auth';

// export const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route element={<AuthProvider />} errorElement={<ErrorPage />}>
//       <Route path="*" element={<NotFoundPage />} />
//       <Route path={APP_ROUTES.LOGIN} element={<LoginPage />} />

//       <Route path={APP_ROUTES.CALLS_LIST} element={<ProtectedRoute withLayout />}>
//         <Route path={APP_ROUTES.CALLS_LIST} element={<CallsListPage />} />
//         <Route path={APP_ROUTES.CALL_DETAILS(':callId')} element={<CallDetailsPage />} />
//       </Route>
//     </Route>
//   )
// );

export const router = createBrowserRouter([
  {
    element: <AuthProvider />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: APP_ROUTES.HOME,
        element: <LoginPage />
      },
      {
        path: APP_ROUTES.LOGIN,
        element: <LoginPage />
      },
      {
        path: APP_ROUTES.CALLS_LIST,
        element: <ProtectedRoute withLayout />,
        children: [
          {
            path: APP_ROUTES.CALLS_LIST,
            element: <CallsListPage />
          },
          {
            path: APP_ROUTES.CALL_DETAILS(':callId'),
            element: <CallDetailsPage />
          }
        ]
      }
    ]
  },
  {
    path: '*',
    errorElement: <ErrorPage />,
    element: <NotFoundPage />
  }
]);
