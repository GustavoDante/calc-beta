export interface league {
  label: string
  value: string
}

export interface line {
  label: string
  value: string
}

export interface Bet {
  id?: string
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
  league: league
  line: line
  date: string
}
