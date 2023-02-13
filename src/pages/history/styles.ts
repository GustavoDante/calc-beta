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

export const DeleteAllBetsContainer = styled.div`
  width: 100%;
  align-items: center;
  justify-content: end;
  display: flex;

  button {
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
  }
`
