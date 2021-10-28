import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import CardList from './pages/CardList'
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './components/Logout'
import NavBar from './components/NavBar'

import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import theme from './theme'

function App () {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <Switch>
          <Route component={Landing} exact path='/' />
          <Route component={CardList} path='/cards' />
          <Route component={Login} path='/login' />
          <Route component={Register} path='/register' />
          <Route component={Logout} path='/logout' />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
