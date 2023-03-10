import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  > h1 {
    margin: 0.5rem 0 2rem 0;
  }

  > form {
    display: flex;
    width: 100%;
  }
`

export const DeleteAllBets = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme['red-500']};
  border: none;
  padding: 0.25rem 0.5rem 0.25rem 0.6rem;
  border-radius: 5px;
  color: ${(props) => props.theme.white};
  font-weight: 600;
  font-size: 0.9rem;
`

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

interface FilterContainerProps {
  isFiltered: boolean
}
export const FilterContainer = styled.div<FilterContainerProps>`
  display: flex;

  div:first-child {
    display: flex;
    align-items: center;
    background: ${(props) => props.theme['gray-100']};

    border-radius: 0.25rem;

    & > img {
      padding-left: 0.2rem;
      width: 1.5rem;
    }
  }

  & > button {
    display: ${(props) => (props.isFiltered ? 'flex' : 'none')};
    margin-left: 0.5rem;
    background: ${(props) => props.theme['red-500']};
    padding: 0.2rem 0.5rem 0rem;
    border: none;
    border-radius: 0.25rem;

    & > img {
      width: 1.5rem;
    }
  }
`
interface FilterDateProps {
  icon: string
}
export const FilterDate = styled.input<FilterDateProps>`
  display: block;
  position: relative;
  padding: 0.3rem 2rem 0.2rem 0.5rem;

  border: none;
  border-radius: 0 0.25rem 0.25rem 0;
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
