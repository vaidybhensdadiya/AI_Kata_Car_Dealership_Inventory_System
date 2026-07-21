import React, { createContext, useContext, useState, useEffect } from 'react'
import axiosClient from '../api/axiosClient'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem('token') || null)
  const [loading, setLoading] = useState(false)

  const login = async (username, password) => {
    setLoading(true)
    try {
      const response = await axiosClient.post('/auth/login/', { username, password })
      const { access, user: userData } = response.data
      setToken(access)
      setUser(userData)
      localStorage.setItem('token', access)
      localStorage.setItem('user', JSON.stringify(userData))
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Login failed. Please check credentials.'
      }
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    setLoading(true)
    try {
      await axiosClient.post('/auth/register/', userData)
      return { success: true }
    } catch (error) {
      const errors = error.response?.data
      let message = 'Registration failed.'
      if (errors) {
        if (typeof errors === 'string') message = errors
        else if (errors.email) message = errors.email[0]
        else if (errors.username) message = errors.username[0]
        else if (errors.password) message = errors.password[0]
      }
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
