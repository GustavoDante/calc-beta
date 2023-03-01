import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  background: ${(props) => props.theme['gray-800']};

  & > header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: ${(props) => props.theme['gray-300']};
  }

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 1rem;

    & > button {
      padding: 0.5rem;
      border-radius: 5px;
      width: 50%;
      color: ${(props) => props.theme['gray-300']};
      font-weight: 600;

      :first-child {
        background: transparent;
        border: 2px solid ${(props) => props.theme['purple-500']};
      }

      :last-child {
        border: none;
        background: ${(props) => props.theme['purple-500']};
      }
    }
  }
`
