import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html, body {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #071739;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background: #000;
  color: #333333;
  font-size: 16px;
}
`;
