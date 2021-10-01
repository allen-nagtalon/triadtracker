import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import CardTable from '../../components/CardTable';

const CardList = props => {
    const [cardsState, setCardsState] = useState({
        cards: []
    })

    useEffect( () => {
        console.log("Fetching...")

        fetch('http://127.0.0.1:8000/api/cards/')
        .then(response => response.json())
        .then((data) => {
            setCardsState({ cards: data })
        })
    }, []);

    return (
        <Container maxWidth="xl">
            <CardTable cards={cardsState.cards}/>
        </Container>
    )
}

export default CardList