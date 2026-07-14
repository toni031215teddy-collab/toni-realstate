import { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('hh_favorites')) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('hh_favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggle = (property) => {
    setFavorites(prev => {
      const exists = prev.find(p => p.id === property.id)
      return exists
        ? prev.filter(p => p.id !== property.id)
        : [...prev, property]
    })
  }

  const isFavorite = (id) => favorites.some(p => p.id === id)

  return (
    <FavoritesContext.Provider value={{ favorites, toggle, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)
