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
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 8px;
  z-index: 1;
  box-shadow: 0 0 0.5rem 0.5rem ${(props) => props.theme['blue-1000']};
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

export const PercentageBarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  position: relative;

  & > h5 {
    color: ${(props) => props.theme['purple-500']};
    font-size: 1rem;
  }

  & > div {
    display: flex;
    width: 100%;

    :nth-child(2) {
      justify-content: space-between;
      font-size: 0.8rem;

      strong:first-child {
        color: ${(props) => props.theme['green-400']};
      }

      strong:last-child {
        color: ${(props) => props.theme['red-500']};
      }
    }
  }
`

interface PercentageBarProps {
  percentageA: string
  percentageB: string
}

export const PercentageBar = styled.div<PercentageBarProps>`
  width: 100%;
  display: flex;
  color: ${(props) => props.theme['blue-1000']};
  font-weight: 600;

  transition: 0.5s;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2rem;

    font-size: 0.7rem;

    :first-child {
      width: ${(props) => props.percentageA + '%'};
      background: ${(props) => props.theme['green-400']};
      display: ${(props) => (props.percentageA === '0.00' ? 'none' : 'flex')};
      border-radius: ${(props) =>
        props.percentageA === '100.00' ? '8px 8px 8px 8px' : '8px 0 0 8px'};
    }

    :last-child {
      width: ${(props) => props.percentageB + '%'};
      background: ${(props) => props.theme['red-500']};
      display: ${(props) => (props.percentageB === '0.00' ? 'none' : 'flex')};
      border-radius: ${(props) =>
        props.percentageB === '100.00' ? '8px 8px 8px 8px' : '0 8px 8px 0'};
    }

    :hover {
      > div {
        display: flex;
      }
    }
  }
`

export const FloatingDescription = styled.div`
  display: none;
  background: ${(props) => props.theme['gray-300']};
  color: ${(props) => props.theme['blue-1000']};
  position: absolute;
  top: 0;
  padding: 0.5rem;
  border-radius: 8px;
  white-space: nowrap;
`
