import { Flex, Icon, SpinnerOutlined } from '@aircall/tractor';
import { AppContainer } from '../components/AppContainer';

export function LoadingPage() {
  return (
    <AppContainer>
      <Flex justifyItems="center" mx="auto">
        <Icon component={SpinnerOutlined} size={64} spin color="primary-500" />
      </Flex>
    </AppContainer>
  );
}
