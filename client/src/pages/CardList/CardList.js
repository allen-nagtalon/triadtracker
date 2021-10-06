import { useEffect, useState } from 'react';
import { Box, FormControl, TextField, InputLabel, Container, Select, MenuItem, Button } from '@mui/material';
import CardTable from '../../components/CardTable';

const CardList = props => {
    const [cardsState, setCardsState] = useState({
        cards: []
    })

    const [rarity, setRarity] = useState(0)

    const handleRarityChange = (event) => {
        setRarity(event.target.value)
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
            <Box component="div" display="grid" mt={2} sx={{ display: 'inline' }}>
                <TextField id="name" label="Name" variant="outlined" size="small"/>
                <FormControl>
                    <InputLabel id="rarity-label">Rarity</InputLabel>
                    <Select
                        labelId="rarity-label"
                        id="rarity"
                        value={rarity}
                        label="Rarity"
                        onChange={handleRarityChange}
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
                <Button variant="contained">Search</Button>
            </Box>

            <CardTable cards={cardsState.cards}/>
        </Container>
    )
}

export default CardList