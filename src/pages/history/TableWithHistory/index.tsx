import { useContext } from 'react'
import { BetsContext } from '../../../contexts/BetsContext'
import { TableContainer } from '../../../styles/global'
import { format } from 'date-fns'
import { Balance } from './styles'
import ptBR from 'date-fns/locale/pt-BR'
import { ContainerTd } from '../../Home/components/TableHistoryBets/styles'

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
                      <Balance status={'green'}>
                        <strong>
                          + R$ {formatCashField(bet.profitBet.toFixed(2))}
                        </strong>
                      </Balance>
                    ) : (
                      <Balance status={'red'}>
                        <strong>
                          - R$ {formatCashField(bet.value.toFixed(2))}
                        </strong>
                      </Balance>
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
                        <strong>A</strong>
                        <strong>B</strong>
                      </ContainerTd>
                    </td>
                    <td>
                      {/* <strong>Time B</strong> */}
                      <ContainerTd>
                        <span>R$ {formatCashField(bet.value.toFixed(2))}</span>
                        <span>R$ {formatCashField(bet.valueB.toFixed(2))}</span>
                      </ContainerTd>
                    </td>
                    <td>
                      <ContainerTd>
                        <span>{bet.multiplier.toFixed(2)} X</span>
                        <span>{bet.multiplierB.toFixed(2)} X</span>
                      </ContainerTd>
                    </td>
                    <td>
                      <ContainerTd>
                        <span>
                          R$ {formatCashField(bet.returnBet.toFixed(2))}
                        </span>
                        <span>
                          R$ {formatCashField(bet.returnBetB.toFixed(2))}
                        </span>
                      </ContainerTd>
                    </td>
                    <td>
                      <ContainerTd>
                        <span>
                          R$ {formatCashField(bet.profitBet.toFixed(2))}
                        </span>
                        <span>
                          R$ {formatCashField(bet.profitBetB.toFixed(2))}
                        </span>
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
