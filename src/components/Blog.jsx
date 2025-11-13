import Togglable from './Togglable'
import blogService from '../services/blogs'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uplike, deleteBlog } from '../store/blogsSlice'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  const handleLike = () => {
  try {
    dispatch(uplike(blog.id))
  } catch (error) {
    alert('Error updating like')
  }
}

const handleDelete = () => {
  if (window.confirm(`Delete "${blog.title}" by "${blog.author}"?`)) {
    dispatch(deleteBlog(blog.id))
  }
}

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div data-testid="blog">{blog.title}</div>
      <Togglable buttonLabel="view">
        <p data-testid="blog-author">author: {blog.author}</p>
        <p data-testid="blog-url">url: {blog.url}</p>
        <p data-testid="blog-likes">
          likes: {blog.likes}
          <button onClick={handleLike}>like</button>
        </p>
        {blog.user?.id === user?.id && (
          <button onClick={handleDelete}>delete</button>
        )}
      </Togglable>
    </div>
  )
}

export default Blog