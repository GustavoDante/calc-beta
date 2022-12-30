import { ResumeCard } from './ResumeCard'
import { Container } from './styles'
import { TableWithHistory } from './TableWithHistory'

export function History() {
  //   const { bets, formatCashField } = useContext(BetsContext)

  return (
    <Container>
      <ResumeCard />
      <TableWithHistory />
    </Container>
  )
}
