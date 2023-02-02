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
