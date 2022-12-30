import styled from 'styled-components'

const STATUS_COLORS = {
  green: 'green-700',
  red: 'red-700',
} as const

interface StatusProps {
  status: keyof typeof STATUS_COLORS
}

export const Balance = styled.td<StatusProps>`
  color: ${(props) => props.theme[STATUS_COLORS[props.status]]};
`

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${(props) => props.theme[STATUS_COLORS[props.status]]};
  }
`
