import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import BlogForm from './BlogForm'

test('calls the addblog handler with the correct details when a new blog is created', async () => {
  const mockAddBlog = vi.fn()

  const App = () => {
    const [title, setTitle] = React.useState('')
    const [author, setAuthor] = React.useState('')
    const [url, setUrl] = React.useState('')

    return (
      <BlogForm
        title={title}
        author={author}
        url={url}
        handleTitlenameChange={(e) => setTitle(e.target.value)}
        handleAuthorChange={(e) => setAuthor(e.target.value)}
        handleUrlnameChange={(e) => setUrl(e.target.value)}
        addblog={mockAddBlog}
      />
    )
  }

  render(<App />)

  await userEvent.type(screen.getByPlaceholderText('Title'), 'New Blog Title')
  await userEvent.type(screen.getByPlaceholderText('Author'), 'Jane Doe')
  await userEvent.type(screen.getByPlaceholderText('URL'), 'http://example.com')

  await userEvent.click(screen.getByText(/save/i))

  expect(mockAddBlog).toHaveBeenCalledTimes(1)
  expect(mockAddBlog).toHaveBeenCalledWith({
    title: 'New Blog Title',
    author: 'Jane Doe',
    url: 'http://example.com'
  })
})
