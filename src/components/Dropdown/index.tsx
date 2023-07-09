import Select from 'react-select'

const leagues = [
  { value: 'lck', label: 'LCK' },
  { value: 'lpl', label: 'LPL' },
  { value: 'cblol', label: 'CBLOL' },
  { value: 'lcs', label: 'LCS' },
  { value: 'cblol/academy', label: 'CBLOL/academy' },
]

const lines = [
  { value: 'victory', label: 'Victory' },
  { value: 'handicap-kills', label: 'Handicap kills' },
  { value: 'handicap-map', label: 'Handicap time' },
  { value: 'map-winner', label: 'Map winner' },
  { value: 'first-blood', label: 'First blood' },
  { value: 'first-to-score-kills', label: 'First to score kills' },
  { value: 'first-baron', label: 'First Baron' },
  { value: 'total-barons', label: 'Total Barons' },
  { value: 'total-dragons', label: 'Total Dragons' },
  { value: 'total-towers', label: 'Total Towers' },
  { value: 'total-kills', label: 'Total Kills' },
  { value: 'total-maps', label: 'Total Maps' },
  { value: 'over/under-time', label: 'Over/Under time' },
]

interface DropdownProps {
  type: string
  handleSelectChange: (value: any) => void
  width: string
  value: {
    value: string
    label: string
  }
}

export function Dropdown({
  type,
  handleSelectChange,
  width,
  value,
}: DropdownProps) {
  const customStyles = {
    control: (baseStyles: any, state: any) => ({
      ...baseStyles,
      border: '0',
      boxShadow: 'none',
      borderRadius: '4px',
      background: 'transparent',
      padding: '0',
      width,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      padding: 10,
      fontSize: '16px',
      margin: '0',
    }),
    menu: (provided: any, state: any) => ({
      ...provided,
      background: '#373270',
      borderRadius: '4px',
      marginTop: '0',
      padding: '0',
    }),
  }

  const options = type === 'leagues' ? leagues : lines

  const placeholder =
    type === 'leagues' ? 'Selecione uma liga' : 'Selecione uma linha'

  return (
    <Select
      options={options}
      styles={customStyles}
      onChange={handleSelectChange}
      theme={(theme) => ({
        ...theme,
        borderRadius: 8,
        colors: {
          ...theme.colors,
          neutral0: '#373270',
          primary25: '#373270',
          neutral80: '#E1E1E6',
        },
      })}
      placeholder={placeholder}
      value={value.label ? value : null}
    />
  )
}
