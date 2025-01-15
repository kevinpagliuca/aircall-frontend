import { Tractor } from '@aircall/tractor';
import { RouterProvider } from 'react-router-dom';

import { darkTheme } from './style/theme/darkTheme';
import { GlobalAppStyle } from './style/global';
import { router } from './routes';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './lib/apollo/client';

function App() {
  return (
    <Tractor injectStyle theme={darkTheme}>
      <ApolloProvider client={apolloClient}>
        <GlobalAppStyle />
        <RouterProvider router={router} />
      </ApolloProvider>
    </Tractor>
  );
}

export default App;
