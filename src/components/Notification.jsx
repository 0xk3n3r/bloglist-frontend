import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideNotification } from '../store/notificationSlice'
import './Notification.css'

const Notification = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.notification.message)
  const type = useSelector((state) => state.notification.type)

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(hideNotification())
    }, 3000);
    return () => clearTimeout(timer)
  }, [message, dispatch])

  const handleClose = () => {
    dispatch(hideNotification())
  }

  if (message === null) return null

  const className = `notification ${type}`

  return (
    <div className={className}>
      {message}
      <button className="close-button" onClick={handleClose}>×</button>
    </div>
  )
}

export default Notification