import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
import { useRequest } from '../hook/request.hook'
import Context from '../context/Context'
import Toast, { useToast } from '../components/Toast/Toast.jsx'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    margin: '100px auto 0',
  },
  input: {
    margin: '10px 0',
  },
})

function FormAdmin() {
  const classes = useStyles()
  const { request, loading } = useRequest()
  const { login } = React.useContext(Context)
  const { toastShow, toastRemove, toasts } = useToast()

  const [form, setForm] = React.useState({
    username: '',
    password: '',
  })

  const submitHandler = (event) => {
    event.preventDefault()
    request('/api/admin/login', { method: 'POST', body: form }).then((data) => {
      if (data.errMessage) {
        toastShow({ message: data.errMessage, flag: 'error' })
      } else {
        login(data.token)
      }
    })
  }

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  return (
    <ValidatorForm className={classes.root} onSubmit={submitHandler}>
      <Toast toasts={toasts} toastRemove={toastRemove} />

      <TextValidator
        className={classes.input}
        name='username'
        label='username'
        variant='outlined'
        fullWidth
        value={form.username}
        onChange={changeHandler}
        validators={['required']}
        errorMessages={['Это поле обязательно ']}
      />
      <TextValidator
        className={classes.input}
        name='password'
        label='Пароль'
        variant='outlined'
        fullWidth
        value={form.password}
        onChange={changeHandler}
        validators={['required']}
        errorMessages={['Это поле обязательно ']}
      />
      <Button disabled={loading} type='submit' variant='contained' color='primary'>
        Войти
      </Button>
    </ValidatorForm>
  )
}

export default FormAdmin
