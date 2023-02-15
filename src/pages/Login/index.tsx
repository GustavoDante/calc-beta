import { useContext } from 'react'
import { AuthGoogleContext } from '../../contexts/AuthGoogleContext'
import { Navigate } from 'react-router-dom'

export function Login() {
  const { signGoogle, isSignedIn } = useContext(AuthGoogleContext)

  if (isSignedIn) {
    return <Navigate to="/" />
  }

  function handleLogin() {
    signGoogle()
  }

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}
