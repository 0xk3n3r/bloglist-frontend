import Togglable from './Togglable'

const Blog = ({ blog }) => (
  <div>
    {blog.title} 
    <Togglable buttonLabel="view">
      <p>author: {blog.author}</p>
      <p>url: {blog.url} </p>
      <p>likes: {blog.likes}</p>
    </Togglable>
  </div>  
)

export default Blog