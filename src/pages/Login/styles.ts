import styled, { css } from 'styled-components'

export const ContainerLogin = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;
  align-items: start;

  & > div:first-child {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    text-align: left;
    margin-top: 10rem;

    & > div:first-child {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 5rem;
    }

    & > div:last-child {
      width: 100%;
      text-align: center;
      & > span {
        color: ${(props) => props.theme['gray-100']};

        & > a {
          color: ${(props) => props.theme['purple-500']};
          text-decoration: none;
        }
      }
    }
  }

  & > div:last-child {
    align-items: center;

    > img {
      position: absolute;
      width: 45rem;
      height: calc(100vh - 10rem);
      top: 0;
      border-radius: 5rem 0 0 5rem;
    }
  }

  span {
    text-align: center;
  }
`

export const ButtonLoginWithGoogle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: transparent;
  color: ${(props) => props.theme['gray-100']};
  border: 1px solid ${(props) => props.theme['gray-100']};
  border-radius: 5px;
  padding: 0.5rem 1rem;
  width: 100%;

  > img {
    width: 2rem;
  }
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & > button[type='submit'] {
    background: ${(props) => props.theme['purple-500']};
    width: 100%;
    padding: 0.5rem;
    border-radius: 10px;
    border: 3px solid ${(props) => props.theme['purple-500']};
    color: ${(props) => props.theme.white};
    margin: 2rem 0 1rem 0;

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
  error?: boolean
}

export const InputFormContainer = styled.div<InputFormContainerProps>`
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid ${(props) => props.theme['gray-100']};
  ${(props) =>
    props.error &&
    css`
      border: 2px solid ${props.theme['red-500']};
      border-radius: 5px;
    `}

  & > input {
    width: 100%;
    height: 1rem;
    background: transparent;
    border: none;
    color: ${(props) => props.theme['gray-100']};
  }

  :focus-within {
    border: none;
    border-bottom: 2px solid ${(props) => props.theme.white};
  }
`

export const Error = styled.strong`
  color: ${(props) => props.theme['red-500']};
  font-size: 0.8rem;
  margin-top: 0.5rem;
`
