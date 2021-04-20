import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'

function InfoCard({ client }) {
  return (
    <Card>
      <CardContent>
        <Typography component='p'>
          <b>Имя:</b> {client.name}
        </Typography>
        <Typography component='p'>
          <b>Фамилия:</b> {client.surname}
        </Typography>
        <Typography component='p'>
          <b>Отчество:</b> {client.patronymic}
        </Typography>
        <Typography component='p'>
          <b>Телефон:</b> {client.phone}
        </Typography>
        <Typography component='p'>
          <b>Адрес:</b> {client.adress}
        </Typography>
        <Typography component='p'>
          <b>ИНН:</b> {client.inn}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default InfoCard
