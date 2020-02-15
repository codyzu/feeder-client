import React, {useContext} from 'react'
import {FirebaseContext} from 'gatsby-plugin-firebase'

import {Row, Col, Button} from 'reactstrap'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import runCommand from '../commands'

const Feed = () => {
  const firebase = useContext(FirebaseContext)

  return (
    <Layout>
      <Seo title="Feed" />
      <Row>
        <Col className="text-center">
          <h1>Feed the cat 🐈</h1>
          <p>Welcome to your new Gatsby site.</p>
          <p>Now go build something great.</p>
        </Col>
      </Row>
      <Row className="my-3">
        <Col className="text-center">
          <Button
            size="lg"
            onClick={() =>
              runCommand(firebase, {
                command: 'feed',
                options: {speed: 400, isForward: true, duration: 3000},
              })
            }
          >
            <span className="my-3">Feed Large</span>
          </Button>
        </Col>
      </Row>
      <Row className="my-3">
        <Col className="text-center">
          <Button
            onClick={() =>
              runCommand(firebase, {
                command: 'feed',
                options: {speed: 400, isForward: true, duration: 2000},
              })
            }
          >
            Feed Medium
          </Button>
        </Col>
      </Row>
      <Row className="my-3">
        <Col className="text-center">
          <Button
            size="sm"
            onClick={() =>
              runCommand(firebase, {
                command: 'feed',
                options: {speed: 400, isForward: true, duration: 1000},
              })
            }
          >
            Feed Small
          </Button>
        </Col>
      </Row>
    </Layout>
  )
}

export default Feed
