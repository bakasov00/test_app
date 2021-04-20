import { Container } from '@material-ui/core'
import { Navbar } from './components'
import Context from './context/Context'

import { useAuth } from './hook/auth.hook'
import { useRoutes } from './routes'

function App() {
  const { isAuth, login, logout, token } = useAuth()
  const routes = useRoutes(isAuth)
  return (
    <>
      <Context.Provider value={{ isAuth, token, login, logout }}>
        <Navbar />
        <Container>{routes}</Container>
      </Context.Provider>
    </>
  )
}

export default App
