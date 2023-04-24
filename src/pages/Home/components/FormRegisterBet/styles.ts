import styled from 'styled-components'

export const ContainerCard = styled.div`
  width: 18rem;
  background: ${(props) => props.theme['blue-1000']};

  padding: 2rem 1rem;
  border-radius: 26px;
  box-shadow: 0 0 0.5rem 0.5rem ${(props) => props.theme['blue-900']};
  > label {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
  }
`
