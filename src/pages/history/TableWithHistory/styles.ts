import styled from 'styled-components'

const STATUS_COLORS = {
  green: 'green-400',
  red: 'red-500',
} as const

interface StatusProps {
  status: keyof typeof STATUS_COLORS
}

export const SpanWithStatus = styled.span<StatusProps>`
  color: ${(props) => props.theme[STATUS_COLORS[props.status]]};
  font-weight: ${(props) => (props.status === 'green' ? 'bold' : 'normal')};
`

interface TrashContainerProps {
  isWinWin: boolean
}

export const TrashContainer = styled.div<TrashContainerProps>`
  position: absolute;
  top: ${(props) => (props.isWinWin ? '1.15rem' : '0.4rem')};
  right: 0.7rem;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    width: 1.5rem;
    height: 2.5rem;
    border-radius: 5px;
    background: transparent;
    color: ${(props) => props.theme.white};
  }
`

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  background: ${(props) => props.theme['gray-700']};
  border-radius: 8px;
`
interface PaginationButtonProps {
  isCurrentPage: boolean
}

export const PaginationButton = styled.button<PaginationButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.isCurrentPage ? props.theme['gray-600'] : props.theme['gray-700']};
  border: none;
  width: 1.5rem;
  height: 2.5rem;
  border-radius: 5px;
  padding: 1rem;
  color: ${(props) => props.theme.white};

  &:not(:disabled):hover {
    background: ${(props) => props.theme['gray-600']};
  }

  &:disabled {
    cursor: not-allowed;
  }
`
