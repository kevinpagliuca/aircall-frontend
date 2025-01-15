import { Flex } from '@aircall/tractor';
import { PropsWithChildren } from 'react';

export const AppContainer = ({ children }: PropsWithChildren) => {
  return (
    <Flex flex={1} alignItems="center" w="500px" mx="auto" minHeight={'100vh'}>
      {children}
    </Flex>
  );
};
