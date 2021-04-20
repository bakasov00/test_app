import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
})

function Loader() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress color='primary' />
    </div>
  )
}

export default Loader
