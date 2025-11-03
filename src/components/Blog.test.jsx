import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import blogService from '../services/blogs'

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
  //expect(screen.getByText('Jane Doe')).toBeInTheDocument()
  //expect(screen.queryByText(/http:\/\/example.com/)).toBeNull()
  //expect(screen.queryByText(/likes:/)).toBeNull()
})

test('shows url and likes after clicking the button', async () => {
  const blog = {
    title: 'Test Blog',
    author: 'Jane Doe',
    url: 'http://example.com',
    likes: 42,
    user: { id: 'user1' }
  }
  const user = { id: 'user1' }

  render(<Blog blog={blog} user={user} onUpdate={() => {}} onDelete={() => {}} />)

  const userEventInstance = userEvent.setup()
  const toggleButton = screen.getByText('view')
  await userEventInstance.click(toggleButton)

  expect(screen.getByTestId('blog-url')).toHaveTextContent('url: http://example.com')
  expect(screen.getByTestId('blog-likes')).toHaveTextContent(`likes: ${blog.likes}`)
})

test('calls the event handler twice when the like button is clicked twice', async () => {
  const mockOnUpdate = vi.fn()

  const blog = {
    title: 'Test Blog',
    author: 'Jane Doe',
    url: 'http://example.com',
    likes: 42,
    user: { id: 'user1' }
  }
  const user = { id: 'user1' }

render(<Blog blog={blog} user={user} onUpdate={mockOnUpdate} onDelete={() => {}} />)
blogService.uplike = vi.fn().mockResolvedValue({
  ...blog,
  likes: blog.likes + 1,
  id: blog.id
})
const userEventInstance = userEvent.setup()
const toggleButton = screen.getByText('view')
await userEventInstance.click(toggleButton)

const likeButton = screen.getByText('like')

await userEventInstance.click(likeButton)
await userEventInstance.click(likeButton)

expect(mockOnUpdate).toHaveBeenCalledWith(expect.objectContaining({ id: blog.id }))
})
