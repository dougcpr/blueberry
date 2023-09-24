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

export const darkTheme = {
  transition: 0.3,
  body: '#1a1f36',
  text: '#d5d5d5',
  colors: {
    black: '#000',
    button_disabled: 'rgba(0, 0, 0, 0.26)',
    button_disabled_bg: 'rgba(0, 0, 0, 0.12)',
    button_height: '2.25rem',
    default: '#d5d5d5',
    defaultBackgroundColor: 'white',
    disabled: '#f5f5f5',
    disabled_NavBar_Item: '#8BB7F1',
    fontFamily: 'Roboto, sans-serif',
    green: '#55ad7a',
    blue: '#1e5d88',
    navBarFontColor: '#1a1f36',
    input_border_hover: 'rgba(0,0,0,.87)',
    red: '#FF1654',
    grey: '#e0e0e0',
    white: '#fff',
    font_medium: '1rem',
    width_medium: '12.5rem'
  },
};