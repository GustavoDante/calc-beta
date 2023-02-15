import { useContext } from 'react'
import { AuthGoogleContext } from '../contexts/AuthGoogleContext'
import { Navigate, Outlet } from 'react-router-dom'

export function PrivateRoutes() {
  const { isSignedIn } = useContext(AuthGoogleContext)

  return isSignedIn ? <Outlet /> : <Navigate to="/login" />
}
