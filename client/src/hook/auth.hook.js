import { useEffect, useState, useCallback } from 'react'

export const useAuth = () => {
  const storageName = 'testapp_token'
  const [token, setToken] = useState(null)
  const [isAuth, setIsAuth] = useState(false)

  const login = useCallback((jwtToken) => {
    setToken(jwtToken)
    setIsAuth(true)
    localStorage.setItem(storageName, JSON.stringify(jwtToken))
  }, [])

  const logout = () => {
    setToken(null)
    setIsAuth(false)
    localStorage.removeItem(storageName)
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem(storageName))
    if (token) {
      login(token)
    }
  }, [login])

  return { login, logout, token, isAuth }
}
