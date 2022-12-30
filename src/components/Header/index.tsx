import { HeaderContainer } from './styles'
import { Scroll, Coins } from 'phosphor-react'
import logoBeta from '../../assets/logo-beta.svg'

import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoBeta} alt="simbolo beta azul" />
      <nav>
        <NavLink to="/" title="Calculadora">
          <Coins size={28} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={28} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
