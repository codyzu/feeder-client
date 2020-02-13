import {Link} from 'gatsby'
import PropTypes from 'prop-types'
import React, {useContext} from 'react'
import {
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  Button,
  Form,
  NavLink,
  NavItem,
} from 'reactstrap'

import {FirebaseContext} from 'gatsby-plugin-firebase'
import * as firebasePackage from 'firebase/app'
import UserContext from '../user-context'
// import auth from "../firebase-auth"

const Header = ({siteTitle, ...props}) => {
  const firebase = useContext(FirebaseContext)
  const user = useContext(UserContext)

  function signIn() {
    const provider = new firebasePackage.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }

  return (
    <header>
      <Navbar light color="light" expand="xs">
        <Container>
          <NavbarBrand href="#">{siteTitle}</NavbarBrand>
          <Nav navbar className="mr-auto">
            <NavItem>
              <Link to="/" className="nav-link" activeClassName="active">
                Results
              </Link>
            </NavItem>
            {/* <Link to="/vote" className="nav-link" activeClassName="active">
              Vote
            </Link> */}
          </Nav>
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
