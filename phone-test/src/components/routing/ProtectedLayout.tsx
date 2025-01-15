import { Link } from 'react-router-dom';
import { Box, Flex, Spacer, Grid } from '@aircall/tractor';
import logo from '../../logo.png';
import { PropsWithChildren } from 'react';
import { useAuth } from '../../contexts/auth';

export const ProtectedLayout = ({ children }: PropsWithChildren) => {
  const { logout, user } = useAuth();

  return (
    <Box minWidth="100vh" p={4}>
      <Flex justifyContent="space-between" alignItems="center">
        <Link to="/calls">
          <img src={logo} alt="Aircall" width="32px" height="32px" />
        </Link>
        <Spacer space="m" alignItems="center">
          <span>{`Welcome ${user?.username}!`}</span>
          <Link to="#" onClick={logout}>
            logout
          </Link>
        </Spacer>
      </Flex>
      <Grid w="500px" mx="auto" rowGap={2}>
        {children}
      </Grid>
    </Box>
  );
};
