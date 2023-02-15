import { Route, Routes } from 'react-router-dom'
import { DefaultLayout } from '../layouts/defaultLayout'
import { Login } from '../pages/Login'
import { Home } from '../pages/Home'
import { History } from '../pages/history'
import { PrivateRoutes } from './privateRoutes'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />

          <Route path="/history" element={<History />} />
        </Route>
      </Route>
    </Routes>
  )
}
