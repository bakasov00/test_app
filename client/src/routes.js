import { Route, Switch, Redirect } from 'react-router-dom'
import { MainPage, AdminPage } from './pages'
import { FormAdmin } from './components'

export const useRoutes = (isAuth) => {
  if (isAuth) {
    return (
      <Switch>
        <Route path='/admin/main' component={AdminPage} exact />
        <Redirect to='/admin/main' />
      </Switch>
    )
  }
  return (
    <Switch>
      <Route path='/' component={MainPage} exact />
      <Route path='/admin' component={FormAdmin} exact />
      <Redirect to='/' />
    </Switch>
  )
}
