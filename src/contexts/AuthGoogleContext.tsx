import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { auth } from '../services/firebaseConfig'
import { formatMessageFirebase } from '../helpers/formatMessagesFirebase'
import { toast } from 'react-toastify'
interface AuthGoogleContextProps {
  signGoogle: () => void
  signIn: (email: string, password: string) => void
  createUser: (name: string, email: string, password: string) => void
  isSignedIn: boolean
  user: User | null
  signOut: () => void
}

interface AuthGoogleProviderProps {
  children: ReactNode
}

export const AuthGoogleContext = createContext({} as AuthGoogleContextProps)

export function AuthGoogleProvider({ children }: AuthGoogleProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  const provider = new GoogleAuthProvider()

  async function signGoogle() {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        const user = result.user

        setUser(user)
        sessionStorage.setItem('@AuthFirebase:token', JSON.stringify(token))
        sessionStorage.setItem('@AuthFirebase:user', JSON.stringify(user))

        toast.success('Login realizado com sucesso')
      })
      .catch((error) => {
        toast.error(formatMessageFirebase(error.code))
      })
  }

  async function signIn(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        const user = result.user
        console.log(credential)

        setUser(user)

        sessionStorage.setItem('@AuthFirebase:token', JSON.stringify(token))
        sessionStorage.setItem('@AuthFirebase:user', JSON.stringify(user))

        toast.success('Login realizado com sucesso')
      })
      .catch((error) => {
        toast.error(formatMessageFirebase(error.code))
      })
  }

  async function createUser(name: string, email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        await updateProfile(result.user, {
          displayName: name,
        })
        console.log(result)
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        const user = result.user

        setUser(user)

        sessionStorage.setItem('@AuthFirebase:token', JSON.stringify(token))
        sessionStorage.setItem('@AuthFirebase:user', JSON.stringify(user))

        toast.success('Cadastro realizado com sucesso')
      })
      .catch((error) => {
        toast.error(formatMessageFirebase(error.code))
      })
  }

  useEffect(() => {
    const sessionUser = sessionStorage.getItem('@AuthFirebase:user')
    const sessionToken = sessionStorage.getItem('@AuthFirebase:token')
    if (sessionUser && sessionToken) {
      setUser(JSON.parse(sessionUser))
    }
  }, [])

  function signOut() {
    sessionStorage.clear()
    setUser(null)

    return <Navigate to="/login" />
  }

  return (
    <AuthGoogleContext.Provider
      value={{
        signGoogle,
        isSignedIn: !!user,
        user,
        signOut,
        createUser,
        signIn,
      }}
    >
      {children}
    </AuthGoogleContext.Provider>
  )
}
