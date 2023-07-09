import Modal from 'react-modal'
import CalendarIcon from '../../../../assets/calendar.svg'
import FilterSlash from '../../../../assets/filter-slash.svg'
import { ChangeEvent, useContext, useState } from 'react'
import { BetsContext } from '../../../../contexts/BetsContext'
import { ButtonClear, FilterContainer, FilterDate } from './styles'
import { ContainerModal, modalProps } from '../../../../styles/global'
import { Dropdown } from '../../../../components/Dropdown'
import { league, line } from '../../../../@types/types'

interface FilterBetsModalProps {
  isOpen: boolean
  onRequestClose: () => void
}
export function FilterBetsModal({
  isOpen,
  onRequestClose,
}: FilterBetsModalProps) {
  const { filter, handleSetFilter } = useContext(BetsContext)

  const [date, setDate] = useState<string>(filter.date)
  const [league, setLeague] = useState<league>(filter.league)
  const [line, setLine] = useState<line>({ label: '', value: '' })

  function handleClearFilter() {
    setDate('')
    setLeague({ label: '', value: '' })
    setLine({ label: '', value: '' })
  }

  function handleFilter() {
    handleSetFilter({
      date: date === '' ? '' : date,
      league,
      line,
    })
    onRequestClose()
  }

  const handleLeagueChange = (selectedOption: any) => {
    setLeague(selectedOption)
  }

  const handleLineChange = (selectedOption: any) => {
    setLine(selectedOption)
  }

  const handleDateChange = (selectedOption: string) => {
    setDate(selectedOption)
  }

  //   useEffect(() => {
  //     handleFilter()
  //   }, [league, line, date])

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
              value={date}
              min="2023-01-01"
              max={new Date().toISOString().split('T')[0]}
              icon={CalendarIcon}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleDateChange(e.target.value)
              }
            ></FilterDate>
          </div>
          <div>
            <h2>Liga:</h2>
            <Dropdown
              type={'leagues'}
              handleSelectChange={handleLeagueChange}
              width={'290px'}
              value={league}
            />
          </div>
          <div>
            <h2>Linha:</h2>
            <Dropdown
              type={'lines'}
              handleSelectChange={handleLineChange}
              width={'290px'}
              value={line}
            />
          </div>
        </FilterContainer>
        <footer>
          <button onClick={handleFilter}>Filtrar</button>
          <ButtonClear onClick={handleClearFilter}>
            Limpar
            <img src={FilterSlash} alt="" />
          </ButtonClear>
        </footer>
      </ContainerModal>
    </Modal>
  )
}
