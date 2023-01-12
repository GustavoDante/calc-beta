import styled from 'styled-components'

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
