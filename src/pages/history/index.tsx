import { useContext } from 'react'
import { BetsContext } from '../../contexts/BetsContext'
import { Container, Status } from './styles'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { TableContainer } from '../../styles/global'

export function History() {
  const { bets, formatCashField } = useContext(BetsContext)

  return (
    <Container>
      <h1>History</h1>
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>Valor apostado</th>
              <th>ODD</th>
              <th>Retorno</th>
              <th>Lucro</th>
              <th>Data</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {bets
              .filter((bet) => bet.win !== null)
              .map((bet) => (
                <tr key={bet.id}>
                  <td>R$ {formatCashField(bet.value.toString())}</td>
                  <td>{bet.multiplier.toFixed(2)} X</td>
                  <td>R$ {formatCashField(bet.returnBet.toFixed(2))}</td>
                  <td>R$ {formatCashField(bet.profitBet.toFixed(2))}</td>
                  <td>
                    {format(bet.date, "d 'de' LLLL 'às' HH:mm'h'", {
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    <Status status={bet.win ? 'green' : 'red'}>
                      {bet.win ? 'Win' : 'Lose'}
                    </Status>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </TableContainer>
    </Container>
  )
}
