import styled, { css } from 'styled-components'

interface ButtonFinalizeProps {
  status: 'green' | 'red' | 'blue'
}

export const ButtonFinalize = styled.button<ButtonFinalizeProps>`
  border: none;
  width: 4rem;
  height: 3rem;
  color: ${(props) => props.theme['gray-300']};
  ${(props) => {
    if (props.status === 'green') {
      return css`
        background-color: ${props.theme['green-700']};
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        &:hover {
          box-shadow: 0 0 0 0.1rem ${(props) => props.theme['green-700']};
        }
      `
    } else if (props.status === 'red') {
      return css`
        background-color: ${props.theme['red-700']};
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;

        &:hover {
          box-shadow: 0 0 0 0.1rem ${(props) => props.theme['red-700']};
        }
      `
    } else if (props.status === 'blue') {
      return css`
        background-color: ${props.theme['blue-700']};
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        &:hover {
          box-shadow: 0 0 0 0.1rem ${(props) => props.theme['blue-700']};
        }
      `
    }
  }}
`

export const ContainerActions = styled.div`
  position: absolute;
  top: 1rem;
  right: 0.7rem;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    width: 1.5rem;
    height: 3rem;
    border-radius: 5px;
    background: transparent;
    color: ${(props) => props.theme['red-700']};
  }
`
