import { Outlet } from 'react-router-dom';
import { ProtectedLayout } from './ProtectedLayout';
import { Fragment } from 'react';

interface Props {
  withLayout?: boolean;
}

export const ProtectedRoute = ({ withLayout }: Props) => {
  const Wrapper = withLayout ? ProtectedLayout : Fragment;
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
};
