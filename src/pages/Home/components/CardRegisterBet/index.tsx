import { ChangeEvent, useContext, useEffect, useState } from 'react'
import {
  ContainerCard,
  InputFormContainer,
  ReturnValueContainer,
  FormRegisterBetContainer,
  TitleCard,
  Separator,
} from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { format } from 'date-fns'
import { Bet, BetsContext } from '../../../../contexts/BetsContext'

const registerBetSchema = zod.object({
  value: zod.string().min(1, 'Valor mínimo de 1 real'),
  multiplier: zod.string().min(1, 'Valor mínimo de 1 real'),
})

export type RegisterBetData = zod.infer<typeof registerBetSchema>

export function FormRegisterBet() {
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

  function valueInputChange(input: ChangeEvent<HTMLInputElement>) {
    let value = input.target.value.padStart(4, '0')

    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{1})(\d{2})$/, '$1,$2')
    value = value.replace(/(?=(\d{3})+(\D))\B/g, '.')
    value = value.replace(/(^0{2})/g, '0')
    if (parseFloat(value.replace(/[.]/g, '').replace(/[,]/g, '.')) > 1.0) {
      value = value.replace(/(^0{1})/g, '')
    }

    setValue(value)
  }

  function multiplierInputChange(input: ChangeEvent<HTMLInputElement>) {
    let multiplier = input.target.value.padStart(4, '0')
    multiplier = multiplier.replace(/\D/g, '')
    multiplier = multiplier.replace(/(\d{1})(\d{2})$/, '$1.$2')
    multiplier = multiplier.replace(/(^0{2})/g, '0')
    if (parseFloat(multiplier) > 1.0) {
      multiplier = multiplier.replace(/(^0{1})/g, '')
    }
    setMultiplier(multiplier)
  }

  function handleFormRegisterBet(data: RegisterBetData) {
    const returnBet =
      parseFloat(data.value.replace(/[.]/g, '').replace(/[,]/g, '.')) *
      parseFloat(data.multiplier)

    const profitBet =
      returnBet -
      parseFloat(data.value.replace(/[.]/g, '').replace(/[,]/g, '.'))

    console.log(profitBet)

    const date = new Date()

    const bet: Bet = {
      id: format(date, 'ddMMyyyyHHmmss' + Math.random()),
      value: parseFloat(data.value.replace(/[.]/g, '').replace(/[,]/g, '.')),
      multiplier: parseFloat(data.multiplier),
      returnBet,
      profitBet,
      win: null,
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
            {...register('value', { required: true })}
            type="text"
            placeholder="Valor"
            autoComplete="off"
            id="value"
            value={value}
            onChange={valueInputChange}
          />
          <span>R$</span>
        </InputFormContainer>
        <InputFormContainer>
          <input
            {...register('multiplier', { required: true })}
            type="text"
            placeholder="multiplicador(ODD)"
            value={multiplier}
            autoComplete="off"
            onChange={multiplierInputChange}
            id="multiplier"
          />
          <span>X</span>
        </InputFormContainer>
        <Separator></Separator>

        <ReturnValueContainer isvalueDefined={!!returnBet}>
          <span>
            {returnBet
              ? formatCashField(returnBet.toFixed(2))
              : 'Retorno total'}
          </span>
          <span>R$</span>
        </ReturnValueContainer>
        <ReturnValueContainer isvalueDefined={!!profitBet}>
          <span>
            {profitBet
              ? formatCashField(profitBet.toFixed(2))
              : returnBet
              ? '0,00'
              : 'Lucro total'}
          </span>
          <span>R$</span>
        </ReturnValueContainer>
        <Separator></Separator>

        <button type="submit" disabled={!returnBet || !profitBet}>
          Cadastrar
        </button>
      </ContainerCard>
    </FormRegisterBetContainer>
  )
}
