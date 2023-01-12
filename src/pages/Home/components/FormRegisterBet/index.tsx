import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { ContainerCard, TitleCard } from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { format } from 'date-fns'
import { Bet, BetsContext } from '../../../../contexts/BetsContext'
import {
  FormRegisterBetContainer,
  InputFormContainer,
  ReturnValueContainer,
  Separator,
} from '../../styles'

const registerBetSchema = zod.object({
  value: zod.string().min(1, 'Valor mínimo de 1 real'),
  multiplier: zod.string().min(1, 'Valor mínimo de 1 real'),
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

  const newRegisterBetForm = useForm<RegisterBetData>({
    resolver: zodResolver(registerBetSchema),
  })

  const { handleSubmit, register } = newRegisterBetForm

  function resetInputs() {
    setValue('')
    setMultiplier('')
    setReturnBet(0)
    setProfitBet(0)
  }

  function handleFormRegisterBet(data: RegisterBetData) {
    const date = new Date()

    const bet: Bet = {
      id: format(date, 'ddMMyyyyHHmmss' + Math.random()),
      value: parseFloat(data.value.replace(/[.]/g, '').replace(/[,]/g, '.')),
      multiplier: parseFloat(data.multiplier),
      returnBet,
      profitBet,
      win: null,
      winWin: null,
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
          <span>Cadastrar bet</span>
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

        <button type="submit" disabled={!returnBet || !profitBet}>
          Cadastrar
        </button>
      </ContainerCard>
    </FormRegisterBetContainer>
  )
}
