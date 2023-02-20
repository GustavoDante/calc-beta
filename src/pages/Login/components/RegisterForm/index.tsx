import { useForm } from 'react-hook-form'
import { Error, FormContainer, InputFormContainer } from '../../styles'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { AuthGoogleContext } from '../../../../contexts/AuthGoogleContext'

const registerSchema = zod
  .object({
    name: zod.string().min(1, 'Digite como quer ser chamado, por favor'),
    email: zod.string().min(1, 'Digite um email válido, por favor'),
    password: zod.string().min(1, 'Digite uma senha válida, por favor'),
    confirmPassword: zod.string().min(1, 'As senhas precisam ser iguais'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas precisam ser iguais',
    path: ['confirmPassword'],
  })

export type RegisterData = zod.infer<typeof registerSchema>

export function RegisterForm() {
  const { createUser } = useContext(AuthGoogleContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const registerForm = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
    clearErrors,
  } = registerForm

  function handleRegister() {
    try {
      createUser(name, email, password)
      toast.success('Cadastro realizado com sucesso')
      setName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    } catch (error) {}
  }

  function handleChangeName(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
    clearErrors('name')
  }

  function handleChangeEmail(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
    clearErrors('email')
  }

  function handleChangePassword(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
    clearErrors('password')
  }

  function handleChangeConfirmPassword(event: ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(event.target.value)
    clearErrors('confirmPassword')
  }

  if (!isValid && isSubmitting) {
    toast.error('Preencha todos os campos corretamente')
  }

  return (
    <FormContainer onSubmit={handleSubmit(handleRegister)}>
      <InputFormContainer error={!!errors.name}>
        <input
          {...register('name', { required: true })}
          type="text"
          placeholder="Nome"
          value={name}
          onChange={handleChangeName}
        />
      </InputFormContainer>
      {errors.name && <Error>{errors.name.message}</Error>}
      <InputFormContainer error={!!errors.email}>
        <input
          {...register('email', { required: true })}
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChangeEmail}
        />
      </InputFormContainer>
      {errors.email && <Error>{errors.email.message}</Error>}
      <InputFormContainer error={!!errors.password}>
        <input
          {...register('password', { required: true })}
          type="password"
          placeholder="Senha"
          value={password}
          onChange={handleChangePassword}
        />
      </InputFormContainer>
      {errors.password && <Error>{errors.password.message}</Error>}
      <InputFormContainer error={!!errors.confirmPassword}>
        <input
          {...register('confirmPassword', { required: true })}
          type="password"
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChange={handleChangeConfirmPassword}
        />
      </InputFormContainer>
      {errors.confirmPassword && (
        <Error>{errors.confirmPassword.message}</Error>
      )}
      <button type="submit">Cadastrar</button>
    </FormContainer>
  )
}
