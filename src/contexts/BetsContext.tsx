import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore' //eslint-disable-line
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { db } from '../services/firebaseConfig'
import { AuthGoogleContext } from './AuthGoogleContext'
import { format } from 'date-fns'
import { Bet, league, line } from '../@types/types'

interface filter {
  date: string
  league: league
  line: line
}
interface BetsContextData {
  bets: Bet[]
  formatCashField: (value: string) => string
  handleRegisterBet: (bet: Bet) => void
  FinanceResume: number
  valueTotal: number
  filter: filter
  handleFinalizeBet: (id: string, win: boolean, whoWin: 1 | 2 | null) => void
  handleDeleteBet: (id: string) => void
  resetBets: () => void
  handleSetFilter: (filter: filter) => void
}

export const BetsContext = createContext({} as BetsContextData)

interface BetsProviderProps {
  children: ReactNode
}

export function BetsProvider({ children }: BetsProviderProps) {
  const { user } = useContext(AuthGoogleContext)
  const [bets, setBets] = useState<Bet[]>([])
  const [FinanceResume, setFinanceResume] = useState(0)
  const [valueTotal, setValueTotal] = useState(0)

  const currentUser = user?.email || ''

  const [filter, setFilter] = useState<filter>({
    date: '',
    league: { label: '', value: '' },
    line: { label: '', value: '' },
  })

  const colletionRef = currentUser
    ? collection(db, 'users', currentUser, 'bets')
    : null

  function formatCashField(value: string) {
    let retorno = value

    retorno = retorno.replace(/\D/g, '')
    retorno = retorno.replace(/(\d{1})(\d{2})$/, '$1,$2')
    retorno = retorno.replace(/(?=(\d{3})+(\D))\B/g, '.')

    return retorno
  }

  function handleSetFilter(filter: filter) {
    setFilter(filter)
  }

  async function handleRegisterBet(bet: Bet) {
    const newBetRef = await addDoc(colletionRef!, bet)

    setBets((bets) => {
      return [...bets, { ...bet, id: newBetRef.id }]
    })
  }

  async function resetBets() {
    try {
      const docSnap = await getDocs(colletionRef!)
      docSnap.docs.map(async (currentDoc) => {
        const docRef = doc(db, 'users', currentUser, 'bets', currentDoc.id)
        await deleteDoc(docRef)
      })
      setBets([])
    } catch (error) {
      console.log(error)
    }
  }

  async function handleFinalizeBet(
    id: string,
    win: boolean,
    whoWin: 1 | 2 | null,
  ) {
    const docRef = doc(db, 'users', currentUser, 'bets', id)

    await updateDoc(docRef, {
      win,
      whoWin,
    })

    setBets((bets) => {
      return bets.map((bet) => {
        if (bet.id === id) {
          bet.win = win
          bet.whoWin = whoWin
        }
        return bet
      })
    })

    getData()
  }

  async function handleDeleteBet(id: string) {
    const docRef = doc(db, 'users', currentUser, 'bets', id)
    await deleteDoc(docRef)
    setBets((bets) => bets.filter((bet) => bet.id !== id))
  }

  async function getData() {
    try {
      if (currentUser) {
        const queryWithPagination = query(
          colletionRef!,
          orderBy('date', 'desc'),
        )

        const dataWithPagination = await getDocs(queryWithPagination)

        const data = dataWithPagination.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          }
        })
        setBets(data as Bet[])
      }
    } catch (error) {
      console.log(error)
    }
  }

  function calcFinanceResume() {
    const valueOfWins = bets
      .filter((bet) => bet.win === true)
      .filter((bet) => bet.winWin === false)
      .filter((bet) =>
        filter.date
          ? format(new Date(bet.date), 'yyyy-MM-dd') === filter.date
          : bet,
      )
      .filter((bet) =>
        filter.league.label ? bet.league?.value === filter.league.value : bet,
      )
      .filter((bet) =>
        filter.line.value ? bet.line?.value === filter.line.value : bet,
      )
      .reduce((total, bet) => total + bet.profitBet, 0)

    const valueOfWinsWins = bets
      .filter((bet) => bet.win === true)
      .filter((bet) => bet.winWin === true)
      .filter((bet) =>
        filter.date
          ? format(new Date(bet.date), 'yyyy-MM-dd') === filter.date
          : bet,
      )
      .filter((bet) =>
        filter.league.label ? bet.league?.value === filter.league.value : bet,
      )
      .filter((bet) =>
        filter.line.value ? bet.line?.value === filter.line.value : bet,
      )
      .reduce(
        (total, bet) =>
          total + (bet.whoWin === 1 ? bet.profitBet : bet.profitBetB),
        0,
      )

    const valueOfLosses = bets
      .filter((bet) => bet.win === false)
      .filter((bet) =>
        filter.date
          ? format(new Date(bet.date), 'yyyy-MM-dd') === filter.date
          : bet,
      )
      .filter((bet) =>
        filter.league.label ? bet.league?.value === filter.league.value : bet,
      )
      .filter((bet) =>
        filter.line.value ? bet.line?.value === filter.line.value : bet,
      )
      .reduce((total, value) => total + value.value, 0)

    setFinanceResume(valueOfWins + valueOfWinsWins - valueOfLosses)
  }

  function calcValueTotal() {
    const valueTotalOfSimpleBet = bets
      .filter((bet) =>
        filter.date
          ? format(new Date(bet.date), 'yyyy-MM-dd') === filter.date
          : bet,
      )
      .filter((bet) =>
        filter.league.label ? bet.league?.value === filter.league.value : bet,
      )
      .filter((bet) =>
        filter.line.value ? bet.line?.value === filter.line.value : bet,
      )
      .reduce((total, value) => total + value.value, 0)

    const valueTotalOfWinsWins = bets
      .filter((bet) =>
        filter.date
          ? format(new Date(bet.date), 'yyyy-MM-dd') === filter.date
          : bet,
      )
      .filter((bet) =>
        filter.league.label ? bet.league?.value === filter.league.value : bet,
      )
      .filter((bet) =>
        filter.line.value ? bet.line?.value === filter.line.value : bet,
      )
      .filter((bet) => bet.winWin === true)
      .reduce((total, bet) => total + bet.valueB, 0)

    setValueTotal(valueTotalOfSimpleBet + valueTotalOfWinsWins)
    console.log(filter)
  }

  useEffect(() => {
    getData()
  }, [currentUser])

  useEffect(() => {
    calcFinanceResume()
    calcValueTotal()
  }, [bets, filter])

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
        resetBets,
        filter,
        handleSetFilter,
      }}
    >
      {children}
    </BetsContext.Provider>
  )
}
