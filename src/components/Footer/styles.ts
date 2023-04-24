import styled from 'styled-components'

export const FooterContainer = styled.footer`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  & div > p > a {
    color: ${(props) => props.theme['gray-100']};
    text-decoration: none;
    font-size: 1.2rem;

    & > img {
      display: block;
      margin: 0 auto;
      width: 7rem;
    }
  }
`
