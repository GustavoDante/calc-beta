import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { ContainerCard } from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { BetsContext } from '../../../../contexts/BetsContext'
import {
  FormRegisterBetContainer,
  InputFormContainer,
  ReturnValueContainer,
  Separator,
} from '../../styles'
import { TitleCard } from '../../../../styles/global'
import { Bet, league, line } from '../../../../@types/types'
import { Dropdown } from '../Dropdown'

const registerBetSchema = zod.object({
  value: zod.string().min(1, 'Valor mínimo de 1 real, por favor'),
  multiplier: zod.string().min(1, 'Valor mínimo de 1 real, por favor'),
  league: zod.string().optional(),
  line: zod.string().optional(),
})

export type RegisterBetData = zod.infer<typeof registerBetSchema>

interface FormRegisterBetProps {
  valueInputChange: (event: String) => string
  multiplierInputChange: (event: String) => string
}

export function FormRegisterBet({
  valueInputChange,
  multiplierInputChange,
}: FormRegisterBetProps) {
  const { handleRegisterBet, formatCashField } = useContext(BetsContext)
  const [multiplier, setMultiplier] = useState('')
  const [value, setValue] = useState('')
  const [returnBet, setReturnBet] = useState(0)
  const [profitBet, setProfitBet] = useState(0)

  const [league, setLeague] = useState<league>({ label: '', value: '' })
  const [line, setLine] = useState<line>({ label: '', value: '' })

  const newRegisterBetForm = useForm<RegisterBetData>({
    resolver: zodResolver(registerBetSchema),
  })

  const { handleSubmit, register } = newRegisterBetForm

  function resetInputs() {
    setValue('')
    setMultiplier('')
    setReturnBet(0)
    setProfitBet(0)
    setLeague({ label: '', value: '' })
    setLine({ label: '', value: '' })
  }

  const handleLeagueChange = (selectedOption: any) => {
    setLeague(selectedOption)
  }

  const handleLineChange = (selectedOption: any) => {
    setLine(selectedOption)
  }

  function handleFormRegisterBet(data: RegisterBetData) {
    const date = new Date().toUTCString()

    const bet: Bet = {
      value: parseFloat(data.value.replace(/[.]/g, '').replace(/[,]/g, '.')),
      multiplier: parseFloat(data.multiplier),
      returnBet,
      profitBet,
      league,
      line,
      win: null,
      winWin: false,
      whoWin: null,
      multiplierB: 0,
      returnBetB: 0,
      profitBetB: 0,
      valueB: 0,
      date,
    }

    handleRegisterBet(bet)
    resetInputs()
  }

  useEffect(() => {
    if (multiplier === '' || value === '') {
      setReturnBet(0)
      setProfitBet(0)
      return
    }
    const valor = parseFloat(value.replace(/[.]/g, '').replace(/[,]/g, '.'))

    const retorno = valor * parseFloat(multiplier)

    const lucro =
      retorno > valor
        ? retorno - parseFloat(value.replace(/[.]/g, '').replace(/[,]/g, '.'))
        : 0

    setReturnBet(retorno)
    setProfitBet(lucro)
  }, [multiplier, value])

  return (
    <FormRegisterBetContainer onSubmit={handleSubmit(handleFormRegisterBet)}>
      <ContainerCard>
        <TitleCard>
          <span>bet simples</span>
        </TitleCard>

        <InputFormContainer>
          <input
            {...register('multiplier', { required: true })}
            type="text"
            placeholder="multiplicador(ODD)"
            value={multiplier}
            autoComplete="off"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setMultiplier(multiplierInputChange(event.target.value))
            }}
            id="multiplier"
          />
          <span>X</span>
        </InputFormContainer>

        <InputFormContainer>
          <input
            {...register('value', { required: true })}
            type="text"
            placeholder="Valor"
            autoComplete="off"
            id="value"
            value={value}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setValue(valueInputChange(event.target.value))
            }
          />
          <span>R$</span>
        </InputFormContainer>

        <ReturnValueContainer
          isvalueDefined={!!returnBet}
          isValuePositive={true}
        >
          <span>
            {returnBet
              ? formatCashField(returnBet.toFixed(2))
              : 'Retorno total'}
          </span>
          <span>R$</span>
        </ReturnValueContainer>
        <ReturnValueContainer
          isvalueDefined={!!profitBet}
          isValuePositive={true}
        >
          <span>
            {profitBet
              ? formatCashField(profitBet.toFixed(2))
              : returnBet
              ? '0,00'
              : 'Lucro total'}
          </span>
          <span>R$</span>
        </ReturnValueContainer>

        <Separator />

        <InputFormContainer padding={true}>
          <Dropdown
            type={'leagues'}
            handleSelectChange={handleLeagueChange}
            width={'250px'}
            value={league}
          />
        </InputFormContainer>
        <InputFormContainer padding={true}>
          <Dropdown
            type={'lines'}
            handleSelectChange={handleLineChange}
            width={'250px'}
            value={line}
          />
        </InputFormContainer>

        <Separator />

        <button type="submit" disabled={!returnBet || !profitBet}>
          Cadastrar
        </button>
      </ContainerCard>
    </FormRegisterBetContainer>
  )
}
