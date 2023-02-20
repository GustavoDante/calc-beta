import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { BetsProvider } from './contexts/BetsContext'
import { AuthGoogleProvider } from './contexts/AuthGoogleContext'
import { Router } from './router'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

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
      <ToastContainer />
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
