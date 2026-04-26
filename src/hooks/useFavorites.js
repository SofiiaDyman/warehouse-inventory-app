import { useState, useEffect } from 'react';

const STORAGE_KEY = 'inventory_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function isFavorite(id) {
    return favorites.includes(id);
  }

  function toggleFavorite(id) {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  }

  function removeFavorite(id) {
    setFavorites(prev => prev.filter(f => f !== id));
  }

  return { favorites, isFavorite, toggleFavorite, removeFavorite };
}