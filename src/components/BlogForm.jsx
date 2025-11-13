import Blog from "./Blog"
import blogService from '../services/blogs'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog } from '../store/blogsSlice'

const BlogForm = () => {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleCreate = async (e) => {
    e.preventDefault()
    const newBlog = { title, author, url }
    try {
      dispatch(createBlog(newBlog))
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