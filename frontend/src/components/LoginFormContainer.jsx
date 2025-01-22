//Login form container component. for detemining if info text, login form or register form is shown for user
//dependencies
import PropTypes from 'prop-types'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import TextTyper from './TextTyper'
import { Button } from 'react-bootstrap'

const LoginFormContainer = ({
  //props
  loginVisible,
  setLoginVisible,
  registerVisible,
  setRegisterVisible,
}) => {
  /*TODO refactor style to .css file*/

  const cancelButton = {
    marginBottom: 30,
    marginTop: 10,
    marginLeft: 60,
  }

  //display styles for showing or not showing forms
  const hideWhenVisible = {
    display: loginVisible || registerVisible ? 'none' : '',
  }
  const showWhenVisible = {
    display: loginVisible || registerVisible ? '' : 'none',
  }

  // rendering one of the forms or info text (info text is default)
  return (
    <div>
      <div style={hideWhenVisible}>
        <TextTyper />
      </div>
      <div style={showWhenVisible}>
        {loginVisible && <LoginForm />}
        {registerVisible && (
          <RegisterForm
            setLoginVisible={setLoginVisible}
            setRegisterVisible={setRegisterVisible}
          />
        )}
        {loginVisible && (
          <Button
            variant="primary"
            className="button-primary delButton cancelButton"
            style={cancelButton}
            onClick={() => setLoginVisible(false)}
          >
            Cancel
          </Button>
        )}
        {registerVisible && (
          <Button
            variant="primary"
            className="button-primary delButton cancelButton"
            style={cancelButton}
            onClick={() => setRegisterVisible(false)}
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  )
}

//proptypes check
LoginFormContainer.propTypes = {
  loginVisible: PropTypes.bool.isRequired,
  setLoginVisible: PropTypes.func.isRequired,
  registerVisible: PropTypes.bool.isRequired,
  setRegisterVisible: PropTypes.func.isRequired,
}

export default LoginFormContainer
