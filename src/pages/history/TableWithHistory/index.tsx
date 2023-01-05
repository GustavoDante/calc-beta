import { useContext } from 'react'
import { BetsContext } from '../../../contexts/BetsContext'
import { TableContainer } from '../../../styles/global'
import { format } from 'date-fns'
import { Balance } from './styles'
import ptBR from 'date-fns/locale/pt-BR'

export function TableWithHistory() {
  const { bets, formatCashField } = useContext(BetsContext)

  return (
    <TableContainer>
      <table>
        <thead>
          <tr>
            <th>Valor apostado</th>
            <th>ODD</th>
            <th>Retorno</th>
            <th>Saldo</th>
            <th>Data</th>
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
                <Balance status={bet.win ? 'green' : 'red'}>
                  <strong>
                    R$ {formatCashField(bet.profitBet.toFixed(2))}
                  </strong>
                </Balance>
                <td>
                  {format(new Date(bet.date), "d 'de' LLLL 'às' HH:mm'h'", {
                    locale: ptBR,
                  })}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </TableContainer>
  )
}
