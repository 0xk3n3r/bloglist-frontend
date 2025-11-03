const BlogForm = (props) => {

  return (
    <form onSubmit={(e) => {
        e.preventDefault()
        props.addblog({ title: props.title, author: props.author, url: props.url });
    }}>

      <h3>create new</h3>
      <div>
            title:
        <input
          placeholder="Title"
          value={props.title}
          onChange={props.handleTitlenameChange}
          name="title"
        />
      </div>

      <div>
            author:
        <input
          placeholder="Author"
          value={props.author}
          onChange={props.handleAuthorChange}
          name="author"
        />
      </div>

      <div>
            url:
        <input
          placeholder="URL"
          value={props.url}
          onChange={props.handleUrlnameChange}
          name="url"
        />
      </div>

      <button type="submit">save</button>
    </form>
  )
}

export default BlogForm