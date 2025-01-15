import { Link } from 'react-router-dom';
import { Box, Flex, Spacer } from '@aircall/tractor';
import logo from '../../logo.png';
import { PropsWithChildren } from 'react';
import { useAuth } from '../../contexts/auth';
import { APP_ROUTES } from '../../routes';
import { AppContainer } from '../AppContainer';

const Header = () => {
  const { logout, user } = useAuth();

  return (
    <Flex
      borderBottom="1px solid"
      justifyContent="center"
      borderBottomColor="neutral-700"
      py={4}
      position="sticky"
      h="64px"
      top={0}
      left={0}
      right={0}
    >
      <Flex justifyContent="space-between" px={4} maxW="500px" w="100%">
        <Link to={APP_ROUTES.CALLS_LIST}>
          <img src={logo} alt="Aircall" width="32px" height="32px" />
        </Link>
        <Spacer space="m" alignItems="center">
          <span>{`Welcome ${user?.username}!`}</span>
          <Link to="#" onClick={logout}>
            Logout
          </Link>
        </Spacer>
      </Flex>
    </Flex>
  );
};

export const ProtectedLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box w="100%" h="100%" position="relative">
      <Header />
      <AppContainer>{children}</AppContainer>
    </Box>
  );
};
