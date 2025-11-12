import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch } from 'react-redux'
import { showNotification } from './store/notificationSlice'

const App = () => {
  const [blogs, setBlogs] = useState([])
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

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
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

  const addBlog = async (title, author, url) => {
    const blogObject = {
      title,
      author,
      url,
    }

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      
      triggerNotification(`a new blog "${returnedBlog.title}" by ${returnedBlog.author} added`, 'success')
    } catch (error) {
      console.error('Error creating blog:', error)
      triggerNotification('Error creating blog', 'error')
    }
  }

  const handleDelete = (id) => {
    blogService.deleteBlog(id)
      .then(() => {
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== id))
      })
      .catch(error => {
        console.error('FAIL:', error)
        alert('FAIL')
      })
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
          addblog={() => addBlog(title, author, url)}
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
              <Blog key={blog.id} blog={blog} onUpdate={handleUpdate} onDelete={handleDelete}/>
            ))}
          </Togglable>
        </div>
      )}
    </div>
  )
}

export default App