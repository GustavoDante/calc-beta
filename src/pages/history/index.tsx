import { Trash } from 'phosphor-react'
import { ResumeCard } from './ResumeCard'
import {
  ActionsContainer,
  Container,
  DeleteAllBets,
  FilterButton,
} from './styles'
import { TableWithHistory } from './TableWithHistory'
import { useContext, useState } from 'react'
import FilterIcon from '../../assets/filter.svg'
import { BetsContext } from '../../contexts/BetsContext'
import { DeleteAllBetsConfirmationModal } from './components/deleteAllBetsConfirmationModal'
import { FilterBetsModal } from './components/filterBetsModal'

export function History() {
  const { resetBets, handleSetFilter } = useContext(BetsContext)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false)

  function handleDeleteAllBets() {
    setShowDeleteModal(true)
  }

  function handleFilterBets() {
    setShowFilterModal(true)
  }

  return (
    <Container>
      <ResumeCard />
      <ActionsContainer>
        <FilterButton type="button" onClick={handleFilterBets}>
          <img src={FilterIcon} alt="" />
        </FilterButton>
        <DeleteAllBets type="button" onClick={handleDeleteAllBets}>
          Excluir tudo <Trash size={20} />
        </DeleteAllBets>
      </ActionsContainer>

      <TableWithHistory />
      <DeleteAllBetsConfirmationModal
        deleteAllBets={resetBets}
        isOpen={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
      />
      <FilterBetsModal
        isOpen={showFilterModal}
        onRequestClose={() => setShowFilterModal(false)}
        filterBets={() => handleSetFilter}
      />
    </Container>
  )
}
