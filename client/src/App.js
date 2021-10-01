import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { grey } from '@mui/material/colors';

import Landing from './pages/Landing'
import CardList from './pages/CardList'
import NavBar from './components/NavBar'

const theme = createTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    h6: {
      fontWeight: 100
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar/>
          <Switch>
            <Route component={Landing} exact path='/' />
            <Route component={CardList} path='/cards' />
          </Switch>
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
