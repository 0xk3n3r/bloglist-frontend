import Togglable from './Togglable'

const Blog = ({ blog }) => {
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
        <p>likes: {blog.likes}</p>
      </Togglable>
    </div>
  </div>
)}

export default Blog