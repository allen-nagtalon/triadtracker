import { useState } from 'react'
import { Container, Paper, Typography, Box, Link } from '@mui/material'
import AuthForm from '../../components/AuthForm'
import { useHistory } from 'react-router-dom'
import axiosInstance from '../../axios'

const Login = _ => {
  const history = useHistory()

  const [formState, setFormState] = useState({
    username: '',
    password: ''
  })

  const handleInputChange = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value })
  }

  const handleLoginUser = event => {
    event.preventDefault()
    axiosInstance.post('token/', {
      username: formState.username,
      password: formState.password
    })
      .then((res) => {
        window.localStorage.setItem('access_token', res.data.access)
        window.localStorage.setItem('refresh_token', res.data.refresh)
        axiosInstance.defaults.headers.Authorization =
            'JWT ' + window.localStorage.getItem('access_token')
        history.push('/cards')
      })
  }

  return (
    <Container maxWidth='sm' sx={{ mt: 6 }}>
      <Paper elevation={2}>
        <Box sx={{ padding: 8 }}>
          <Typography variant='h4' align='center'>
            Welcome to Triad Tracker!
          </Typography>
          <Typography align='center'>
            Insert subtext here.
          </Typography>
          <br />
          <AuthForm
            formState={formState}
            handleInputChange={handleInputChange}
            handleSubmit={handleLoginUser}
          />
          <br />
          <Typography component='div'>
            <Link href='/register'>
              Need an account? Register!
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

export default Login
