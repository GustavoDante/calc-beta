import { HeaderContainer } from './styles'
import { Scroll, Coins, SignOut } from 'phosphor-react'
import logoBeta from '../../assets/logo-beta.svg'

import { NavLink } from 'react-router-dom'
import { AuthGoogleContext } from '../../contexts/AuthGoogleContext'
import { useContext } from 'react'

export function Header() {
  const { signOut, isSignedIn } = useContext(AuthGoogleContext)

  function handleSignOut() {
    signOut()
  }

  return (
    <HeaderContainer>
      <div>
        <img src={logoBeta} alt="simbolo beta azul" />
      </div>
      {isSignedIn ? (
        <nav>
          <NavLink to="/" title="Calculadora">
            <Coins size={28} />
          </NavLink>
          <NavLink to="/history" title="Histórico">
            <Scroll size={28} />
          </NavLink>
          <a title="Sair" onClick={handleSignOut}>
            <SignOut size={28} />
          </a>
        </nav>
      ) : (
        ''
      )}
    </HeaderContainer>
  )
}
