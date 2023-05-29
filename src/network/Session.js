import { refresh } from '@network'

const sessionKey = 'session'
const Session = {
  session: async () => {
    return await sessionKey.getObject()
  },
  accessToken: async () => {
    const session = await sessionKey.getObject()
    return session?.access_token || ''
  },
  refreshToken: async () => {
    const session = await sessionKey.getObject()
    return session?.refresh_token || ''
  },
  update: async session => {
    console.log('===== session update info start =====')
    console.log(!(session === null || session === undefined) ? JSON.stringify(session) : 'session is null')
    console.log('===== session update info end =====')
    await sessionKey.setValue(session)
  },
  clear: async () => {
    await sessionKey.clear()
    return true
  },
  isLogIned: async () => {
    const session = await sessionKey.getObject()
    return session !== null && (session?.access_token || '') !== '' && (session?.refresh_token || '') !== ''
  },
  refresh: async () => {
    const token = await Session.refreshToken()
    if (token === null || token === undefined || token === '') {
      console.log('===== local refreshToken is empty ')
      return false
    }
    const result = await refresh({ refresh: token })
    if (result?.access) {
      Session.update({
        ...(await Session.session()),
        access_token: result.access,
      })
      return true
    } else {
      Session.clear()
      return false
    }
  },
}

export { Session }
