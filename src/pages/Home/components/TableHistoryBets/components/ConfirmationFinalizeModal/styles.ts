import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;

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
    display: flex;
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
