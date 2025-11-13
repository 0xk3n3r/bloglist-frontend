import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from './store/notificationSlice'
import { initializeBlogs, createBlog, uplike, deleteBlog } from './store/blogsSlice'

const App = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  const triggerNotification = (message, type) => {
    dispatch(showNotification({ message, type }))
  }

  const handleUpdate = (updatedBlog) => {
    setBlogs(prevBlogs =>
      prevBlogs.map(blog =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
    )
  }
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    console.log('Calling addBlog directly')
    addBlog()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    console.log({ username, password })
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      triggerNotification(`Welcome ${user.name}`, 'success')
    } catch (error) {
      console.log('Login failed:', error)
      triggerNotification('Wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    blogService.setToken(null)
  }

  const addBlog = async () => {
    try {
      const newBlog = dispatch(createBlog({ title, author, url }))
      console.log('New blog:', newBlog)
      triggerNotification(`a new blog "${newBlog.title}" by ${newBlog.author} added`, 'success')
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (AxiosError) {
      console.error('Error creating blog:', error)
      triggerNotification('Error creating blog', 'error')
    }
  }

  const handleDelete = (id, title, author) => {
  if (window.confirm(`Delete "${title}" by "${author}"?`)) {
    dispatch(deleteBlog(id))
  }
}

  const handleLike = (id) => {
    dispatch(uplike(id))
  }

  const loginForm = () => {
    return (
      <div>
        {!user &&
        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={() => handleLogin(username, password)}
          />
        </Togglable>
        }
      </div>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <BlogForm
          title={title}
          author={author}
          url={url}
          handleTitlenameChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlnameChange={({ target }) => setUrl(target.value)}
          addblog={addBlog}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="ADD blog">
            {blogForm()}
          </Togglable>
          <Togglable buttonLabel="SHOW blog">
            <h2>Blog List</h2>
            {sortedBlogs.map(blog => (
              <Blog
              key={blog.id}
              blog={blog}
              user={user}
              handleLike={() => handleLike(blog.id)}
              handleDelete={() => handleDelete(blog.id, blog.title, blog.author)}
            />
            ))}
          </Togglable>
        </div>
      )}
    </div>
  )
}

export default App