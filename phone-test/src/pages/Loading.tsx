import { Flex, Icon, SpinnerOutlined } from '@aircall/tractor';

export function LoadingPage() {
  return (
    <Flex my="auto" mx="auto" flex={1}>
      <Icon component={SpinnerOutlined} size={64} spin color="primary-500" />
    </Flex>
  );
}
