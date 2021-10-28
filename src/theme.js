import { createTheme } from '@mui/material'

// Colors
const primary = '#2f2f2f'
const secondary = '#ffdf00'

const theme = createTheme({
  palette: {
    primary: { main: primary },
    secondary: { main: secondary }
  }
})

export default theme
