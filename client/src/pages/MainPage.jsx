import React from 'react'
import { Form } from '../components'

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    margin: '90px auto 0',
  },
})

function MainPage() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Form />
    </div>
  )
}

export default MainPage
