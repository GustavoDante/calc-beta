import { useContext } from 'react'
import { AuthGoogleContext } from '../../../../contexts/AuthGoogleContext'
import Modal from 'react-modal'
import { Container } from './styles'
import { modalProps } from '../../../../styles/global'

interface logoutConfirmationModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

export function LogoutConfirmationModal({
  isOpen,
  onRequestClose,
}: logoutConfirmationModalProps) {
  const { signOut } = useContext(AuthGoogleContext)

  function handleLogout() {
    onRequestClose()
    signOut()
  }

  return (
    <Modal
      appElement={document.getElementById('root') || undefined}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalProps}
    >
      <Container>
        <header>Tem certeza que deseja sair?</header>
        <div>
          <button onClick={handleLogout}>Sim</button>
          <button onClick={onRequestClose}>Não</button>
        </div>
      </Container>
    </Modal>
  )
}
