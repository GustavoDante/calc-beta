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

  gap: 2rem;
`

export const CardsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: start;

  @media (max-width: 1320px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3rem;
  }
`

export const FormRegisterBetContainer = styled.form`
  display: flex;
  justify-content: space-between;

  input::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }

  button[type='submit'] {
    background: ${(props) => props.theme['purple-500']};
    width: 100%;
    padding: 0.5rem;
    border-radius: 10px;
    border: 3px solid ${(props) => props.theme['purple-500']};
    color: ${(props) => props.theme.white};
    font-weight: 800;

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

interface InputFormContainerProps {
  padding?: boolean
}

export const InputFormContainer = styled.div<InputFormContainerProps>`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  background: ${(props) => props.theme['purple-700']};
  border-radius: 14px;
  padding: ${(props) => (!props.padding ? '0.7rem' : '0')};
  margin-bottom: 1rem;
  border: 2px solid transparent;

  > input {
    width: 10rem;
    background: transparent;
    color: ${(props) => props.theme.white};
    font-weight: 600;
    border: none;

    &:focus {
      box-shadow: none;
    }

    @media (max-width: 768px) {
      width: 80%;
    }
  }

  > span {
    color: ${(props) => props.theme.white};
  }

  > label {
    width: 100%;
  }

  :focus-within {
    box-shadow: 0 0 0 2px ${(props) => props.theme['purple-500']};
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
  border: 2px solid
    ${(props) =>
      props.isValuePositive
        ? props.theme['purple-500']
        : props.theme['red-500']};
  border-radius: 14px;
  padding: 0.7rem;
  justify-content: space-between;
  margin-bottom: 1rem;

  cursor: not-allowed;

  > span {
    color: ${(props) =>
      props.isvalueDefined ? props.theme.white : props.theme['gray-500']};
    font-weight: 600;
    white-space: nowrap;
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
