import { useState, useEffect, useRef, useMemo } from 'react'
import { PokemonAvatar } from './PokemonAvatar'
import { Badge } from './Badge'
import { usePokemonData } from '../hooks/usePokemonData'
export function PokemonList() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const listRef = useRef(null)
  const searchRef = useRef(null)

  const { data: pokemon, isLoading, error } = usePokemonData()

  const filteredPokemon = useMemo(() => 
    pokemon?.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || []
  , [pokemon, searchQuery])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault()
        searchRef.current?.focus()
        return
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < filteredPokemon.length - 1 ? prev + 1 : prev
        )
      }
    
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : 0)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [filteredPokemon])

  useEffect(() => {
    const selectedElement = listRef.current?.children[selectedIndex]
    if (selectedElement) {
      selectedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [selectedIndex])

  if (error) {
    throw error
  }

  return (
    <div className="w-full max-w-2xl mx-auto border rounded-lg shadow-lg bg-white">
      <div className="p-4 border-b">
        <input
          ref={searchRef}
          type="text"
          placeholder="Search Pokemon (Ctrl + /)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="h-[600px] overflow-auto">
        <div ref={listRef} className="p-4 space-y-4">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 animate-pulse">
                <div className="h-12 w-12 bg-gray-200 rounded-full" />
                <div className="space-y-2">
                  <div className="h-4 w-[200px] bg-gray-200 rounded" />
                  <div className="h-4 w-[150px] bg-gray-200 rounded" />
                </div>
              </div>
            ))
          ) : (
            filteredPokemon.map((p, index) => (
              <div
                key={p.id}
                className={`flex items-center p-4 rounded-lg transition-colors
                  ${index === selectedIndex ? 'bg-blue-100' : 'hover:bg-gray-100'}
                  focus:outline-none focus:ring-2 focus:ring-blue-500`}
                tabIndex={0}
                role="button"
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={() => setSelectedIndex(index)}
                aria-label={`${p.name} with abilities: ${p.abilities.map(a => a.ability.name).join(', ')}`}
              >
                <PokemonAvatar
                  name={p.name}
                  imageUrl={p.sprites.front_default}
                />
                <div className="ml-4 flex-1">
                  <h2 className="text-xl font-bold capitalize mb-2">{p.name}</h2>
                  <div className="flex flex-wrap gap-2">
                    {p.abilities.slice(0, 3).map(({ ability }) => (
                      <Badge key={ability.name} text={ability.name} />
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
          {!isLoading && filteredPokemon.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              Nenhum Pokémon encontrado para sua pesquisa.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

