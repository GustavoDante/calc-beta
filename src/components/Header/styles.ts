import styled from 'styled-components'

export const HeaderContainer = styled.header`
  margin-bottom: 3rem;

  & > div:first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;

    nav {
      display: flex;
      gap: 0.5rem;

      a {
        width: 3rem;
        height: 3rem;

        display: flex;
        justify-content: center;
        align-items: center;

        color: ${(props) => props.theme['gray-100']};

        border-top: 3px solid transparent;
        border-bottom: 3px solid transparent;

        &:hover {
          border-bottom: 3px solid ${(props) => props.theme['purple-500']};
        }

        &.active {
          color: ${(props) => props.theme['purple-500']};
        }
      }
    }

    & > img {
      filter: brightness(2);
      width: 3rem;
    }
  }
`

export const BackgroundHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;

  & > img {
    width: 100%;
    border-radius: 0.5rem;
  }

  & > h1 {
    position: absolute;
    color: ${(props) => props.theme['gray-100']};
    line-height: 2;
    margin-left: 5rem;
    font-size: 2.5rem;
  }
`
