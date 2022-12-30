import { ReactNode, createContext, useEffect, useState } from 'react'

export interface Bet {
  id: string
  value: number
  multiplier: number
  returnBet: number
  profitBet: number
  win: boolean | null
  date: Date
}
interface BetsContextData {
  bets: Bet[]
  formatCashField: (value: string) => string
  handleSetBets: (bets: Bet[]) => void
  FinanceResume: number
  valueTotal: number
}

export const BetsContext = createContext({} as BetsContextData)

interface BetsProviderProps {
  children: ReactNode
}

export function BetsProvider({ children }: BetsProviderProps) {
  const [bets, setBets] = useState<Bet[]>([])
  const [FinanceResume, setFinanceResume] = useState(0)
  const [valueTotal, setValueTotal] = useState(0)

  function formatCashField(value: string) {
    let retorno = value
    retorno = retorno.replace(/\D/g, '')
    retorno = retorno.replace(/(\d{1})(\d{2})$/, '$1,$2')
    retorno = retorno.replace(/(?=(\d{3})+(\D))\B/g, '.')
    return retorno
  }

  function handleSetBets(bets: Bet[]) {
    setBets(bets)
  }

  useEffect(() => {
    function calcFinanceResume() {
      const valueOfWins = bets
        .filter((bet) => bet.win === true)
        .reduce(
          (total, bet) => total + (bet.value * bet.multiplier - bet.value),
          0,
        )

      const valueOfLosses = bets
        .filter((bet) => bet.win === false)
        .reduce((total, value) => total + value.value, 0)

      setFinanceResume(valueOfWins - valueOfLosses)
    }

    function calcValueTotal() {
      const valueTotal = bets.reduce((total, value) => total + value.value, 0)

      setValueTotal(valueTotal)
    }

    calcFinanceResume()
    calcValueTotal()
    console.log(bets)
  }, [bets])

  return (
    <BetsContext.Provider
      value={{
        bets,
        formatCashField,
        handleSetBets,
        FinanceResume,
        valueTotal,
      }}
    >
      {children}
    </BetsContext.Provider>
  )
}
