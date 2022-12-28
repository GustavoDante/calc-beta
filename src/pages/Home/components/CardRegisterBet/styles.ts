import styled from 'styled-components'

interface IsValueDefinedProps {
  isvalueDefined: boolean
}

export const ReturnValueContainer = styled.div<IsValueDefinedProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${(props) => props.theme['green-500']};
  border-radius: 10px;
  padding: 0.7rem;
  justify-content: space-between;
  margin-bottom: 1rem;

  > span {
    color: ${(props) =>
      props.isvalueDefined ? props.theme.white : props.theme['gray-500']};
    font-weight: 600;
  }
`
export const InputFormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  background: ${(props) => props.theme['blue-400']};
  border-radius: 10px;
  padding: 0.7rem;
  margin-bottom: 1rem;

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

export const ContainerCard = styled.div`
  width: 18rem;
  background: ${(props) => props.theme['blue-1000']};

  padding: 2rem 1rem;
  border-radius: 26px;
  > label {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
  }
`

export const FormRegisterBetContainer = styled.form`
  display: flex;
  width: 100%;
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
export const TitleCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin: -3.5rem 0 1rem 0;

  & > span {
    background: ${(props) => props.theme['gray-600']};
    border-radius: 10px 10px 0px 0px;
    padding: 0.875rem;
    color: ${(props) => props.theme.white};
    font-weight: 600;
  }

  &::after {
    content: '';
    width: 100%;
    height: 0.125rem;
    border-radius: 5px;
    background: ${(props) => props.theme['gray-600']};
  }
`
export const Separator = styled.div`
  width: 100%;
  height: 0.125rem;
  border-radius: 5px;
  background: ${(props) => props.theme['gray-600']};
  margin: 1rem 0 1rem 0;
`
