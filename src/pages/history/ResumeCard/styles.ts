import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme['blue-1000']};
  width: 40%;
  padding: 2rem;
  border-radius: 8px;
`

export const TitleCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: -3.5rem 0 1rem 0;
  width: 50%;

  > h1 {
    padding: 1rem;
    background: ${(props) => props.theme['gray-600']};
    border-radius: 10px 10px 0px 0px;
    padding: 5px 20px;
  }

  ::after {
    content: '';
    width: 100%;
    height: 0.125rem;
    border-radius: 5px;
    background: ${(props) => props.theme['gray-600']};
  }
`
export const CardValuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0.21rem 0;

  & > h5 {
    color: ${(props) => props.theme['yellow-500']};
  }

  & > div {
    display: flex;
    background: ${(props) => props.theme['gray-300']};
    color: ${(props) => props.theme['blue-1000']};
    width: 100%;
    padding: 0.5rem;
    border-radius: 8px;
    margin: 0.5rem 0;

    & > span {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      font-weight: 600;
    }
  }
`
