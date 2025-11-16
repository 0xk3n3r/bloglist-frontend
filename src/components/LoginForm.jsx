import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../services/login'
import { setUser } from '../store/userSlice'
import blogService from '../services/blogs'
import { showNotification } from '../store/notificationSlice'
import { Table, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap'

export const handleLogin = async (
  username,
  password,
  dispatch,
  triggerNotification,
  setUserState,
  setUsername,
  setPassword
) => {
  try {
    const userData = await login({ username, password })
    window.localStorage.setItem('loggedUser', JSON.stringify(userData))
    dispatch(setUser(userData))
    setUserState(userData)
    setUsername('')
    setPassword('')
    triggerNotification(`Welcome ${userData.name}`, 'success')
  } catch (error) {
    console.log('Login failed:', error)
    triggerNotification('Wrong username or password', 'error')
  }
}

export const handleLogout = (setUserState) => {
  window.localStorage.removeItem('loggedUser')
  setUserState(null)
  blogService.setToken(null)
}

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  const triggerNotification = (message, type) => {
        dispatch(showNotification({ message, type }))
      }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleLogin(
      username,
      password,
      dispatch,
      triggerNotification,
      setUser,
      setUsername,
      setPassword
    )
  }

  const handleLogoutClick = () => {
    handleLogout(setUser)
  }

  return (
    <>
      <h2>Log in:</h2>
      {!user ? (
        <form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>password:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            login
          </Button>
        </form>
      ) : (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={handleLogoutClick}>Logout</button>
        </div>
      )}
    </>
  )
}

export default LoginForm