import {Link} from 'gatsby'
import PropTypes from 'prop-types'
import React, {useContext, useState} from 'react'
import {
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  Button,
  Form,
  Collapse,
  NavItem,
  NavbarToggler,
} from 'reactstrap'

import {FirebaseContext} from 'gatsby-plugin-firebase'
import * as firebasePackage from 'firebase/app'
import UserContext from '../user-context'

const Header = ({siteTitle}) => {
  const firebase = useContext(FirebaseContext)
  const user = useContext(UserContext)

  function signIn() {
    const provider = new firebasePackage.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }

  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <header>
      <Navbar dark color="dark" expand="md">
        <Container className="text-warning">
          <NavbarBrand href="/">{siteTitle}</NavbarBrand>
          <NavbarToggler onClick={() => setIsExpanded(!isExpanded)} />
          <Collapse navbar isOpen={isExpanded}>
            <Nav navbar className="mr-auto">
              <NavItem>
                <Link to="/" className="nav-link" activeClassName="active">
                  dashboard
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to="/images"
                  className="nav-link"
                  activeClassName="active"
                >
                  image
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/log" className="nav-link" activeClassName="active">
                  logs
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/run" className="nav-link" activeClassName="active">
                  command
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
          <Form inline className="my-0">
            {user ? (
              <Button onClick={() => firebase.auth().signOut()}>
                <img src={user.photoUrl} width="20" height="20" /> Sign Out
              </Button>
            ) : (
              <Button onClick={() => signIn()}>Sign In</Button>
            )}
          </Form>
        </Container>
      </Navbar>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
