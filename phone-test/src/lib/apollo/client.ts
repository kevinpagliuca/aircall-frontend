import {
  ApolloClient,
  InMemoryCache,
  FetchResult,
  ApolloLink,
  createHttpLink
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { Observable } from '@apollo/client/utilities';
import { GraphQLError } from 'graphql';
import { API_BASE_URL } from '../../constants/app';
import { REFRESH_TOKEN_V2 } from '../../gql/mutations';
import { COOKIE_NAMES } from '../../constants/cookies';
import { RefreshTokenResponseType } from '../../interfaces/auth';

const getAccessToken = () => {
  const accessToken = localStorage.getItem(COOKIE_NAMES.ACCESS_TOKEN);
  const parsedToken = accessToken ? JSON.parse(accessToken) : undefined;

  return accessToken ? `Bearer ${parsedToken}` : '';
};

const getRefreshToken = () => {
  const refreshToken = localStorage.getItem(COOKIE_NAMES.REFRESH_TOKEN);
  const parsedToken = refreshToken ? JSON.parse(refreshToken) : undefined;

  return refreshToken ? `Bearer ${parsedToken}` : '';
};

const authLink = setContext((_, { headers }) => {
  const accessToken = getAccessToken();

  return {
    headers: {
      ...headers,
      authorization: accessToken
    }
  };
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    if (operation.operationName === 'refreshTokenV2') return;

    for (let err of graphQLErrors) {
      switch (err.message) {
        case 'Unauthorized': {
          const observable = new Observable<FetchResult>(observer => {
            (async () => {
              try {
                const accessToken = await refreshToken();

                if (!accessToken) throw new GraphQLError('Empty AccessToken');

                const subscriber = {
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer)
                };

                operation.setContext({
                  headers: {
                    ...operation.getContext().headers,
                    authorization: getRefreshToken()
                  }
                });

                forward(operation).subscribe(subscriber);
              } catch (err) {
                observer.error(err);
              }
            })();
          });

          return observable;
        }
      }
    }
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const { apolloClient, apolloClientForRefresh } = {
  apolloClient: new ApolloClient({
    link: ApolloLink.from([
      errorLink,
      authLink,
      createHttpLink({ uri: `https://${API_BASE_URL}/graphql` })
    ]),
    cache: new InMemoryCache()
  }),
  apolloClientForRefresh: new ApolloClient({
    link: createHttpLink({ uri: `https://${API_BASE_URL}/graphql` }),
    cache: new InMemoryCache()
  })
};

const refreshToken = async () => {
  try {
    const { data } = await apolloClientForRefresh.mutate<RefreshTokenResponseType>({
      mutation: REFRESH_TOKEN_V2,
      context: {
        headers: {
          authorization: getRefreshToken()
        }
      }
    });

    const accessToken = data?.refreshTokenV2.access_token;
    const refreshToken = data?.refreshTokenV2.refresh_token;

    localStorage.setItem(COOKIE_NAMES.ACCESS_TOKEN, JSON.stringify(accessToken || ''));
    localStorage.setItem(COOKIE_NAMES.REFRESH_TOKEN, JSON.stringify(refreshToken || ''));

    return accessToken;
  } catch (err) {
    localStorage.clear();
    throw err;
  }
};

export { apolloClient };
