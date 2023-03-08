import { useContext, useState } from 'react'
import { AuthGoogleContext } from '../../contexts/AuthGoogleContext'
import { Navigate } from 'react-router-dom'

import BackgroundLoginBeta from '../../assets/bets-image.png'
import logoGoogle from '../../assets/google-icon.svg'
import { LoginForm } from './components/LoginForm'
import { RegisterForm } from './components/RegisterForm'
import { ButtonLoginWithGoogle, ContainerLogin } from './styles'

export function Login() {
  const { signGoogle, isSignedIn } = useContext(AuthGoogleContext)
  const [isFormRegister, setIsFormRegister] = useState(false)

  if (isSignedIn) {
    return <Navigate to="/" />
  }

  function handleLogin() {
    signGoogle()
  }

  return (
    <ContainerLogin>
      <div>
        <div>
          <h3>Bem-vindo ao BetSmart - Faça apostas inteligentes!</h3>
          <strong>
            Se você é um apaixonado por jogos e quer aumentar suas chances de
            ganhar, chegou ao lugar certo!
          </strong>
        </div>

        <ButtonLoginWithGoogle onClick={handleLogin} type="button">
          <img src={logoGoogle} alt="Logo da Google" />
          {isFormRegister ? 'Cadastre-se' : 'Login'} com Google
        </ButtonLoginWithGoogle>
        <span>ou</span>
        {isFormRegister ? (
          <>
            <RegisterForm />
            <div>
              <span>
                Já tem uma conta?{' '}
                <a href="#" onClick={() => setIsFormRegister(!isFormRegister)}>
                  Faça login
                </a>
              </span>
            </div>
          </>
        ) : (
          <>
            <LoginForm />
            <div>
              <span>
                Ainda não tem uma conta?{' '}
                <a href="#" onClick={() => setIsFormRegister(!isFormRegister)}>
                  Cadastre-se
                </a>
              </span>
            </div>
          </>
        )}
      </div>

      <div>
        <img src={BackgroundLoginBeta} alt="" />
      </div>
    </ContainerLogin>
  )
}
