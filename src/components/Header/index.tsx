import { HeaderContainer } from './styles'
import { Scroll, Coins, SignOut } from 'phosphor-react'
import logoBeta from '../../assets/logo-beta.svg'

import { NavLink } from 'react-router-dom'
import { AuthGoogleContext } from '../../contexts/AuthGoogleContext'
import { useContext, useState } from 'react'
import { LogoutConfirmationModal } from './components/logoutConfirmationModal'

export function Header() {
  const { isSignedIn } = useContext(AuthGoogleContext)
  const [showModal, setShowModal] = useState(false)

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
          <a title="Sair" onClick={() => setShowModal(true)}>
            <SignOut size={28} />
          </a>
          <LogoutConfirmationModal
            isOpen={showModal}
            onRequestClose={() => setShowModal(false)}
          />
        </nav>
      ) : (
        ''
      )}
    </HeaderContainer>
  )
}
