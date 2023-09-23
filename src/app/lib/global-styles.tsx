import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap');
  html {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    font-size: 16px;
    height: 100%;
  }

  body {
    transition: background 0.3s ease;
    padding: 0;
    margin: 0;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};

}
`