import { URI } from './Common.js'

export async function fetchNearestList(params = {}) {
  return await URI.Main.nearestList.Get(params)
}
