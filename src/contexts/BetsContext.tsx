import { ReactNode, createContext, useState } from 'react'
import { Bet } from '../pages/Home'

interface BetsContextData {
  bets: Bet[]
  formatCashField: (value: string) => string
  handleSetBets: (bets: Bet[]) => void
}

export const BetsContext = createContext({} as BetsContextData)

interface BetsProviderProps {
  children: ReactNode
}

export function BetsProvider({ children }: BetsProviderProps) {
  const [bets, setBets] = useState<Bet[]>([])

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

  return (
    <BetsContext.Provider
      value={{
        bets,
        formatCashField,
        handleSetBets,
      }}
    >
      {children}
    </BetsContext.Provider>
  )
}
