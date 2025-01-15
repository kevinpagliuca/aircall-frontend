import { Flex } from '@aircall/tractor';
import { PropsWithChildren } from 'react';

export const AppContainer = ({ children }: PropsWithChildren) => {
  return (
    <Flex flex={1} py={6} px={4} flexDirection="column" w="500px" mx="auto">
      {children}
    </Flex>
  );
};
