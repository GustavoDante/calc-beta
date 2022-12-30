import { Container } from './styles'

import { FormRegisterBet } from './components/CardRegisterBet'
import { TableHistoryBets } from './components/TableHistoryBets'

export function Home() {
  return (
    <Container>
      <FormRegisterBet />
      <TableHistoryBets />
    </Container>
  )
}
