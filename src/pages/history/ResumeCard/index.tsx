import { useContext } from 'react'
import { Container, Card, CardValuesContainer } from './styles'
import { BetsContext } from '../../../contexts/BetsContext'
import { TitleCard } from '../../../styles/global'

export function ResumeCard() {
  const { bets, formatCashField, FinanceResume, valueTotal } =
    useContext(BetsContext)

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
          <h5>Total de WinWins</h5>
          <div>
            <span>{bets.filter((bet) => bet.winWin === true).length}</span>
          </div>
        </CardValuesContainer>
        <CardValuesContainer>
          <h5>Total de Wins</h5>
          <div>
            <span>
              {
                bets.filter((bet) => bet.win === true && bet.winWin === false)
                  .length
              }
            </span>
          </div>
        </CardValuesContainer>
        <CardValuesContainer>
          <h5>Total de Loses</h5>
          <div>
            <span>{bets.filter((bet) => bet.win === false).length}</span>
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
      </Card>
    </Container>
  )
}
