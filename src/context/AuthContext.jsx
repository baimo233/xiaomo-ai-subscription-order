import { createContext, useContext, useMemo, useState } from 'react'

const USER_KEY = 'xiaomo-lab-user'
const USERS_KEY = 'xiaomo-lab-users'

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readJson(USER_KEY, null))

  const api = useMemo(() => {
    function persistUser(next) {
      setUser(next)
      if (next) localStorage.setItem(USER_KEY, JSON.stringify(next))
      else localStorage.removeItem(USER_KEY)
    }

    return {
      user,
      login(username, password) {
        const name = username.trim()
        const users = readJson(USERS_KEY, [])
        const found = users.find((item) => item.username === name && item.password === password)
        if (!found) return { ok: false, error: 'invalidLogin' }
        persistUser({ username: found.username, createdAt: found.createdAt })
        return { ok: true }
      },
      register(username, password) {
        const name = username.trim()
        if (name.length < 2) return { ok: false, error: 'invalidUsername' }
        if (password.length < 4) return { ok: false, error: 'invalidPassword' }
        const users = readJson(USERS_KEY, [])
        if (users.some((item) => item.username === name)) return { ok: false, error: 'usernameTaken' }
        const next = { username: name, password, createdAt: new Date().toISOString() }
        localStorage.setItem(USERS_KEY, JSON.stringify([...users, next]))
        persistUser({ username: name, createdAt: next.createdAt })
        return { ok: true }
      },
      logout() {
        persistUser(null)
      },
    }
  }, [user])

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth must be used within AuthProvider')
  return value
}
