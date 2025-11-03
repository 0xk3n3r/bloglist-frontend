
const LoginForm = (props) => {
  return (
    <>
      <h2>Log into BlogApp:</h2>
      <form onSubmit={(e) => { e.preventDefault(); props.handleLogin() }}>
        <div>
          username
          <input
            value={props.username}
            onChange={props.handleUsernameChange}
            name="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={props.password}
            onChange={props.handlePasswordChange}
            name="password"
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm