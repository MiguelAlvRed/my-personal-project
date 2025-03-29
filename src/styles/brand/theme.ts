import { existingTheme } from '../legacy'

export const brandTheme = {
  ...existingTheme,
  colors: {
    primary: '#a9191e',
    secondary: '#d78e73',
    accent: '#fcd759',
    background: '#FBFBE3',
    text: {
      primary: '#333333',
      secondary: '#666666'
    }
  },
  typography: {
    h1: '2rem "LT Seada Medium", sans-serif',
    h2: '1.5rem "LT Seada Medium", sans-serif',
    body: '0.875rem "Montserrat", sans-serif'
  }
}
