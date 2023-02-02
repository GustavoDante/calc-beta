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
  min-width: 13rem;
  padding: 2rem;
  border-radius: 8px;
`

export const CardValuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0.21rem 0;

  & > h5 {
    color: ${(props) => props.theme['purple-500']};
    font-size: 1rem;
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
