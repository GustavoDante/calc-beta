import { useContext } from 'react'
import {
  Container,
  Card,
  CardValuesContainer,
  PercentageBar,
  PercentageBarContainer,
  FloatingDescription,
} from './styles'
import { BetsContext } from '../../../contexts/BetsContext'
import { TitleCard } from '../../../styles/global'
import { format } from 'date-fns'

export function ResumeCard() {
  const { bets, formatCashField, FinanceResume, valueTotal, filterDate } =
    useContext(BetsContext)

  const totalBets = bets
    .filter((bet) => bet.win !== null)
    .filter((bet) =>
      filterDate
        ? format(new Date(bet.date), 'yyyy-MM-dd') === filterDate
        : bet,
    ).length

  const totalWins = bets
    .filter((bet) => bet.win !== null)
    .filter((bet) =>
      filterDate
        ? format(new Date(bet.date), 'yyyy-MM-dd') === filterDate
        : bet,
    )
    .filter((bet) => bet.win).length

  const totalPeddingBets = bets
    .filter((bet) => bet.win === null)
    .filter((bet) =>
      filterDate
        ? format(new Date(bet.date), 'yyyy-MM-dd') === filterDate
        : bet,
    ).length

  const totalLoses = totalBets - totalWins

  const percentageA = (totalWins / (totalBets !== 0 ? totalBets : 1)) * 100

  const percentageB = totalWins > 0 ? 100 - percentageA : 0

  //   console.log(percentageA, percentageB, totalWins, totalBets, totalBets ?? 1)
  return (
    <Container>
      <Card>
        <TitleCard>
          <span>Resumo</span>
        </TitleCard>

        <CardValuesContainer>
          <h5>Total valor apostado</h5>
          <div>
            <span>R$ {formatCashField(valueTotal.toFixed(2))}</span>
          </div>
        </CardValuesContainer>
        <CardValuesContainer>
          <h5>Total de apostas pendentes</h5>
          <div>
            <span>{totalPeddingBets}</span>
          </div>
        </CardValuesContainer>
        <CardValuesContainer>
          <h5>Total de apostas finalizadas</h5>
          <div>
            <span>{totalBets}</span>
          </div>
        </CardValuesContainer>
        <CardValuesContainer>
          <h5>Total de WinWins/Equilibrio</h5>
          <div>
            <span>
              {
                bets
                  .filter((bet) => bet.winWin === true)
                  .filter((bet) => bet.win !== null)
                  .filter((bet) =>
                    filterDate
                      ? format(new Date(bet.date), 'yyyy-MM-dd') === filterDate
                      : bet,
                  ).length
              }
            </span>
          </div>
        </CardValuesContainer>

        <CardValuesContainer>
          <h5>Saldo geral</h5>
          <div>
            <span>
              {FinanceResume >= 0
                ? `+ R$ ${formatCashField(FinanceResume.toFixed(2))}`
                : `- R$ ${formatCashField(FinanceResume.toFixed(2))}`}
            </span>
          </div>
        </CardValuesContainer>
        <PercentageBarContainer>
          <h5>Taxa de vitórias e derrotas</h5>
          <div>
            <strong>{percentageA.toFixed(2)} %</strong>
            <strong>{percentageB.toFixed(2)} %</strong>
          </div>
          <div>
            <PercentageBar
              percentageA={percentageA.toFixed(2)}
              percentageB={percentageB.toFixed(2)}
            >
              <div>
                <FloatingDescription>
                  <span>
                    {percentageA.toFixed(2)} % ({totalWins})
                  </span>
                </FloatingDescription>
              </div>
              <div>
                <FloatingDescription>
                  <span>
                    {percentageB.toFixed(2)} % ({totalLoses})
                  </span>
                </FloatingDescription>
              </div>
            </PercentageBar>
          </div>
        </PercentageBarContainer>
      </Card>
    </Container>
  )
}
