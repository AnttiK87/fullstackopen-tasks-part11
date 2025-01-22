//component for rendering form for logging in
//dependencies
import { useSelector, useDispatch } from 'react-redux'
import { setUsername, setPassword } from '../reducers/userReducer.js'
import useLogin from '../hooks/useLogin.js'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  //set dispatch
  const dispatch = useDispatch()

  // Get username and password state
  const username = useSelector((state) => state.user.username)
  const password = useSelector((state) => state.user.password)

  // get handleLogin
  const { handleLogin } = useLogin()

  /*TODO refactor style to .css file*/

  const marginBottom = {
    marginBottom: 20,
  }

  // rendering the form
  return (
    <div className="marginLogin">
      <h2 style={marginBottom}>Login</h2>

      <Form onSubmit={handleLogin}>
        <div className="form__group">
          <input
            className="form__field"
            id="username"
            data-testid="username"
            type="text"
            value={username}
            onChange={(event) => dispatch(setUsername(event.target.value))}
            placeholder="USERNAME"
          />
          <label htmlFor="username" className="form__label">
            Username
          </label>
        </div>
        <div className="form__group">
          <input
            className="form__field"
            id="password"
            data-testid="password"
            type="password"
            value={password}
            onChange={(event) => dispatch(setPassword(event.target.value))}
            placeholder="PASSWORD"
          />
          <label
            style={marginBottom}
            htmlFor="username"
            className="form__label"
          >
            Password{' '}
          </label>
        </div>
        <Button name="login" className="button-primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
