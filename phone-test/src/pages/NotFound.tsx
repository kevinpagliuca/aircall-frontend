import { Button, Flex, Icon, LogoMarkMono, Spacer, Typography } from '@aircall/tractor';
import { AppContainer } from '../components/AppContainer';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <AppContainer>
      <Spacer
        p={5}
        h="100%"
        direction="vertical"
        justifyContent="center"
        alignItems="center"
        fluid
        space={5}
      >
        <Flex alignItems="center">
          <Icon component={LogoMarkMono} size={60} mx="auto" />
        </Flex>
        <Flex flexDirection="column" alignItems="center" spaceY={4}>
          <Typography variant="displayXL">Error 404</Typography>

          <Typography variant="displayM">Whoops, page not found</Typography>
          <Typography variant="displayS" textAlign="center" color="neutral-300">
            It seems you tried to access a page that doesn't exist, or that was removed, check the
            address and try again.
          </Typography>

          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </Flex>
      </Spacer>
    </AppContainer>
  );
};
