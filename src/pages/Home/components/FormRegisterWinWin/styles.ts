import styled from 'styled-components'

export const WinWinContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;

  > div > h3 {
    text-align: center;
    padding: 0.5rem;
  }

  @media (max-width: 768px) {
    /* grid-template-columns: 1fr; */
    width: 80%;
  }
`

export const ContainerCard = styled.div`
  background: ${(props) => props.theme['blue-1000']};

  padding: 2rem 1rem;
  border-radius: 26px;
  > label {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
  }
`

export const TeamTitle = styled.div`
  text-align: center;
  background: ${(props) => props.theme['blue-100']};

  border-radius: 34px;
  padding: 0.875rem 1.5rem;

  & > h3 {
    color: ${(props) => props.theme.white};
    font-size: 1rem;
  }
`

export const TitleCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > span {
    background: ${(props) => props.theme['gray-600']};
    border-radius: 10px 10px 0px 0px;
    padding: 0.875rem;
    color: ${(props) => props.theme.white};
    font-weight: 600;
  }

  &::after {
    content: '';
    width: 180%;
    height: 0.125rem;
    border-radius: 5px;
    background: ${(props) => props.theme['gray-600']};
  }
`

export const TitlesContainer = styled.div`
  display: flex;
  width: 100%;
  margin: -3.5rem 0 1rem 0;
  justify-content: space-between;
  align-items: center;
`

export const WinWinValueSugestionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  border: 1px solid ${(props) => props.theme['green-100']};
  border-radius: 34px;

  padding: 0.7rem;
  margin-bottom: 1rem;

  cursor: not-allowed;

  > span {
    color: ${(props) => props.theme['green-100']};
    font-weight: 600;
    white-space: nowrap;
  }
`
