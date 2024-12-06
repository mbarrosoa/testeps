import { useQuery } from 'react-query'
import axios from 'axios'

const fetchPokemon = async () => {
  const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100')
  const pokemonDetails = await Promise.all(
    data.results.map(async (pokemon) => {
      const { data: details } = await axios.get(pokemon.url)
      return details
    })
  )
  return pokemonDetails
}

export function usePokemonData() {
  return useQuery('pokemon', fetchPokemon, {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

