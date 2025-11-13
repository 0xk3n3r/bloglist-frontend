import Blog from "./Blog"
import blogService from '../services/blogs'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog } from '../store/blogsSlice'
import { showNotification } from '../store/notificationSlice'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const triggerNotification = (message, type) => {
      dispatch(showNotification({ message, type }))
    }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleCreate = async (e) => {
    e.preventDefault()
    const newBlog = { title, author, url }
    try {
      dispatch(createBlog(newBlog))
      triggerNotification(`a new blog "${title}" by ${author} added`, 'success')
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      alert('Error creating blog')
    }
  }

  return (
    <div>
      <form onSubmit={handleCreate}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm