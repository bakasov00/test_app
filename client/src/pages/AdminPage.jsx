import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { InfoCard, Loader } from '../components'
import { useRequest } from '../hook/request.hook'
import Context from '../context/Context'

function AdminPage() {
  const [arr, setArr] = React.useState([])
  const { request, loading } = useRequest()
  const { token } = React.useContext(Context)

  React.useEffect(() => {
    request('/api/client', {}, token).then((data) => {
      if (!data.errMessage) {
        data.reverse()
        setArr([...data, ...arr])
      } else {
      }
    })
  }, [token])

  return (
    <Grid style={{ marginTop: 50 }} direction='column' container spacing={5}>
      {!loading ? (
        arr.length ? (
          arr.map((item, i) => {
            return (
              <Grid item key={i}>
                <InfoCard client={item} />
              </Grid>
            )
          })
        ) : (
          <Typography>Данных нет </Typography>
        )
      ) : (
        <Loader />
      )}
    </Grid>
  )
}

export default AdminPage
