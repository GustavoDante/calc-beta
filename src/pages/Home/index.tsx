import { CardsContainer, Container } from './styles'

import { FormRegisterBet } from './components/FormRegisterBet'
import { TableHistoryBets } from './components/TableHistoryBets'
import { FormRegisterWinWin } from './components/FormRegisterWinWin'
import { useContext } from 'react'
import { AuthGoogleContext } from '../../contexts/AuthGoogleContext'

export function Home() {
  const { user } = useContext(AuthGoogleContext)

  function valueInputChange(input: String) {
    let value = input.padStart(4, '0')

    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{1})(\d{2})$/, '$1,$2')
    value = value.replace(/(?=(\d{3})+(\D))\B/g, '.')
    value = value.replace(/(^0{2})/g, '0')
    if (parseFloat(value.replace(/[.]/g, '').replace(/[,]/g, '.')) > 1.0) {
      value = value.replace(/(^0{1})/g, '')
    }

    return value
  }

  function multiplierInputChange(input: String) {
    let multiplier = input.padStart(4, '0')

    multiplier = multiplier.replace(/\D/g, '')
    multiplier = multiplier.replace(/(\d{1})(\d{2})$/, '$1.$2')
    multiplier = multiplier.replace(/(^0{2})/g, '0')
    if (parseFloat(multiplier) > 1.0) {
      multiplier = multiplier.replace(/(^0{1})/g, '')
    }
    return multiplier
  }

  console.log(user)
  return (
    <Container>
      <CardsContainer>
        <FormRegisterBet
          multiplierInputChange={multiplierInputChange}
          valueInputChange={valueInputChange}
        />
        <FormRegisterWinWin
          multiplierInputChange={multiplierInputChange}
          valueInputChange={valueInputChange}
        />
      </CardsContainer>
      <TableHistoryBets />
    </Container>
  )
}
