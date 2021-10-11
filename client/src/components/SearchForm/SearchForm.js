import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material'
import { useState } from 'react'

const SearchForm = (props) => {
  const [filterState, setFilterState] = useState({
    name: '',
    stars: 0
  })

  const handleChange = ({ target }) => {
    setFilterState({ ...filterState, [target.name]: target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    props.handleSearchSubmit(filterState)
  }

  return (
    <Box component='div' display='grid' sx={{ display: 'inline' }}>
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField id='name' name='name' label='Name' value={filterState.name} variant='outlined' size='small' onChange={handleChange} />
        <FormControl>
          <InputLabel id='stars-label'>Rarity</InputLabel>
          <Select
            labelId='stars-label'
            id='stars'
            name='stars'
            value={filterState.stars}
            label='Stars'
            onChange={handleChange}
            size='small'
          >
            <MenuItem value={0}>All Rarities</MenuItem>
            <MenuItem value={5}>★★★★★</MenuItem>
            <MenuItem value={4}>★★★★</MenuItem>
            <MenuItem value={3}>★★★</MenuItem>
            <MenuItem value={2}>★★</MenuItem>
            <MenuItem value={1}>★</MenuItem>
          </Select>
        </FormControl>
        <Button
          type='submit'
          variant='contained'
        >
          Search
        </Button>
      </form>
    </Box>
  )
}

export default SearchForm
