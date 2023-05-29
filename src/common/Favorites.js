import { FavoriteService } from '@network'

const favoriteItems = 'favorites'
const initialFavorites = {
  title: 'Favorites',
  data: [],
}
const Favorites = {
  favorites: async () => {
    let favorites = await favoriteItems.getObject()
    if (favorites === null || favorites === undefined) {
      return { ...initialFavorites }
    }

    return favorites.length <= 0 ? initialFavorites : favorites
  },
  add: async value => {
    if (value === '' || value === null || value === undefined) {
      return false
    }

    let favorites = await favoriteItems.getObject()
    if (favorites === null || favorites === undefined) {
      favorites = { ...initialFavorites }
    }

    favorites.data = [value, ...(favorites.data || [])]
    if (favorites.data.length > 100) {
      favorites.data = favorites.data.splice(-1, 1)
    }
    await favoriteItems.setValue(favorites)

    return true
  },
  delete: async value => {
    let favorites = await favoriteItems.getObject()
    if (favorites === null || favorites === undefined) {
      return true
    }

    favorites.data = (favorites.data || []).filter(v => v.id !== value.id)
    await favoriteItems.setValue(favorites)
    return true
  },
  clear: async () => {
    await favoriteItems.setValue({ ...initialFavorites })
    return true
  },
}

export default Favorites
