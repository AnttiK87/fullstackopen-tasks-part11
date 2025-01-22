//Navigation bar component
//dependencies
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useLogout from '../hooks/useLogout'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

//
const Menu = ({ /*props*/ setLoginVisible, setRegisterVisible }) => {
  /*TODO refactor style to .css file*/
  const containerStyle = {
    backgroundColor: '#0077B6',
    padding: 20,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    minHeight: 100,
  }

  const containerStyle2 = {
    backgroundColor: '#0077B6',
    padding: 20,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    minHeight: 100,
  }

  const containerStyle3 = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  }

  const nameAndButtonStyle = {
    marginLeft: 'auto',
    marginRight: 0,
    color: 'white',
  }

  const padding = {
    padding: '0 10px 0 10px',
  }

  const noMargin = {
    margin: 0,
    marginLeft: 10,
  }

  const border = {
    borderLeft: '1px solid white',
  }

  const marginRight = {
    marginRight: 25,
  }

  //set navigate
  const navigate = useNavigate()
  //get user state
  const user = useSelector((state) => state.user.user)
  // get handleLogout
  const { handleLogout } = useLogout()

  //show login and register buttons on navbar if user is not logged in
  if (!user) {
    return (
      <Navbar style={containerStyle2} collapseOnSelect expand="lg">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="nav-container2 mr-auto">
            <Nav.Link href="#" as="span">
              <button
                style={padding}
                name="openLogin"
                className="button-as-link"
                onClick={() => {
                  navigate('/')
                  setRegisterVisible(false)
                  setLoginVisible(true)
                }}
              >
                Login
              </button>
            </Nav.Link>
            <div className="lines2">
              <Nav.Link href="#" as="span">
                <button
                  style={padding}
                  className="button-as-link lines"
                  onClick={() => {
                    navigate('/')
                    setRegisterVisible(true)
                    setLoginVisible(false)
                  }}
                >
                  Register
                </button>
              </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }

  //render navbar resposive navbar with bootstrap
  return (
    <Navbar style={containerStyle} collapseOnSelect expand="lg">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="nav-container mr-auto">
          <Nav.Link href="#" as="span">
            <Link className="button-as-link" style={padding} to="/">
              Home
            </Link>
          </Nav.Link>
          <div className="lines">
            <Nav.Link href="#" as="span">
              <Link className="button-as-link" style={padding} to="/users">
                Users
              </Link>
            </Nav.Link>
          </div>
          <Nav.Link href="#" as="span">
            <Link
              className="button-as-link"
              style={padding}
              to={`/users/${user.id}`}
            >
              Own profile
            </Link>
          </Nav.Link>
          <Nav.Link style={nameAndButtonStyle} href="#" as="span">
            <div style={containerStyle3}>
              <div style={marginRight}>{user.name} is logged in.</div>
              <Button
                style={(noMargin, border)}
                variant="primary"
                className="button-as-link"
                onClick={handleLogout}
                type="submit"
              >
                Logout
              </Button>
            </div>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

//proptypes check
Menu.propTypes = {
  setLoginVisible: PropTypes.func.isRequired,
  setRegisterVisible: PropTypes.func.isRequired,
}

//export
export default Menu
