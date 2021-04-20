import React from 'react'
import { AppBar, Toolbar, makeStyles, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Context from '../context/Context'

const useStyles = makeStyles({
  navLink: {
    marginRight: 20,
  },
})

function Navbar() {
  const classes = useStyles()
  const { isAuth, logout } = React.useContext(Context)

  return (
    <AppBar position='static'>
      <Toolbar style={{ marginLeft: 'auto' }}>
        {isAuth ? (
          <Button onClick={logout} variant='contained' color='secondary'>
            Выйти
          </Button>
        ) : (
          <>
            <Link className={classes.navLink} to='/'>
              Главная
            </Link>
            <Link to='/admin'> Войти как админ </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
