import React from 'react'
import { makeStyles, Button } from '@material-ui/core'
import { useRequest } from '../hook/request.hook'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import Toast, { useToast } from '../components/Toast/Toast.jsx'

const useStyles = makeStyles({
  input: {
    margin: '10px 0',
  },
})

function Form() {
  const classes = useStyles()
  const { request, loading } = useRequest()
  const formRef = React.useRef()
  const { toastShow, toastRemove, toasts } = useToast()
  const [form, setForm] = React.useState({
    name: '',
    surname: '',
    patronymic: '',
    phone: '',
    adress: '',
    inn: '',
  })

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    request('/api/client/post', { method: 'POST', body: form }).then((data) => {
      if (data.errMessage) {
        toastShow({ message: data.errMessage, flag: 'error' })
      } else {
        toastShow({ message: 'Данные успешно отправлены', flag: 'success' })
      }
      setForm({
        name: '',
        surname: '',
        patronymic: '',
        phone: '',
        adress: '',
        inn: '',
      })
    })
  }

  return (
    <div>
      <ValidatorForm ref={formRef} onSubmit={submitHandler}>
        <Toast toasts={toasts} toastRemove={toastRemove} />
        <br />
        <TextValidator
          className={classes.input}
          name='name'
          label='Имя'
          variant='outlined'
          fullWidth
          value={form.name}
          onChange={changeHandler}
          validators={['required']}
          errorMessages={['Это поле обязательно ']}
        />
        <TextValidator
          className={classes.input}
          name='surname'
          label='Фамилия'
          variant='outlined'
          fullWidth
          value={form.surname}
          onChange={changeHandler}
          validators={['required']}
          errorMessages={['Это поле обязательно ']}
        />
        <TextValidator
          className={classes.input}
          name='patronymic'
          label='Отчество'
          variant='outlined'
          fullWidth
          value={form.patronymic}
          onChange={changeHandler}
          validators={['required']}
          errorMessages={['Это поле обязательно ']}
        />
        <TextValidator
          className={classes.input}
          name='phone'
          label='Телефон'
          variant='outlined'
          type='number'
          fullWidth
          value={form.phone}
          onChange={changeHandler}
          validators={['required']}
          errorMessages={['Это поле обязательно ']}
        />
        <TextValidator
          className={classes.input}
          name='adress'
          label='Адресс'
          variant='outlined'
          fullWidth
          value={form.adress}
          onChange={changeHandler}
          validators={['required']}
          errorMessages={['Это поле обязательно ']}
        />
        <TextValidator
          className={classes.input}
          name='inn'
          label='ИНН'
          variant='outlined'
          fullWidth
          type='number'
          value={form.inn}
          onChange={changeHandler}
          validators={['required']}
          errorMessages={['Это поле обязательно ']}
        />
        <Button disabled={loading} type='submit' variant='contained' color='primary'>
          Отправить
        </Button>
      </ValidatorForm>
    </div>
  )
}

export default Form
