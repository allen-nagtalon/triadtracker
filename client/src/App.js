import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';

import Landing from './pages/Landing';
import CardList from './pages/CardList';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './components/NavBar';

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
    <Box mt={2}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar/>
          <Switch>
            <Route component={Landing} exact path='/' />
            <Route component={CardList} path='/cards' />
            <Route component={Login} path='/login' />
            <Route component={Register} path='/register' />
          </Switch>
        </BrowserRouter>
    </ThemeProvider>  
    </Box>
  );
}

export default App;
