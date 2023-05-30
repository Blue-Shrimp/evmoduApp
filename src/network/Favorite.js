import { URI } from './Common.js'

export async function addBookmark(station_id, params = {}) {
  return await URI.Favorite(station_id).bookmark.doPost(params)
}

export async function deleteBookmark(station_id, params = {}) {
  return await URI.Favorite(station_id).bookmark.doDelete(params)
}
