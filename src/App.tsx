import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { BetsProvider } from './contexts/BetsContext'
import { AuthGoogleProvider } from './contexts/AuthGoogleContext'
import { Router } from './router'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <AuthGoogleProvider>
          <BetsProvider>
            <Router />
          </BetsProvider>
        </AuthGoogleProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
