import { ReactNode, createContext, useEffect, useState } from 'react'

export interface Bet {
  id: string
  value: number
  multiplier: number
  returnBet: number
  profitBet: number
  win: boolean | null
  winWin: boolean
  whoWin: 1 | 2 | null
  valueB: number
  multiplierB: number
  returnBetB: number
  profitBetB: number
  date: Date
}
interface BetsContextData {
  bets: Bet[]
  formatCashField: (value: string) => string
  handleRegisterBet: (bet: Bet) => void
  FinanceResume: number
  valueTotal: number
  handleFinalizeBet: (id: string, win: boolean, whoWin: 1 | 2 | null) => void
  handleDeleteBet: (id: string) => void
}

export const BetsContext = createContext({} as BetsContextData)

interface BetsProviderProps {
  children: ReactNode
}

export function BetsProvider({ children }: BetsProviderProps) {
  const [bets, setBets] = useState<Bet[]>(
    JSON.parse(localStorage.getItem('bets') ?? '[]'),
  )
  const [FinanceResume, setFinanceResume] = useState(0)
  const [valueTotal, setValueTotal] = useState(0)

  function formatCashField(value: string) {
    let retorno = value

    retorno = retorno.replace(/\D/g, '')
    retorno = retorno.replace(/(\d{1})(\d{2})$/, '$1,$2')
    retorno = retorno.replace(/(?=(\d{3})+(\D))\B/g, '.')

    return retorno
  }

  function handleRegisterBet(bet: Bet) {
    setBets([...bets, bet])
  }

  function handleFinalizeBet(id: string, win: boolean, whoWin: 1 | 2 | null) {
    setBets((bets) => {
      return bets.map((bet) => {
        if (bet.id === id) {
          bet.win = win
          bet.whoWin = whoWin
        }
        return bet
      })
    })
  }

  function handleDeleteBet(id: string) {
    setBets((bets) => bets.filter((bet) => bet.id !== id))
  }

  useEffect(() => {
    function calcFinanceResume() {
      const valueOfWins = bets
        .filter((bet) => bet.win === true)
        .filter((bet) => bet.winWin === false)
        .reduce((total, bet) => total + bet.profitBet, 0)

      const valueOfWinsWins = bets
        .filter((bet) => bet.win === true)
        .filter((bet) => bet.winWin === true)
        .reduce(
          (total, bet) =>
            total + (bet.whoWin === 1 ? bet.profitBet : bet.profitBetB),
          0,
        )

      const valueOfLosses = bets
        .filter((bet) => bet.win === false)
        .reduce((total, value) => total + value.value, 0)

      setFinanceResume(valueOfWins + valueOfWinsWins - valueOfLosses)
    }

    function calcValueTotal() {
      const valueTotal = bets.reduce((total, value) => total + value.value, 0)

      setValueTotal(valueTotal)
    }

    if (bets.length > 0) {
      localStorage.setItem('bets', JSON.stringify(bets))
    }

    calcFinanceResume()
    calcValueTotal()
  }, [bets])

  return (
    <BetsContext.Provider
      value={{
        bets,
        formatCashField,
        handleRegisterBet,
        FinanceResume,
        valueTotal,
        handleFinalizeBet,
        handleDeleteBet,
      }}
    >
      {children}
    </BetsContext.Provider>
  )
}
