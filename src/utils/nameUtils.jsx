export function getInitials(name) {
  const words = name.split(' ')
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase()
  }
  return words.slice(0, 2).map(word => word.charAt(0).toUpperCase()).join('')
}

export const fallbackColors = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-orange-500',
]

export function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * fallbackColors.length)
  return fallbackColors[randomIndex]
}

