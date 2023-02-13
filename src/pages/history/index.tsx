import { Trash } from 'phosphor-react'
import { ResumeCard } from './ResumeCard'
import { Container, DeleteAllBetsContainer } from './styles'
import { TableWithHistory } from './TableWithHistory'
import { useContext, useState } from 'react'
import { BetsContext } from '../../contexts/BetsContext'
import { DeleteAllBetsConfirmationModal } from './components/deleteAllBetsConfirmationModal'

export function History() {
  const { resetBets } = useContext(BetsContext)
  const [showModal, setShowModal] = useState(false)

  function handleDeleteAllBets() {
    setShowModal(true)
  }

  return (
    <Container>
      <ResumeCard />
      <DeleteAllBetsContainer>
        <button type="button" onClick={handleDeleteAllBets}>
          Excluir tudo <Trash size={20} />
        </button>
      </DeleteAllBetsContainer>
      <TableWithHistory />
      <DeleteAllBetsConfirmationModal
        deleteAllBets={resetBets}
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
      />
    </Container>
  )
}
