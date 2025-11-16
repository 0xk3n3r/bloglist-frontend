import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from './store/notificationSlice'
import { initializeBlogs, createBlog, uplike, deleteBlog } from './store/blogsSlice'
import { handleLogin, handleLogout} from './components/LoginForm'
import blogService from './services/blogs'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom'
import UserList from './components/UserList'
import UserDetails from './components/UserDetails'
import { Table, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap'


const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
     <Button variant="secondary" onClick={() => handleLogout(setUser)} className="mt-2">logout</Button>
    </div>
  )
}

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  const dispatch = useDispatch()

  const triggerNotification = (message, type) => {
    dispatch(showNotification({ message, type }))
  }

  useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          blogService.setToken(user.token)
        }
      }, [])

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

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div className="container">
        <h2>BLOG 2025</h2>
        <Notification />
        {user === null ? (
          <LoginForm />
        ) : (
          <div>

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/">home</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/users">users</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/blogs">blogs</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  {user
                    ? <em style={padding}>{user.name} logged in</em>
                    : <Link style={padding} to="/login">login</Link>
                  }
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

            <Togglable buttonLabel="Add blog">
              <BlogForm />
            </Togglable>
          </div>
        )}
      </div>

      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/blogs" element={<BlogForm />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/" element={<Menu />} />
      </Routes>
      </Router>
  )
}

export default App