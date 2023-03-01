import styled from 'styled-components'

export const HeaderContainer = styled.header`
  margin-bottom: 1rem;
  display: flex;
  align-items: start;
  justify-content: space-between;
  margin-bottom: 5rem;

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

  & > div > img {
    filter: brightness(2);
    width: 3rem;
    position: absolute;
  }
`
