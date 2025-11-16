import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updated = action.payload
      return state.map(blog => blog.id === updated.id ? updated : blog)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    },
    addComment(state, action) {
      console.log('action.payload', action.payload)
      const { blogId, comment } = action.payload || {}
      if (!blogId || !comment) {
        console.error('Invalid payload:', action.payload)
        return
      }
      const blog = state.find(b => b.id === blogId)
      if (blog) {
        if (!blog.comments) blog.comments = []
        blog.comments.push(comment)
      }
    }
  }
})

export const { setBlogs, appendBlog, updateBlog, removeBlog, addComment } = blogsSlice.actions

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll()
  dispatch(setBlogs(blogs))
}

export const createBlog = (newBlog) => async (dispatch) => {
  const createdBlog = await blogService.create(newBlog)
  dispatch(appendBlog(createdBlog))
}

export const uplike = (id) => async (dispatch, getState) => {
  const blog = getState().blogs.find(b => b.id === id)
  const updatedBlog = { ...blog, likes: (blog.likes || 0) + 1 }
  const savedBlog = await blogService.uplike(id, updatedBlog)
  dispatch(updateBlog(savedBlog))
}

export const deleteBlog = (id) => async (dispatch) => {
  await blogService.deleteBlog(id)
  dispatch(removeBlog(id))
}

export const addCommentToBlog = (blogId, commentContent) => async (dispatch, getState) => {
  const token = getState().user?.token
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await blogService.addComment(blogId, { comment: commentContent }, config)
    console.log('comment:', response)
    dispatch(addComment({ blogId, comment: response }))
  } catch (error) {
    console.error('Adding comment failed:', error)
  }
}

export default blogsSlice.reducer