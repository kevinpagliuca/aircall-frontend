import { createGlobalStyle } from '@xstyled/styled-components';

export const GlobalAppStyle = createGlobalStyle`

  body {
    background-color: background-01;
  }

  #root {
    display: grid;
    place-items: center;
    grid-template-rows: 1fr;
    overflow-y: auto;
    min-height: 100vh;
    position: relative;
  }

   ::-webkit-scrollbar {
    display: none;
  }
`;
