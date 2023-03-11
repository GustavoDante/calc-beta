import { Trash } from 'phosphor-react'
import { ResumeCard } from './ResumeCard'
import {
  ActionsContainer,
  Container,
  DeleteAllBets,
  FilterContainer,
  FilterDate,
} from './styles'
import { TableWithHistory } from './TableWithHistory'
import { useContext, useState } from 'react'
import { BetsContext } from '../../contexts/BetsContext'
import { DeleteAllBetsConfirmationModal } from './components/deleteAllBetsConfirmationModal'
import CalendarIcon from '../../assets/calendar.svg'
import FilterIcon from '../../assets/filter.svg'
import FilterSlash from '../../assets/filter-slash.svg'

export function History() {
  const { resetBets, setFilterDate, filterDate } = useContext(BetsContext)
  const [showModal, setShowModal] = useState<boolean>(false)

  function handleDeleteAllBets() {
    setShowModal(true)
  }

  return (
    <Container>
      <ResumeCard />
      <ActionsContainer>
        <FilterContainer isFiltered={!!filterDate}>
          <div>
            <img src={FilterIcon} alt="" />
            <FilterDate
              type="date"
              value={filterDate}
              min="2023-01-01"
              max={new Date().toISOString().split('T')[0]}
              icon={CalendarIcon}
              onChange={(e) => setFilterDate(e.target.value)}
            ></FilterDate>
          </div>

          <button type="button" onClick={() => setFilterDate('')}>
            <img src={FilterSlash} alt="" />
          </button>
        </FilterContainer>

        <DeleteAllBets type="button" onClick={handleDeleteAllBets}>
          Excluir tudo <Trash size={20} />
        </DeleteAllBets>
      </ActionsContainer>

      <TableWithHistory />
      <DeleteAllBetsConfirmationModal
        deleteAllBets={resetBets}
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
      />
    </Container>
  )
}
