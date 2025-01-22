//component for rendering form for registering new user
//dependencies
import { useDispatch } from 'react-redux'
import { createUser } from '../reducers/userReducer.js'
import { Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const RegisterForm = ({ /*props*/ setLoginVisible, setRegisterVisible }) => {
  /*TODO refactor style to .css file*/
  const marginBottom = {
    marginBottom: 20,
  }

  //set dispatch
  const dispatch = useDispatch()

  //function for sending form content and calling creteBlog
  const addUser = async (event) => {
    event.preventDefault()

    const { username, name, password } = event.target

    const user = {
      username: username.value,
      name: name.value,
      password: password.value,
    }

    // check if creating of user were succesful
    const success = await dispatch(createUser(user))

    //show log in screen if registration were completed
    if (success) {
      setLoginVisible(true)
      setRegisterVisible(false)
      event.target.reset()
    } else {
      //handle error
      console.error('User creation failed')
    }
  }

  // rendering registration form
  return (
    <div className="marginLogin">
      <h2 style={marginBottom}>Register new user</h2>

      <Form onSubmit={addUser}>
        <div className="form__group">
          <input
            className="form__field"
            id="username"
            data-testid="username"
            type="text"
            name="username"
            placeholder="USERNAME"
            required
            minLength="3"
          />
          <label htmlFor="username" className="form__label">
            Username
          </label>
        </div>
        <div className="form__group">
          <input
            className="form__field"
            id="name"
            data-testid="name"
            type="text"
            name="name"
            placeholder="NAME"
            required
          />
          <label htmlFor="name" className="form__label">
            Name
          </label>
        </div>
        <div className="form__group">
          <input
            className="form__field"
            id="password"
            data-testid="password"
            type="password"
            placeholder="PASSWORD"
            required
            minLength="3"
          />
          <label
            style={marginBottom}
            htmlFor="password"
            className="form__label"
          >
            Password
          </label>
        </div>
        <Button variant="primary" className="button-primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  )
}

//proptypes check
RegisterForm.propTypes = {
  setLoginVisible: PropTypes.func.isRequired,
  setRegisterVisible: PropTypes.func.isRequired,
}

export default RegisterForm
