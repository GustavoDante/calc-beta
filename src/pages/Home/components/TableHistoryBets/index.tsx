import { format } from 'date-fns'
import { ButtonFinalize, ContainerActions } from './styles'
import { ptBR } from 'date-fns/locale'
import { Bet, BetsContext } from '../../../../contexts/BetsContext'
import { useContext, useState } from 'react'
import { Trash } from 'phosphor-react'
import { ContainerTd, TableContainer } from '../../../../styles/global'
import { ConfirmationFinalizeModal } from './components/ConfirmationFinalizeModal'

export function TableHistoryBets() {
  const { bets, formatCashField, handleFinalizeBet, handleDeleteBet } =
    useContext(BetsContext)
  const [showModal, setShowModal] = useState(false)
  const [selectBet, setSelectBet] = useState<Bet>({} as Bet)
  const [finalizeBetWith, setFinalizeBeWith] = useState<
    'win' | 'lose' | 'delete' | 1 | 2
  >('win')

  function finalizeBetWithWin(id: string) {
    handleFinalizeBet(id, true, null)
    setShowModal(false)
  }

  function finalizeBetWithLose(id: string) {
    handleFinalizeBet(id, false, null)
    setShowModal(false)
  }

  function deleteBet(id: string) {
    handleDeleteBet(id)
    setShowModal(false)
  }

  function finalizeBetWinWin(id: string) {
    handleFinalizeBet(id, true, finalizeBetWith as 1 | 2)
    setShowModal(false)
  }

  function handleFinalizeBetWinWin(bet: Bet, whoWin: 1 | 2) {
    setSelectBet(bet)
    setFinalizeBeWith(whoWin)
    setShowModal(true)
  }

  function handleFinalizeBetWithWin(bet: Bet) {
    setSelectBet(bet)
    setFinalizeBeWith('win')
    setShowModal(true)
  }

  function handleFinalizeBetWithLose(bet: Bet) {
    setSelectBet(bet)
    setFinalizeBeWith('lose')
    setShowModal(true)
  }

  function handleDeleteBetWithModal(bet: Bet) {
    setSelectBet(bet)
    setFinalizeBeWith('delete')
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
            <th>Lucro</th>
            <th>Data</th>
            <th>Finalizar</th>
          </tr>
        </thead>
        <tbody>
          {bets
            .filter((bet) => bet.win === null)
            .map((bet) => {
              if (bet.winWin === false) {
                return (
                  <tr key={bet.id}>
                    <td></td>
                    <td>R$ {formatCashField(bet.value.toFixed(2))}</td>
                    <td>{bet.multiplier.toFixed(2)} X</td>
                    <td>R$ {formatCashField(bet.returnBet.toFixed(2))}</td>
                    <td>R$ {formatCashField(bet.profitBet.toFixed(2))}</td>
                    <td>
                      {format(new Date(bet.date), "d 'de' LLLL 'às' HH:mm'h'", {
                        locale: ptBR,
                      })}
                    </td>
                    <td>
                      <ButtonFinalize
                        type="button"
                        status="green"
                        onClick={() => handleFinalizeBetWithWin(bet)}
                      >
                        win
                      </ButtonFinalize>
                      <ButtonFinalize
                        type="button"
                        status="red"
                        onClick={() => handleFinalizeBetWithLose(bet)}
                      >
                        Lose
                      </ButtonFinalize>
                      <ContainerActions>
                        <button
                          type="button"
                          onClick={() => handleDeleteBetWithModal(bet)}
                          title="Delete bet"
                        >
                          <Trash size={20} />
                        </button>
                      </ContainerActions>
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
                    <td>
                      <ButtonFinalize
                        type="button"
                        status="green"
                        onClick={() => handleFinalizeBetWinWin(bet, 1)}
                      >
                        Time A
                      </ButtonFinalize>
                      <ButtonFinalize
                        type="button"
                        status="blue"
                        onClick={() => handleFinalizeBetWinWin(bet, 2)}
                      >
                        Time B
                      </ButtonFinalize>
                      <ContainerActions>
                        <button
                          type="button"
                          onClick={() => handleDeleteBetWithModal(bet)}
                          title="Delete bet"
                        >
                          <Trash size={20} />
                        </button>
                      </ContainerActions>
                    </td>
                  </tr>
                )
              }
            })}
        </tbody>
      </table>
      <ConfirmationFinalizeModal
        isOpen={showModal}
        handleFinalizeBet={
          finalizeBetWith === 'win'
            ? finalizeBetWithWin
            : finalizeBetWith === 1 || finalizeBetWith === 2
            ? finalizeBetWinWin
            : finalizeBetWith === 'lose'
            ? finalizeBetWithLose
            : deleteBet
        }
        onRequestClose={() => setShowModal(false)}
        bet={selectBet}
        finalizeBetWith={finalizeBetWith}
      />
    </TableContainer>
  )
}
