import Modal from 'react-modal'
import { Container, modalProps } from './styles'
import { Bet } from '../../../../../../contexts/BetsContext'

interface ConfirmationFinalizeModalProps {
  isOpen: boolean
  onRequestClose: () => void
  bet: Bet
  finalizeBetWith: 'win' | 'lose' | 'delete' | 1 | 2
  handleFinalizeBet: (id: string) => void
}

export function ConfirmationFinalizeModal({
  isOpen,
  onRequestClose,
  bet,
  finalizeBetWith,
  handleFinalizeBet,
}: ConfirmationFinalizeModalProps) {
  return (
    <Modal
      appElement={document.getElementById('root') || undefined}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalProps}
    >
      <Container>
        <header>
          {finalizeBetWith === 'delete' ? 'Excluir ' : 'Finalizar '}aposta
        </header>
        <button onClick={onRequestClose}>x</button>
        <div>
          {finalizeBetWith === 'delete' ? (
            <span>Tem certeza que deseja excluir esta aposta?</span>
          ) : (
            <span>
              Tem certeza que deseja finalizar esta aposta com
              {}
              <strong>
                {finalizeBetWith === 'win' ? 'vitória' : 'derrota'}
              </strong>
              ?{' '}
            </span>
          )}
        </div>
        <footer>
          <button onClick={() => handleFinalizeBet(bet.id)}>Confirmar</button>
          <button onClick={onRequestClose}>Cancelar</button>
        </footer>
      </Container>
    </Modal>
  )
}
