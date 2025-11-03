import Togglable from './Togglable'
import blogService from '../services/blogs'
import axios from 'axios'
import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [currentBlog, setCurrentBlog] = useState(blog)

  const handleLike = async () => {
    try {
      const updatedBlog = await blogService.uplike(blog.id)
      console.log('Updated blog:', updatedBlog)
      setCurrentBlog(updatedBlog)
    } catch (error) {
      console.error('Error liking the blog:', error)
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
    <div style={blogStyle}>
    {blog.title} 
      <Togglable buttonLabel="view">
        <p>author: {blog.author}</p>
        <p>url: {blog.url} </p>
        <p>likes: {blog.likes} <button onClick={handleLike}>like</button></p>
      </Togglable>
    </div>
  </div>
)}

export default Blog