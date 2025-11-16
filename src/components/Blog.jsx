import Togglable from './Togglable'
import blogService from '../services/blogs'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uplike, deleteBlog } from '../store/blogsSlice'
import { useParams } from 'react-router-dom'
import { initializeBlogs, createBlog } from '../store/blogsSlice'
import CommentForm from "./CommentForm"

const Blog = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(u => u.id === id)
  const user = useSelector(state => state.user)

  useEffect(() => {
      dispatch(initializeBlogs())
    }, [dispatch])
  console.log('blogs:', blog)
  if (!blog) {
    return <div>Loading...</div>
  }

  const handleLike = () => {
  try {
    dispatch(uplike(id))
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
        <p data-testid="blog-user">user: {blog.user.name}</p>
        <p data-testid="blog-likes">
          likes: {blog.likes}
          <button onClick={handleLike}>like</button>
        </p>
        <div data-testid="blog-comments">
          <h3>comments:</h3>
          {blog.comments.map(comment => (
              <li key={comment.id}>{comment.comment}</li>))}
        </div>
        {blog.user?.id === user?.id && (
          <button onClick={handleDelete}>delete</button>
        )}
        <CommentForm />
      </Togglable>
    </div>
  )
}

export default Blog