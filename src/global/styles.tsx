import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    font-family: Inter, Poppins, sans-serif, system-ui, Helvetica, Arial;
    line-height: 1.5;
    font-weight: 400; 

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    padding: 0;
    margin: 0;
    vertical-align: baseline;
    list-style: none;
    border: 0;
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }

  body {
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;
  }

  ol, ul {
    list-style: none;
  }
`;
