import styled from 'styled-components'

export const LayoutContainer = styled.div`
  position: relative;
  max-width: 80rem;
  min-height: calc(100vh - 10rem);
  margin: 5rem auto;
  padding: 2.5rem;

  background: ${(props) => props.theme['gray-800']};

  border-radius: 8px;

  display: flex;
  flex-direction: column;

  & > img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    height: 39.4rem;
  }

  & > div {
    z-index: 0;
  }

  & > header {
    z-index: 0;
  }
`
