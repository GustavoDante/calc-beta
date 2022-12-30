import { format } from 'date-fns'
import { ButtonFinalize, ContainerActions } from './styles'
import { ptBR } from 'date-fns/locale'
import { Bet, BetsContext } from '../../../../contexts/BetsContext'
import { useContext, useState } from 'react'
import { Trash } from 'phosphor-react'
import { TableContainer } from '../../../../styles/global'
import { ConfirmationFinalizeModal } from './components/ConfirmationFinalizeModal'

export function TableHistoryBets() {
  const { bets, formatCashField, handleSetBets } = useContext(BetsContext)
  const [showModal, setShowModal] = useState(false)
  const [selectBet, setSelectBet] = useState<Bet>({} as Bet)
  const [finalizeBetWith, setFinalizeBeWith] = useState<
    'win' | 'lose' | 'delete'
  >('win')

  function finalizeBetWithWin(id: string) {
    handleSetBets(
      bets.map((bet) => (bet.id === id ? { ...bet, win: true } : bet)),
    )
    setShowModal(false)
  }

  function finalizeBetWithLose(id: string) {
    handleSetBets(
      bets.map((bet) => (bet.id === id ? { ...bet, win: false } : bet)),
    )
    setShowModal(false)
  }

  function deleteBet(id: string) {
    handleSetBets(bets.filter((bet) => bet.id !== id))
    setShowModal(false)
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

  function handleDeleteBet(bet: Bet) {
    setSelectBet(bet)
    setFinalizeBeWith('delete')
    setShowModal(true)
  }

  return (
    <TableContainer>
      <table>
        <thead>
          <tr>
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
            .map((bet) => (
              <tr key={bet.id}>
                <td>R$ {formatCashField(bet.value.toFixed(2))}</td>
                <td>{bet.multiplier.toFixed(2)} X</td>
                <td>R$ {formatCashField(bet.returnBet.toFixed(2))}</td>
                <td>R$ {formatCashField(bet.profitBet.toFixed(2))}</td>
                <td>
                  {format(bet.date, "d 'de' LLLL 'às' HH:mm'h'", {
                    locale: ptBR,
                  })}
                </td>
                <td>
                  <ButtonFinalize
                    type="button"
                    status="win"
                    onClick={() => handleFinalizeBetWithWin(bet)}
                  >
                    win
                  </ButtonFinalize>
                  <ButtonFinalize
                    type="button"
                    status="lose"
                    onClick={() => handleFinalizeBetWithLose(bet)}
                  >
                    Lose
                  </ButtonFinalize>
                  <ContainerActions>
                    <button
                      type="button"
                      onClick={() => handleDeleteBet(bet)}
                      title="Delete bet"
                    >
                      <Trash size={20} />
                    </button>
                  </ContainerActions>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ConfirmationFinalizeModal
        isOpen={showModal}
        handleFinalizeBet={
          finalizeBetWith === 'win'
            ? finalizeBetWithWin
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
