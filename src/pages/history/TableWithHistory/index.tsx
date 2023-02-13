import { useContext, useState } from 'react'
import { Bet, BetsContext } from '../../../contexts/BetsContext'
import { ContainerTd, TableContainer } from '../../../styles/global'
import { format } from 'date-fns'
import { SpanWithStatus, TrashContainer } from './styles'
import ptBR from 'date-fns/locale/pt-BR'
import { Trash } from 'phosphor-react'
import { ConfirmationFinalizeModal } from '../../../components/ConfirmationFinalizeModal'

export function TableWithHistory() {
  const { bets, formatCashField, handleDeleteBet } = useContext(BetsContext)
  const [selectBet, setSelectBet] = useState<Bet>({} as Bet)
  const [showModal, setShowModal] = useState(false)

  function deleteBet(id: string) {
    handleDeleteBet(id)
    setShowModal(false)
  }

  function handleDeleteBetWithModal(bet: Bet) {
    setSelectBet(bet)
    setShowModal(true)
  }

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
            <th></th>
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
                    <td>
                      <TrashContainer isWinWin={false}>
                        <button
                          type="button"
                          onClick={() => handleDeleteBetWithModal(bet)}
                          title="Delete bet"
                        >
                          <Trash size={18} />
                        </button>
                      </TrashContainer>
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
                    <td>
                      <TrashContainer isWinWin={true}>
                        <button
                          type="button"
                          onClick={() => handleDeleteBetWithModal(bet)}
                          title="Delete bet"
                        >
                          <Trash size={18} />
                        </button>
                      </TrashContainer>
                    </td>
                  </tr>
                )
              }
            })}
        </tbody>
        <ConfirmationFinalizeModal
          isOpen={showModal}
          handleFinalizeBet={deleteBet}
          onRequestClose={() => setShowModal(false)}
          bet={selectBet}
          finalizeBetWith={'delete'}
        />
      </table>
    </TableContainer>
  )
}
