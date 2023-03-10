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
  const { resetBets } = useContext(BetsContext)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [date, setDate] = useState<string>('')

  function handleDeleteAllBets() {
    setShowModal(true)
  }
  //   console.log(new Date(date))
  return (
    <Container>
      <ResumeCard />
      <ActionsContainer>
        <FilterContainer isFiltered={!!date}>
          <div>
            <img src={FilterIcon} alt="" />
            <FilterDate
              type="date"
              value={date}
              min="2005-01-01"
              max={new Date().toISOString().split('T')[0]}
              icon={CalendarIcon}
              onChange={(e) => setDate(e.target.value)}
            ></FilterDate>
          </div>

          <button type="button" onClick={() => setDate('')}>
            <img src={FilterSlash} alt="" />
          </button>
        </FilterContainer>

        <DeleteAllBets type="button" onClick={handleDeleteAllBets}>
          Excluir tudo <Trash size={20} />
        </DeleteAllBets>
      </ActionsContainer>

      <TableWithHistory filterDate={date} />
      <DeleteAllBetsConfirmationModal
        deleteAllBets={resetBets}
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
      />
    </Container>
  )
}
