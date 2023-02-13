import Modal from 'react-modal'
import { modalProps } from './styles'
import { Container } from '../../../../components/ConfirmationFinalizeModal/styles'

interface DeleteAllBetsConfirmationModalProps {
  isOpen: boolean
  onRequestClose: () => void
  deleteAllBets: () => void
}
export function DeleteAllBetsConfirmationModal({
  isOpen,
  onRequestClose,
  deleteAllBets,
}: DeleteAllBetsConfirmationModalProps) {
  function handleDeleteAllBets() {
    deleteAllBets()
    onRequestClose()
  }

  return (
    <Modal
      appElement={document.getElementById('root') || undefined}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalProps}
    >
      <Container>
        <header>Excluir todos registros</header>
        <button onClick={onRequestClose}>x</button>
        <div>
          <span>Deseja realmente excluir todos os registros de apostas ?</span>
        </div>
        <footer>
          <button onClick={() => handleDeleteAllBets()}>Confirmar</button>
          <button onClick={onRequestClose}>Cancelar</button>
        </footer>
      </Container>
    </Modal>
  )
}
