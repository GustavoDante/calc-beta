import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > h1 {
    margin: 0.5rem 0 2rem 0;
  }

  > form {
    display: flex;
    width: 100%;
  }
`

export const CardsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: start;
`

export const FormRegisterBetContainer = styled.form`
  display: flex;
  justify-content: space-between;

  button[type='submit'] {
    background: ${(props) => props.theme['yellow-500']};
    width: 100%;
    padding: 0.5rem;
    border-radius: 10px;
    border: 3px solid ${(props) => props.theme['yellow-500']};
    color: ${(props) => props.theme['gray-900']};
    font-weight: 600;

    transition: filter 0.2s;

    :disabled {
      cursor: not-allowed;
      filter: opacity(0.5);
    }

    :not(:disabled):hover {
      filter: brightness(0.8);
    }
  }
`

export const InputFormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  background: ${(props) => props.theme['blue-700']};
  border-radius: 34rem;
  padding: 0.7rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;

  > input {
    width: 10rem;
    background: transparent;
    color: ${(props) => props.theme.white};
    font-weight: 600;
    border: none;

    &:focus {
      box-shadow: none;
    }
  }

  > span {
    color: ${(props) => props.theme.white};
  }

  > label {
    width: 100%;
  }

  :focus-within {
    box-shadow: 0 0 0 2px ${(props) => props.theme['blue-400']};
  }
`

interface ReturnValueContainerProps {
  isvalueDefined: boolean
  isValuePositive: boolean
}

export const ReturnValueContainer = styled.div<ReturnValueContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid
    ${(props) =>
      props.isValuePositive
        ? props.theme['green-500']
        : props.theme['red-700']};
  border-radius: 34px;
  padding: 0.7rem;
  justify-content: space-between;
  margin-bottom: 1rem;

  cursor: not-allowed;

  > span {
    color: ${(props) =>
      props.isvalueDefined ? props.theme.white : props.theme['gray-500']};
    font-weight: 600;
  }
`
export const Separator = styled.div`
  height: 0.125rem;
  border-radius: 5px;
  background: ${(props) => props.theme['gray-600']};
  margin: 1rem 0 1rem 0;
`

export const SeparatorBigger = styled(Separator)`
  width: 120%;
`
