import Modal from 'react-modal'
import CalendarIcon from '../../../../assets/calendar.svg'
import FilterSlash from '../../../../assets/filter-slash.svg'
import { useContext } from 'react'
import { BetsContext } from '../../../../contexts/BetsContext'
import { FilterContainer, FilterDate } from './styles'
import { ContainerModal, modalProps } from '../../../../styles/global'

interface FilterBetsModalProps {
  isOpen: boolean
  onRequestClose: () => void
  filterBets: () => void
}
export function FilterBetsModal({
  isOpen,
  onRequestClose,
  filterBets,
}: FilterBetsModalProps) {
  const { filter, setFilterDate } = useContext(BetsContext)

  function handleFilterBets() {
    filterBets()
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
        <header>Filtrar registros</header>
        <button onClick={onRequestClose}>x</button>
        <FilterContainer isFiltered={!!filter.date}>
          <div>
            <h2>Data:</h2>
            <FilterDate
              type="date"
              value={filter.date}
              min="2023-01-01"
              max={new Date().toISOString().split('T')[0]}
              icon={CalendarIcon}
              onChange={(e) => setFilterDate(e.target.value)}
            ></FilterDate>
          </div>
          <div>
            <h2>Data:</h2>
            <FilterDate
              type="date"
              value={filter.date}
              min="2023-01-01"
              max={new Date().toISOString().split('T')[0]}
              icon={CalendarIcon}
              onChange={(e) => setFilterDate(e.target.value)}
            ></FilterDate>
          </div>
        </FilterContainer>
        <footer>
          <button onClick={() => handleFilterBets()}>Filtrar</button>
          <button onClick={onRequestClose}>
            Limpar
            <img src={FilterSlash} alt="" />
          </button>
        </footer>
      </ContainerModal>
    </Modal>
  )
}
