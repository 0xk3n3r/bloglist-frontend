import Togglable from './Togglable'
import blogService from '../services/blogs'
import React, { useState, useEffect } from 'react'

const Blog = ({ blog, user, onUpdate, onDelete }) => {
  const [currentBlog, setCurrentBlog] = useState(blog)

  useEffect(() => {
    setCurrentBlog(blog)
  }, [blog])

  const handleLike = async () => {
    try {
      const updatedBlog = await blogService.uplike(blog.id)
      console.log('Updated blog:', updatedBlog)
      setCurrentBlog(updatedBlog)
      onUpdate(updatedBlog)
    } catch (error) {
      console.error('Error liking the blog:', error)
    }
  }

  const handleDelete = () => {
    if (window.confirm(`Delete "${blog.title}" by "${blog.author}"?`)) {
      onDelete(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (<div>
    <div data-testid="blog" style={blogStyle}>
      <div data-testid="blog"> {blog.title} </div>
      <Togglable buttonLabel="view">
        <p data-testid="blog-author">author: {blog.author}</p>
        <p data-testid="blog-url">url: {blog.url} </p>
        <p data-testid="blog-likes">likes: {blog.likes} <button onClick={handleLike}>like</button></p>
        {blog.user?.id === user?.id && (
          <button onClick={handleDelete}>delete</button>
        )}
      </Togglable>
    </div>
  </div>
  )}

export default Blog