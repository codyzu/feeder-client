/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import {useStaticQuery, graphql} from 'gatsby'

import {Container, Row, Col} from 'reactstrap'
import Header from './Header'
import 'bootswatch/dist/materia/bootstrap.css' // eslint-disable-line import/no-unassigned-import
// import 'bootstrap/dist/css/bootstrap.css' // eslint-disable-line import/no-unassigned-import

const Layout = ({children}) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <Container className="mt-4">
        <main>{children}</main>
        <footer>
          <Row>
            <Col className="text-center">
              <p className="mb-0">
                © {new Date().getFullYear()} Cody Factory SARL
              </p>
              <p className="mt-0">
                <small>
                  Built with
                  {` `}
                  <a href="https://www.gatsbyjs.org">Gatsby</a>
                </small>
              </p>
            </Col>
          </Row>
        </footer>
      </Container>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
