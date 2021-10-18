import { FormControl, TextField, Button, Select, InputLabel, MenuItem, Box } from '@mui/material'
import { useEffect, useState } from 'react'
import axiosInstance from '../../axios'

const AuthForm = props => {
  const [serverState, setServerState] = useState({
    servers: []
  })

  const [dataCenterState, setDataCenterState] = useState({
    dataCenters: []
  })

  const getServers = (servers, dataCenter) => {
    const result = servers.filter((server) => server.data_center === dataCenter)
    return result
  }

  useEffect(() => {
    axiosInstance.get('servers/')
      .then((res) => setServerState({ servers: res.data }))

    axiosInstance.get('data-centers/')
      .then((res) => setDataCenterState({ dataCenters: res.data }))
  }, [])

  return (
    <form noValidate autoComplete='off' onSubmit={props.handleSubmit}>
      <hr />
      <br />
      <TextField
        id='username'
        name='username'
        value={props.formState.username}
        onChange={props.handleInputChange}
        label='Username'
        fullWidth
      />
      <br /> <br />

      {
        (props.register)
          ? <>
            <TextField
              id='char_first_name'
              name='char_first_name'
              value={props.formState.char_first_name}
              onChange={props.handleInputChange}
              label='First Name'
            />
            <br /> <br />
            <TextField
              id='char_last_name'
              name='char_last_name'
              value={props.formState.char_last_name}
              onChange={props.handleInputChange}
              label='Last Name'
            />
            <br /> <br />
          </>
          : null
      }

      {
        (props.register)
          ? <>
            <FormControl>
              <InputLabel id='data-center-label'>Data Center</InputLabel>
              <Select
                labelId='data-center-label'
                id='data_center'
                name='data_center'
                value={props.formState.data_center}
                label='Data Center'
                onChange={props.handleInputChange}
              >
                <MenuItem disabled value={0}>
                  <em>Data Center</em>
                </MenuItem>
                {dataCenterState.dataCenters
                  .map((dataCenter) => {
                    return (
                      <MenuItem key={dataCenter.id} value={dataCenter.id}>{dataCenter.name}</MenuItem>
                    )
                  })}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id='server-label'>Server</InputLabel>
              <Select
                labelId='server-label'
                id='server'
                name='server'
                value={props.formState.server}
                label='Server'
                onChange={props.handleInputChange}
              >
                <MenuItem disabled value={0}>
                  <em>Server</em>
                </MenuItem>
                {
                  getServers(serverState.servers, props.formState.data_center)
                    .map((server) => {
                      return (
                        <MenuItem key={server.id} value={server.id}>{server.name}</MenuItem>
                      )
                    })
                }
              </Select>
            </FormControl>
            <br /><br />
            </>
          : null
      }

      <TextField
        id='password'
        name='password'
        value={props.formState.password}
        onChange={props.handleInputChange}
        label='Password'
        type='password'
        fullWidth
      />
      <br /> <br />
      <Box sx={{ mx: 20 }}>
        <Button
          type='submit'
          variant='contained'
          fullWidth
        >
          {(props.register) ? 'Register' : 'Login'}
        </Button>
      </Box>
      <br />
      <hr />
    </form>
  )
}

export default AuthForm
