import { useState } from 'react'
import { Container, Paper, Box, Typography, Link } from '@mui/material'
import { useHistory } from 'react-router-dom'
import axiosInstance from '../../axios'
import AuthForm from '../../components/AuthForm'

const Register = _ => {
  const history = useHistory()

  const [formState, setFormState] = useState({
    username: '',
    char_first_name: '',
    char_last_name: '',
    server: 0,
    data_center: 0,
    password: ''
  })

  const handleInputChange = ({ target }) => {
    if (target.name === 'data_center') {
      setFormState({ ...formState, server: 0, data_center: target.value })
    } else {
      setFormState({ ...formState, [target.name]: target.value })
    }
  }

  const handleRegisterUser = event => {
    event.preventDefault()
    axiosInstance.post('user/register/', {
      username: formState.username,
      char_first_name: formState.char_first_name,
      char_last_name: formState.char_last_name,
      server: formState.server,
      data_center: formState.data_center,
      password: formState.password
    })
      .then((res) => {
        history.push('/login')
      })
  }

  return (
    <Container maxWidth='sm' sx={{ mt: 6 }}>
      <Paper elevation={2}>
        <Box sx={{ padding: 8 }}>
          <Typography variant='h4' align='center'>
            Create a Triad Tracker Account!
          </Typography>
          <Typography align='center'>
            Start your collection today!
          </Typography>
          <br />
          <AuthForm
            register
            formState={formState}
            handleInputChange={handleInputChange}
            handleSubmit={handleRegisterUser}
          />
          <br />
          <Typography component='div'>
            <Link href='/login'>
              Already signed up? Log in!
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

export default Register
