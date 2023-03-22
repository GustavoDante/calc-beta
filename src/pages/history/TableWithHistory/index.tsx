import { useContext, useEffect, useState } from 'react'
import { Bet, BetsContext } from '../../../contexts/BetsContext'
import { ContainerTd, TableContainer } from '../../../styles/global'
import { format } from 'date-fns'
import {
  PaginationButton,
  PaginationContainer,
  SpanWithStatus,
  TrashContainer,
} from './styles'
import ptBR from 'date-fns/locale/pt-BR'
import { Trash } from 'phosphor-react'
import { ConfirmationFinalizeModal } from '../../../components/ConfirmationFinalizeModal'

export function TableWithHistory() {
  const { bets, formatCashField, handleDeleteBet, filterDate } =
    useContext(BetsContext)
  const [filteredBets, setFilteredBets] = useState<Bet[]>(
    bets
      .filter((bet) => bet.win !== null)
      .filter((bet) =>
        filterDate
          ? format(new Date(bet.date), 'yyyy-MM-dd') === filterDate
          : bet,
      ),
  )
  const [selectBet, setSelectBet] = useState<Bet>({} as Bet)
  const [showModal, setShowModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentItens, setCurrentItens] = useState<Bet[]>([])

  const itensPerPage = 10

  const [numberOfPages, setNumberOfPages] = useState(
    Math.ceil(filteredBets.length / itensPerPage),
  )

  function deleteBet(id: string) {
    handleDeleteBet(id)
    setShowModal(false)
  }

  function handleDeleteBetWithModal(bet: Bet) {
    setSelectBet(bet)
    setShowModal(true)
  }

  useEffect(() => {
    const firstItens = currentPage * itensPerPage - itensPerPage
    const lastItens = firstItens + itensPerPage
    setCurrentItens(filteredBets.slice(firstItens, lastItens))
  }, [currentPage, filteredBets])

  useEffect(() => {
    setNumberOfPages(Math.ceil(filteredBets.length / itensPerPage))
  }, [filteredBets])

  useEffect(() => {
    setFilteredBets(
      bets
        .filter((bet) => bet.win !== null)
        .filter((bet) =>
          filterDate
            ? format(new Date(bet.date), 'yyyy-MM-dd') === filterDate
            : bet,
        ),
    )
  }, [bets, filterDate])

  return (
    <TableContainer>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Valor apostado</th>
            <th>ODD</th>
            <th>Retorno</th>
            <th>Saldo</th>
            <th>Data</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItens.map((bet) => {
            if (bet.winWin === false) {
              return (
                <tr key={bet.id}>
                  <td></td>
                  <td>R$ {formatCashField(bet.value.toFixed(2))}</td>
                  <td>{bet.multiplier.toFixed(2)} X</td>
                  <td>R$ {formatCashField(bet.returnBet.toFixed(2))}</td>
                  {bet.win ? (
                    <td>
                      <SpanWithStatus status={'green'}>
                        + R$ {formatCashField(bet.profitBet.toFixed(2))}
                      </SpanWithStatus>
                    </td>
                  ) : (
                    <td>
                      <SpanWithStatus status={'red'}>
                        - R$ {formatCashField(bet.value.toFixed(2))}
                      </SpanWithStatus>
                    </td>
                  )}
                  <td>
                    {format(new Date(bet.date), "d 'de' LLLL 'às' HH:mm'h'", {
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    <TrashContainer isWinWin={false}>
                      <button
                        type="button"
                        onClick={() => handleDeleteBetWithModal(bet)}
                        title="Delete bet"
                      >
                        <Trash size={18} />
                      </button>
                    </TrashContainer>
                  </td>
                </tr>
              )
            } else {
              return (
                <tr key={bet.id}>
                  <td>
                    <ContainerTd>
                      <SpanWithStatus
                        status={bet.whoWin === 1 ? 'green' : 'red'}
                      >
                        A
                      </SpanWithStatus>
                      <SpanWithStatus
                        status={bet.whoWin === 2 ? 'green' : 'red'}
                      >
                        B
                      </SpanWithStatus>
                    </ContainerTd>
                  </td>
                  <td>
                    <ContainerTd>
                      <SpanWithStatus
                        status={bet.whoWin === 1 ? 'green' : 'red'}
                      >
                        R$ {formatCashField(bet.value.toFixed(2))}
                      </SpanWithStatus>
                      <SpanWithStatus
                        status={bet.whoWin === 2 ? 'green' : 'red'}
                      >
                        R$ {formatCashField(bet.valueB.toFixed(2))}
                      </SpanWithStatus>
                    </ContainerTd>
                  </td>
                  <td>
                    <ContainerTd>
                      <SpanWithStatus
                        status={bet.whoWin === 1 ? 'green' : 'red'}
                      >
                        {bet.multiplier.toFixed(2)} X
                      </SpanWithStatus>
                      <SpanWithStatus
                        status={bet.whoWin === 2 ? 'green' : 'red'}
                      >
                        {bet.multiplierB.toFixed(2)} X
                      </SpanWithStatus>
                    </ContainerTd>
                  </td>
                  <td>
                    <ContainerTd>
                      <SpanWithStatus
                        status={bet.whoWin === 1 ? 'green' : 'red'}
                      >
                        R$ {formatCashField(bet.returnBet.toFixed(2))}
                      </SpanWithStatus>
                      <SpanWithStatus
                        status={bet.whoWin === 2 ? 'green' : 'red'}
                      >
                        R$ {formatCashField(bet.returnBetB.toFixed(2))}
                      </SpanWithStatus>
                    </ContainerTd>
                  </td>
                  <td>
                    <ContainerTd>
                      <SpanWithStatus
                        status={bet.whoWin === 1 ? 'green' : 'red'}
                      >
                        R$ {formatCashField(bet.profitBet.toFixed(2))}
                      </SpanWithStatus>
                      <SpanWithStatus
                        status={bet.whoWin === 2 ? 'green' : 'red'}
                      >
                        R$ {formatCashField(bet.profitBetB.toFixed(2))}
                      </SpanWithStatus>
                    </ContainerTd>
                  </td>
                  <td>
                    {format(new Date(bet.date), "d 'de' LLLL 'às' HH:mm'h'", {
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    <TrashContainer isWinWin={true}>
                      <button
                        type="button"
                        onClick={() => handleDeleteBetWithModal(bet)}
                        title="Delete bet"
                      >
                        <Trash size={18} />
                      </button>
                    </TrashContainer>
                  </td>
                </tr>
              )
            }
          })}
        </tbody>
        <ConfirmationFinalizeModal
          isOpen={showModal}
          handleFinalizeBet={deleteBet}
          onRequestClose={() => setShowModal(false)}
          bet={selectBet}
          finalizeBetWith={'delete'}
        />
      </table>
      {filteredBets.length > 0 && (
        <PaginationContainer>
          <PaginationButton
            type="button"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
            }
            isCurrentPage={false}
          >
            {'<'}
          </PaginationButton>

          {(() => {
            const pages = []
            for (let i = 1; i <= numberOfPages; i++) {
              pages.push(
                <PaginationButton
                  key={i}
                  type="button"
                  onClick={() => setCurrentPage(i)}
                  isCurrentPage={i === currentPage}
                >
                  {i}
                </PaginationButton>,
              )
            }
            return pages
          })()}

          <PaginationButton
            type="button"
            disabled={currentPage === numberOfPages}
            onClick={() =>
              setCurrentPage(
                currentPage === numberOfPages ? currentPage + 1 : numberOfPages,
              )
            }
            isCurrentPage={false}
          >
            {'>'}
          </PaginationButton>
        </PaginationContainer>
      )}
    </TableContainer>
  )
}
