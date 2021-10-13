import { useState } from 'react'
import { Container } from '@mui/material'
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
    <Container maxWidth='sm'>
      <AuthForm
        formState={formState}
        handleInputChange={handleInputChange}
        handleSubmit={handleLoginUser}
      />

      <br />
    </Container>
  )
}

export default Login
