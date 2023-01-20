import styled from 'styled-components'

export const LayoutContainer = styled.div`
  position: relative;
  max-width: 80rem;
  min-height: calc(100vh - 10rem);
  margin: 5rem auto;
  padding: 2.5rem;
  overflow-x: hidden;

  background: ${(props) => props.theme['gray-800']};

  border-radius: 8px;

  display: flex;
  flex-direction: column;

  & > div {
    z-index: 0;
  }

  & > header {
    z-index: 0;
  }
`
