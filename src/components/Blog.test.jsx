import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

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