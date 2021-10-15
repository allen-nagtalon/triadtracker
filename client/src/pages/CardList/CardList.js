import { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import CardTable from '../../components/CardTable'
import SearchForm from '../../components/SearchForm'
import axiosInstance from '../../axios'

const CardList = _ => {
  const [cardsState, setCardsState] = useState({
    cards: []
  })

  const handleSearchSubmit = filterState => {
    axiosInstance.post('cards/', {
      name: filterState.name,
      stars: filterState.stars
    })
      .then(response => setCardsState({ cards: response.data }))
  }

  useEffect(() => {
    axiosInstance.get('cards/')
      .then(response => setCardsState({ cards: response.data }))
  }, [])

  return (
    <Container maxWidth='md'>
      <SearchForm handleSearchSubmit={handleSearchSubmit} />
      <CardTable
        cards={cardsState.cards}
      />
    </Container>
  )
}

export default CardList
