import { React, useState, useEffect } from 'react'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import axiosInstance from '../../axios'

const NavBar = props => {
  const [user, setUser] = useState('')

  useEffect(() => {
    if (window.localStorage.getItem('access_token')) {
      axiosInstance.get('user/auth-detail/')
        .then(response => setUser(response.data.username))
    }
  }, [])

  return (
    <Box
      sx={{
        flexGrow: 1
      }}
    >
      <AppBar position='static'>
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: 'inline-flex'
            }}
          >
            <Typography
              component='div'
              sx={{ mx: 2 }}
            >
              <Link href='/' color='inherit' underline='none'>
                Home
              </Link>
            </Typography>
            <Typography
              component='div'
              sx={{ mx: 2 }}
            >
              <Link href='/cards' color='inherit' underline='none'>
                Cards
              </Link>
            </Typography>
          </Box>
          {window.localStorage.getItem('access_token')
            ? <>
              <Typography
                component='div'
                sx={{ mx: 2 }}
              >
                Hello, {user}!
              </Typography>
              <Typography
                component='div'
                sx={{ mx: 2 }}
              >
                <Link href='/logout' color='inherit' underline='none'>
                  Logout
                </Link>
              </Typography>
            </>
            : <>
              <Typography
                component='div'
                sx={{ mx: 2 }}
              >
                <Link href='/login' color='inherit' underline='none'>
                  Login
                </Link>
              </Typography>
              <Typography
                component='div'
                sx={{ mx: 2 }}
              >
                <Link href='/register' color='inherit' underline='none'>
                  Register
                </Link>
              </Typography>
            </>}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
