import { ChangeEvent, useContext, useEffect, useState } from 'react'
import {
  FormRegisterBetContainer,
  InputFormContainer,
  ReturnValueContainer,
  Separator,
  SeparatorBigger,
} from '../../styles'
import * as zod from 'zod'
import {
  ContainerCard,
  TeamTitle,
  TitleCard,
  TitlesContainer,
  WinWinContent,
  WinWinValueSugestionContainer,
} from './styles'
import { BetsContext } from '../../../../contexts/BetsContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Bet, league, line } from '../../../../@types/types'
import { Dropdown } from '../../../../components/Dropdown'

const registerWinWinSchema = zod.object({
  teamAValue: zod.string().min(1, 'Valor mínimo de 1 real, por favor'),
  teamAMultiplier: zod.string().min(1, 'Valor mínimo de 1 real, por favor'),
  teamBMultiplier: zod.string().min(1, 'Valor mínimo de 1 real, por favor'),
})

export type RegisterWinWinData = zod.infer<typeof registerWinWinSchema>

interface FormRegisterWinWinProps {
  valueInputChange: (input: String) => string
  multiplierInputChange: (input: String) => string
  functionType: 'balance' | 'win-win'
}

export function FormRegisterWinWin({
  valueInputChange,
  multiplierInputChange,
  functionType,
}: FormRegisterWinWinProps) {
  const { handleRegisterBet, formatCashField } = useContext(BetsContext)

  const [teamAMultiplier, setTeamAMultiplier] = useState('')
  const [teamAValue, setTeamAValue] = useState('')
  const [teamAReturnBet, setTeamAReturnBet] = useState<number>(0)
  const [teamAProfitBet, setTeamAProfitBet] = useState<number | null>(null)

  const [teamBMultiplier, setTeamBMultiplier] = useState('')
  const [teamBValue, setTeamBValue] = useState('')
  const [teamBReturnBet, setTeamBReturnBet] = useState<number>(0)
  const [teamBProfitBet, setTeamBProfitBet] = useState<number | null>(null)

  const [league, setLeague] = useState<league>({ label: '', value: '' })
  const [line, setLine] = useState<line>({ label: '', value: '' })

  const newRegisterWinWinForm = useForm<RegisterWinWinData>({
    resolver: zodResolver(registerWinWinSchema),
  })

  const { handleSubmit, register } = newRegisterWinWinForm

  const handleLeagueChange = (selectedOption: any) => {
    setLeague(selectedOption)
  }

  const handleLineChange = (selectedOption: any) => {
    setLine(selectedOption)
  }

  function resetInputs() {
    setTeamAValue('')
    setTeamAMultiplier('')
    setTeamBMultiplier('')
    setTeamBValue('')
    setTeamAReturnBet(0)
    setTeamAProfitBet(-1)
    setTeamBReturnBet(0)
    setTeamBProfitBet(-1)
  }

  function handleFormRegisterWinWin(data: RegisterWinWinData) {
    const date = new Date().toUTCString()

    const bet: Bet = {
      value: parseFloat(teamAValue.replace(/[.]/g, '').replace(/[,]/g, '.')),
      multiplier: parseFloat(teamAMultiplier),
      returnBet: teamAReturnBet,
      profitBet: teamAProfitBet || 0,
      league,
      line,
      win: null,
      winWin: true,
      whoWin: null,
      valueB: parseFloat(teamBValue.replace(/[.]/g, '').replace(/[,]/g, '.')),
      multiplierB: parseFloat(teamBMultiplier),
      returnBetB: teamBReturnBet,
      profitBetB: teamBProfitBet || 0,
      date,
    }

    handleRegisterBet(bet)
    resetInputs()
  }

  function recalculateValueB(teamValue: string) {
    if (teamAValue !== '' && teamAMultiplier !== '' && teamBMultiplier !== '') {
      const valueA = parseFloat(
        teamAValue.replace(/[.]/g, '').replace(/[,]/g, '.'),
      )

      const valueB = parseFloat(
        valueInputChange(teamValue).replace(/[.]/g, '').replace(/[,]/g, '.'),
      )

      const multiplierA = parseFloat(teamAMultiplier)
      const multiplierB = parseFloat(teamBMultiplier)

      const returnBetA = valueA * multiplierA
      const profitBetA = returnBetA - valueA - valueB

      const returnBetB = valueB * multiplierB
      const profitBetB = returnBetB - valueB - valueA

      setTeamBValue(() => {
        return valueInputChange(valueB.toFixed(2))
      })
      setTeamAReturnBet(returnBetA)
      setTeamAProfitBet(profitBetA)

      setTeamBReturnBet(returnBetB)
      setTeamBProfitBet(profitBetB)
    }
  }

  useEffect(() => {
    if (teamAValue !== '' && teamAMultiplier !== '' && teamBMultiplier !== '') {
      if (
        parseFloat(teamAValue.replace(/[.]/g, '').replace(/[,]/g, '.')) <=
          1.0 ||
        parseFloat(teamAMultiplier) <= 1.0 ||
        parseFloat(teamBMultiplier) <= 1.0
      ) {
        setTeamAReturnBet(0)
        setTeamAProfitBet(-1)

        setTeamBReturnBet(0)
        setTeamBProfitBet(-1)
        return
      }
      const valueA = parseFloat(
        teamAValue.replace(/[.]/g, '').replace(/[,]/g, '.'),
      )
      const multiplierA = parseFloat(teamAMultiplier)
      const multiplierB = parseFloat(teamBMultiplier)

      if (functionType === 'balance') {
        const valueB = valueA / (multiplierB - 1)

        const returnBetA = valueA * multiplierA
        const profitBetA = returnBetA - valueA - valueB

        const returnBetB = valueB * multiplierB
        const profitBetB = returnBetB - valueB - valueA

        setTeamBValue(formatCashField(valueB.toFixed(2)))

        setTeamAReturnBet(returnBetA)
        setTeamAProfitBet(profitBetA)

        setTeamBReturnBet(returnBetB)
        setTeamBProfitBet(profitBetB)
      } else {
        const valueB = (valueA * multiplierA) / multiplierB

        const returnBetA = valueA * multiplierA
        const profitBetA = returnBetA - valueA - valueB

        const returnBetB = valueB * multiplierB
        const profitBetB = returnBetB - valueB - valueA

        setTeamBValue(formatCashField(valueB.toFixed(2)))

        setTeamAReturnBet(returnBetA)
        setTeamAProfitBet(profitBetA)

        setTeamBReturnBet(returnBetB)
        setTeamBProfitBet(profitBetB)
      }
    }
  }, [teamAValue, teamAMultiplier, teamBMultiplier, formatCashField])

  const isResumeTeamAPositive: boolean = teamAProfitBet
    ? teamAProfitBet >= 0
    : true

  const isResumeTeamBPositive: boolean = teamBProfitBet
    ? teamBProfitBet >= 0
    : true

  const isButtonSubmitEnable: boolean =
    teamAProfitBet && teamBProfitBet
      ? teamAProfitBet >= 0 || teamBProfitBet >= 0
      : false

  return (
    <FormRegisterBetContainer onSubmit={handleSubmit(handleFormRegisterWinWin)}>
      <ContainerCard>
        <TitlesContainer>
          <TeamTitle>
            <h3>Time A</h3>
          </TeamTitle>
          <TitleCard>
            <span>{functionType === 'win-win' ? 'Win/Win' : 'Equilibrar'}</span>
          </TitleCard>

          <TeamTitle>
            <h3> Time B</h3>
          </TeamTitle>
        </TitlesContainer>

        <WinWinContent>
          <div>
            <InputFormContainer>
              <input
                {...register('teamAMultiplier')}
                type="text"
                placeholder="multiplicador(ODD)"
                autoComplete="off"
                value={teamAMultiplier}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setTeamAMultiplier(multiplierInputChange(event.target.value))
                }}
              />
              <span>X</span>
            </InputFormContainer>
            <InputFormContainer>
              <input
                {...register('teamAValue')}
                type="text"
                placeholder="Valor"
                autoComplete="off"
                value={teamAValue}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setTeamAValue(valueInputChange(event.target.value))
                }}
              />
              <span>R$</span>
            </InputFormContainer>

            <ReturnValueContainer
              isvalueDefined={!!teamAReturnBet}
              isValuePositive={true}
            >
              <span>
                {teamAReturnBet
                  ? formatCashField(teamAReturnBet.toFixed(2))
                  : 'Retorno total'}
              </span>
              <span>R$</span>
            </ReturnValueContainer>
            <ReturnValueContainer
              isvalueDefined={!!teamAProfitBet}
              isValuePositive={isResumeTeamAPositive}
            >
              <span>
                {teamAProfitBet
                  ? isResumeTeamAPositive
                    ? `${formatCashField(teamAProfitBet.toFixed(2))}`
                    : ` - ${formatCashField(teamAProfitBet.toFixed(2))}`
                  : 'Lucro total'}
              </span>
              <span>R$</span>
            </ReturnValueContainer>

            <SeparatorBigger />
          </div>
          <div>
            <InputFormContainer>
              <input
                {...register('teamBMultiplier')}
                type="text"
                placeholder="multiplicador(ODD)"
                autoComplete="off"
                value={teamBMultiplier}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setTeamBMultiplier(multiplierInputChange(event.target.value))
                }}
              />
              <span>X</span>
            </InputFormContainer>
            <WinWinValueSugestionContainer>
              <input
                type="text"
                placeholder="Valor Sugerido"
                autoComplete="off"
                value={teamBValue}
                onChange={(event) => recalculateValueB(event.target.value)}
              />

              <span>R$</span>
            </WinWinValueSugestionContainer>

            <ReturnValueContainer
              isvalueDefined={!!teamBReturnBet}
              isValuePositive={true}
            >
              <span>
                {teamBReturnBet
                  ? formatCashField(teamBReturnBet.toFixed(2))
                  : 'Retorno total'}
              </span>
              <span>R$</span>
            </ReturnValueContainer>
            <ReturnValueContainer
              isvalueDefined={!!teamBProfitBet}
              isValuePositive={isResumeTeamBPositive}
            >
              <span>
                {teamBProfitBet
                  ? isResumeTeamBPositive
                    ? `${formatCashField(teamBProfitBet.toFixed(2))}`
                    : ` - ${formatCashField(teamBProfitBet.toFixed(2))}`
                  : 'Lucro total'}
              </span>
              <span>R$</span>
            </ReturnValueContainer>

            <Separator />
          </div>
        </WinWinContent>
        <InputFormContainer padding={true}>
          <Dropdown
            type={'leagues'}
            handleSelectChange={handleLeagueChange}
            width={'430px'}
            value={league}
          />
        </InputFormContainer>
        <InputFormContainer padding={true}>
          <Dropdown
            type={'lines'}
            handleSelectChange={handleLineChange}
            width={'430px'}
            value={line}
          />
        </InputFormContainer>
        <Separator />
        <button type="submit" disabled={!isButtonSubmitEnable}>
          Cadastrar
        </button>
      </ContainerCard>
    </FormRegisterBetContainer>
  )
}
