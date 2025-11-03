import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author, but not url or likes by default', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Jane Doe',
    url: 'http://example.com',
    likes: 42,
    user: { id: 'user1' }
  }
  const user = { id: 'user1' }

  render(<Blog blog={blog} user={user} onUpdate={() => {}} onDelete={() => {}} />)

  expect(screen.getByText('Test Blog')).toBeInTheDocument()
  expect(screen.getByText('Jane Doe')).toBeInTheDocument()
  expect(screen.queryByText(/http:\/\/example.com/)).toBeNull()
  expect(screen.queryByText(/likes:/)).toBeNull()
})
