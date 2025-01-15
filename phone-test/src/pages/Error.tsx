import {
  Box,
  defaultTheme,
  Flex,
  Icon,
  Link,
  LogoMarkMono,
  Spacer,
  Typography
} from '@aircall/tractor';
import { useMemo } from 'react';
import { useRouteError } from 'react-router-dom';
import { AppContainer } from '../components/AppContainer';

export const ErrorPage = () => {
  const error = useRouteError() as Error;

  const errorText = error?.message || JSON.stringify(error);

  const formattedErrorText = useMemo(() => {
    const words = errorText.split(' ');

    return words.map(word => {
      if (word.startsWith('http')) {
        return {
          word: word.length > 35 ? `${word.slice(0, 35)}...` : word,
          title: word,
          isLink: true
        };
      }

      return {
        word,
        isLink: false
      };
    });
  }, [errorText]);

  return (
    <AppContainer>
      <Spacer p={5} h="100%" direction="vertical" justifyContent="center" fluid space={5}>
        <Flex alignItems="center">
          <Icon component={LogoMarkMono} size={60} mx="auto" />
        </Flex>
        <Flex flexDirection="column">
          <Typography variant="displayM" textAlign="center">
            Something went wrong
          </Typography>
          <Typography
            variant="displayS2"
            textAlign="center"
            color={defaultTheme.colors['secondary-100']}
          >
            An error occurred in the app, below you will find more details about the error:
          </Typography>
        </Flex>

        <Box border p={6} bg={defaultTheme.colors['secondary-500']} borderRadius={8}>
          <Typography variant="displayS">
            {formattedErrorText.map(({ word, isLink, title }, index) => {
              if (isLink) {
                return (
                  <Link href={title} target="_blank" rel="noreferrer noopener">
                    {word}
                    {index === formattedErrorText.length - 1 ? '' : ' '}
                  </Link>
                );
              }

              return word.concat(index === formattedErrorText.length - 1 ? '' : ' ');
            })}
          </Typography>
        </Box>
      </Spacer>
    </AppContainer>
  );
};
