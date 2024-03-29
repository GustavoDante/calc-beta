import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :focus {
        outline: none;
        box-shadow: 0 0 0 2px ${(props) => props.theme['gray-800']};
    }

    body {
        background-color: ${(props) => props.theme['blue-900']};
        color: ${(props) => props.theme['gray-300']};
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
        font-family: 'Roboto', sans-serif;
        font-size: 1rem;
        font-weight: 400;
    }

    button {
        cursor: pointer;
    }

    a {
        cursor: pointer;
    }
`

export const TableContainer = styled.div`
  flex: 1;
  overflow: auto;
  width: 100%;
  box-shadow: 0 0 0.5rem 0.5rem ${(props) => props.theme['gray-700']};

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 930px;

    th {
      background-color: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme.white};
      font-size: 0.875rem;
      line-height: 1.6;
      text-align: center;

      &:first-child {
        width: 5px;
        padding: 0;
        border-top-left-radius: 4px;
        padding-left: 1.5rem;
      }

      &:last-child {
        width: 5px;
        padding: 0;
        border-top-right-radius: 4px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${(props) => props.theme['gray-700']};
      border-top: ${(props) => props.theme['gray-800']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;
      text-align: center;

      &:first-child {
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
        position: relative;
        white-space: nowrap;
      }
    }
  }

  ::-webkit-scrollbar {
    width: 6px;
    border-radius: 2px;
    background: ${(props) => props.theme['gray-100']};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme['gray-600']};
    border-radius: 2px;
  }
`

export const ContainerTd = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const TitleCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin: -3.5rem 0 1rem 0;

  & > span {
    background: ${(props) => props.theme['gray-100']};
    border-radius: 14px;
    padding: 0.875rem 1.5rem;
    color: ${(props) => props.theme['blue-1000']};
    font-weight: 600;
    font-size: 1rem;
  }

  /* &::after {
    content: '';
    width: 100%;
    height: 0.125rem;
    border-radius: 5px;
    background: ${(props) => props.theme['gray-600']};
  } */
`

export const ContainerModal = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  min-width: 20rem;

  background: ${(props) => props.theme['gray-800']};

  & > button {
    position: absolute;
    top: 0;
    right: 0;
    background: transparent;
    border: none;
    color: ${(props) => props.theme.white};
    padding: 0.5rem;
  }

  & > header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: ${(props) => props.theme['purple-500']};
  }

  & > div {
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
  }

  & > footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: -1rem;
    gap: 1rem;

    & > button {
      border: none;
      padding: 0.5rem;
      border-radius: 5px;
      color: ${(props) => props.theme['gray-300']};
      font-weight: 600;

      :first-child {
        background: ${(props) => props.theme['green-700']};
      }

      :last-child {
        background: ${(props) => props.theme['red-700']};
      }
    }
  }
`

export const modalProps = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#202024',
    border: 'none',
  },
}
