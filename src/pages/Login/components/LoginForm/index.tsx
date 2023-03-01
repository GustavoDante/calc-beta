import { useForm } from 'react-hook-form'
import { Error, FormContainer, InputFormContainer } from '../../styles'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { AuthGoogleContext } from '../../../../contexts/AuthGoogleContext'

const loginSchema = zod.object({
  email: zod.string().min(1, 'Digite um email válido, por favor'),
  password: zod.string().min(1, 'Digite uma senha válida, por favor'),
})

export type LoginData = zod.infer<typeof loginSchema>

export function LoginForm() {
  const { signIn } = useContext(AuthGoogleContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  })

  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
    clearErrors,
  } = loginForm

  function handleLogin() {
    try {
      signIn(email, password)
    } catch (error) {
      toast.error('Erro ao realizar login')
    }
  }

  function handleChangeEmail(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
    clearErrors('email')
  }

  function handleChangePassword(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
    clearErrors('password')
  }

  if (!isValid && isSubmitting) {
    toast.error('Preencha todos os campos corretamente, por favor')
  }

  return (
    <FormContainer onSubmit={handleSubmit(handleLogin)}>
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
      <button type="submit">Login</button>
    </FormContainer>
  )
}
