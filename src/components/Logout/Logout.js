import { useEffect } from 'react'
import axiosInstance from '../../axios'
import { useHistory } from 'react-router-dom'

const Logout = _ => {
  const history = useHistory()

  useEffect(() => {
    axiosInstance.post('user/logout/blacklist/', {
      refresh_token: window.localStorage.getItem('refresh_token')
    })
    window.localStorage.removeItem('access_token')
    window.localStorage.removeItem('refresh_token')
    axiosInstance.defaults.headers.Authorization = null
    history.push('/login')
  })
  return (<div>Logout</div>)
}

export default Logout
