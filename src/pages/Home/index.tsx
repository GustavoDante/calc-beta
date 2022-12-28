import { Container } from './styles'
import { useContext, useEffect } from 'react'

import { FormRegisterBet } from './components/CardRegisterBet'
import { TableHistoryBets } from './components/TableHistoryBets'
import { BetsContext } from '../../contexts/BetsContext'

export interface Bet {
  id: string
  value: number
  multiplier: number
  returnBet: number
  profitBet: number
  win: boolean | null
  date: Date
}

export function Home() {
  const { bets } = useContext(BetsContext)

  useEffect(() => {
    console.log(bets)
  }, [bets])
  return (
    <Container>
      <FormRegisterBet />

      <TableHistoryBets />
    </Container>
  )
}
