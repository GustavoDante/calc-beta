import Modal from 'react-modal'
import { ContainerModal, modalProps } from '../../../../styles/global'

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
      <ContainerModal>
        <header>Excluir todos registros</header>
        <button onClick={onRequestClose}>x</button>
        <div>
          <span>Deseja realmente excluir todos os registros de apostas ?</span>
        </div>
        <footer>
          <button onClick={() => handleDeleteAllBets()}>Confirmar</button>
          <button onClick={onRequestClose}>Cancelar</button>
        </footer>
      </ContainerModal>
    </Modal>
  )
}
