import { addComment } from '../store/blogsSlice'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCommentToBlog } from '../store/blogsSlice'

const CommentForm = ({ blogId }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addCommentToBlog(blogId, comment))
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button type="submit">Post Comment</button>
    </form>
  )
}

export default CommentForm