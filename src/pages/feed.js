import React from 'react'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import {Row, Col, Button} from 'reactstrap'

const Feed = () => (
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
        <Button size="lg">
          <span className="my-3">Feed Large</span>
        </Button>
      </Col>
    </Row>
    <Row className="my-3">
      <Col className="text-center">
        <Button>Feed Medium</Button>
      </Col>
    </Row>
    <Row className="my-3">
      <Col className="text-center">
        <Button size="sm">Feed Small</Button>
      </Col>
    </Row>
  </Layout>
)

export default Feed
