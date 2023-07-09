import styled from 'styled-components'

interface FilterDateProps {
  icon: string
}
export const FilterDate = styled.input<FilterDateProps>`
  position: relative;
  padding: 0.3rem 2rem 0.2rem 0.5rem;

  border: none;
  border-radius: 0.25rem;
  background: ${(props) => props.theme['gray-100']}
    url(${(props) => props.icon}) right 0.3rem center no-repeat;

  cursor: pointer;
  ::-webkit-datetime-edit {
  }
  ::-webkit-datetime-edit-fields-wrapper {
  }
  ::-webkit-datetime-edit-month-field:hover,
  ::-webkit-datetime-edit-day-field:hover,
  ::-webkit-datetime-edit-year-field:hover {
    background: rgba(0, 120, 250, 0.1);
  }
  ::-webkit-datetime-edit-text {
    opacity: 0;
  }
  ::-webkit-clear-button,
  ::-webkit-inner-spin-button {
    display: none;
  }
  ::-webkit-calendar-picker-indicator {
    position: absolute;
    width: 2.5rem;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;

    opacity: 0;
    cursor: pointer;

    color: rgba(0, 120, 250, 1);
    background: rgba(0, 120, 250, 1);
  }

  input[type='date']:hover::-webkit-calendar-picker-indicator {
    opacity: 0.05;
  }
  input[type='date']:hover::-webkit-calendar-picker-indicator:hover {
    opacity: 0.15;
  }

  :focus {
    outline: none;
    box-shadow: none;
  }
`

interface FilterContainerProps {
  isFiltered: boolean
}
export const FilterContainer = styled.div<FilterContainerProps>`
  display: block;
  width: 100%;

  & > div {
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;

    + div {
      margin-top: 1.5rem;
    }

    & > div {
      margin-top: 1rem;
      background: ${(props) => props.theme['purple-700']};
      border-radius: 0.25rem;
    }

    & > input {
      width: 100%;
      padding: 0.5rem;
      margin-top: 1rem;
    }
  }
`

export const ButtonClear = styled.button`
  display: flex;
  align-items: center;

  & > img {
    width: 0.9rem;
    height: 0.9rem;
    margin-left: 0.5rem;
  }
`
