import { useState } from 'react'
import { getInitials, getRandomColor } from '../utils/nameUtils'

export function PokemonAvatar({ name, imageUrl }) {
  const [imageError, setImageError] = useState(false)
  const [bgColor] = useState(getRandomColor())

  if (imageError || !imageUrl) {
    return (
      <div 
        className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center text-white font-bold`}
        aria-label={`${name} avatar`}
      >
        {getInitials(name)}
      </div>
    )
  }

  return (
    <img
      src={imageUrl}
      alt={`${name} sprite`}
      className="w-12 h-12 rounded-full"
      onError={() => setImageError(true)}
    />
  )
}

