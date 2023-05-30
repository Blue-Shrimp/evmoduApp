const URI = {
  Main: {
    nearestList: '/stations/nearest/',
  },
  Auth: {
    login: '/auth/signin',
    refresh: '/auth/token/refresh',
    join: '/auth/signup/email',
    userInfo: '/users/me/',
  },
  Favorite: station_id => ({
    bookmark: `/stations/${station_id}/bookmark/`,
  }),
}

export { URI }
