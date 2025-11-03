const BlogForm = (props) => {

  return (
    <form onSubmit={(e) => { e.preventDefault(); props.addblog(); }}>
        <h3>create new</h3>
            <div>
            title:
            <input
                value={props.title}
                onChange={props.handleTitlenameChange}
                name="title"
            />
            </div>

            <div>
            author:
            <input
                value={props.author}
                onChange={props.handleAuthorChange}
                name="author"
            />
            </div>

            <div>
            url:
            <input
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