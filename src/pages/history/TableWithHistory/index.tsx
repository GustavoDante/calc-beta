import { useContext } from 'react'
import { BetsContext } from '../../../contexts/BetsContext'
import { ContainerTd, TableContainer } from '../../../styles/global'
import { format } from 'date-fns'
import { SpanWithStatus } from './styles'
import ptBR from 'date-fns/locale/pt-BR'

export function TableWithHistory() {
  const { bets, formatCashField } = useContext(BetsContext)

  return (
    <TableContainer>
      <table>
        <thead>
          <tr>
            <th></th>
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
            .map((bet) => {
              if (bet.winWin === false) {
                return (
                  <tr key={bet.id}>
                    <td></td>
                    <td>R$ {formatCashField(bet.value.toString())}</td>
                    <td>{bet.multiplier.toFixed(2)} X</td>
                    <td>R$ {formatCashField(bet.returnBet.toFixed(2))}</td>
                    {bet.win ? (
                      <td>
                        <SpanWithStatus status={'green'}>
                          + R$ {formatCashField(bet.profitBet.toFixed(2))}
                        </SpanWithStatus>
                      </td>
                    ) : (
                      <td>
                        <SpanWithStatus status={'red'}>
                          - R$ {formatCashField(bet.value.toFixed(2))}
                        </SpanWithStatus>
                      </td>
                    )}
                    <td>
                      {format(new Date(bet.date), "d 'de' LLLL 'às' HH:mm'h'", {
                        locale: ptBR,
                      })}
                    </td>
                  </tr>
                )
              } else {
                return (
                  <tr key={bet.id}>
                    <td>
                      <ContainerTd>
                        <SpanWithStatus
                          status={bet.whoWin === 1 ? 'green' : 'red'}
                        >
                          A
                        </SpanWithStatus>
                        <SpanWithStatus
                          status={bet.whoWin === 2 ? 'green' : 'red'}
                        >
                          B
                        </SpanWithStatus>
                      </ContainerTd>
                    </td>
                    <td>
                      <ContainerTd>
                        <SpanWithStatus
                          status={bet.whoWin === 1 ? 'green' : 'red'}
                        >
                          R$ {formatCashField(bet.value.toFixed(2))}
                        </SpanWithStatus>
                        <SpanWithStatus
                          status={bet.whoWin === 2 ? 'green' : 'red'}
                        >
                          R$ {formatCashField(bet.valueB.toFixed(2))}
                        </SpanWithStatus>
                      </ContainerTd>
                    </td>
                    <td>
                      <ContainerTd>
                        <SpanWithStatus
                          status={bet.whoWin === 1 ? 'green' : 'red'}
                        >
                          {bet.multiplier.toFixed(2)} X
                        </SpanWithStatus>
                        <SpanWithStatus
                          status={bet.whoWin === 2 ? 'green' : 'red'}
                        >
                          {bet.multiplierB.toFixed(2)} X
                        </SpanWithStatus>
                      </ContainerTd>
                    </td>
                    <td>
                      <ContainerTd>
                        <SpanWithStatus
                          status={bet.whoWin === 1 ? 'green' : 'red'}
                        >
                          R$ {formatCashField(bet.returnBet.toFixed(2))}
                        </SpanWithStatus>
                        <SpanWithStatus
                          status={bet.whoWin === 2 ? 'green' : 'red'}
                        >
                          R$ {formatCashField(bet.returnBetB.toFixed(2))}
                        </SpanWithStatus>
                      </ContainerTd>
                    </td>
                    <td>
                      <ContainerTd>
                        <SpanWithStatus
                          status={bet.whoWin === 1 ? 'green' : 'red'}
                        >
                          R$ {formatCashField(bet.profitBet.toFixed(2))}
                        </SpanWithStatus>
                        <SpanWithStatus
                          status={bet.whoWin === 2 ? 'green' : 'red'}
                        >
                          R$ {formatCashField(bet.profitBetB.toFixed(2))}
                        </SpanWithStatus>
                      </ContainerTd>
                    </td>
                    <td>
                      {format(new Date(bet.date), "d 'de' LLLL 'às' HH:mm'h'", {
                        locale: ptBR,
                      })}
                    </td>
                  </tr>
                )
              }
            })}
        </tbody>
      </table>
    </TableContainer>
  )
}
