import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, FormControl, TextField, InputLabel, Container, Select, MenuItem, Button } from '@mui/material';
import CardTable from '../../components/CardTable';

const CardList = props => {
    const [cardsState, setCardsState] = useState({
        cards: []
    })

    const [filterState, setFilterState] = useState({
        name: '',
        stars: 0,
    })

    const handleChange = ({target}) => {
        setFilterState({ ...filterState, [target.name]: target.value })
    }
    
    const handleSubmit = event => {
        event.preventDefault()
        axios.post('http://127.0.0.1:8000/api/cards/', {
            name: filterState.name,
            stars: filterState.stars
        })
        .then(response => setCardsState({ cards: response.data }))
    }

    useEffect( () => {
        console.log("Fetching...")

        fetch('http://127.0.0.1:8000/api/cards/')
        .then(response => response.json())
        .then((data) => {
            setCardsState({ cards: data })
        })
    }, []);

    return (
        <Container maxWidth="md">
            <Box component="div" display="grid" sx={{ display: 'inline' }}>
                <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                    <TextField id="name" name="name" label="Name" value={filterState.name} variant="outlined" size="small" onChange={handleChange} />
                    <FormControl>
                        <InputLabel id="stars-label">Rarity</InputLabel>
                        <Select
                            labelId="stars-label"
                            id="stars"
                            name="stars"
                            value={filterState.stars}
                            label="Stars"
                            onChange={handleChange}
                            size="small"
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
                        type="submit"
                        variant="contained"
                    >
                        Search
                    </Button>
                </form>
            </Box>

            <CardTable cards={cardsState.cards}/>
        </Container>
    )
}

export default CardList