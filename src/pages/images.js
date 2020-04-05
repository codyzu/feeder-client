import React, {useContext, useEffect, useState} from 'react'
import {FirebaseContext} from 'gatsby-plugin-firebase'

import {Row, Col, CustomInput, Badge} from 'reactstrap'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import userContext from '../user-context'

const Dashboard = () => {
  const firebase = useContext(FirebaseContext)
  const user = useContext(userContext)

  const [storagePath, setStoragePath] = useState()

  useEffect(() => {
    if (user === null) {
      return
    }

    return firebase
      .firestore()
      .collection('feeders')
      .doc('JyovyYPghJcb4coroPYsT0LFfbq1')
      .onSnapshot(doc => {
        setStoragePath(doc.data().lastImage)
      })
  }, [firebase, user])

  const [imageSrc, setImageSrc] = useState()

  useEffect(() => {
    if (storagePath === undefined) {
      return
    }

    updateImage()

    async function updateImage() {
      const url = await firebase
        .storage()
        .ref(storagePath)
        .getDownloadURL()
      setImageSrc(url)
    }
  }, [firebase, storagePath])

  console.log('IMAGE:', storagePath)

  const [isLive, setIsLive] = useState(undefined)

  useEffect(() => {
    getLiveState()

    async function getLiveState() {
      if (firebase === null) {
        return
      }

      // Get the current state of the live stream from the DB
      const doc = await firebase
        .firestore()
        .collection('jobsSchedule')
        .doc('imageStream')
        .get()
      setIsLive(doc.data().isEnabled)
    }
  }, [firebase])

  // Async function watchUserDocume

  return (
    <Layout>
      <Seo title="Image Stream" />
      <Row className="mb-4">
        <Col className="text-center">
          <h1>Image Stream</h1>
        </Col>
      </Row>
      <Row>
        <Col xs="auto" className="h2 ml-auto">
          <Badge color={isLive ? 'danger' : 'secondary'}>Live</Badge>
        </Col>
        <Col xs="auto" className="text-right mr-auto">
          <CustomInput
            type="switch"
            id="exampleCustomSwitch"
            name="customSwitch"
            label="Live Stream"
            checked={isLive === true}
            onChange={() => toggleLive()}
          />
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          {imageSrc === undefined ? (
            'Loading...'
          ) : (
            <img className="vh-100 mw-100" src={imageSrc} />
          )}
        </Col>
      </Row>
    </Layout>
  )

  async function toggleLive() {
    console.log('From:', isLive, 'To:', !isLive)
    setIsLive(!isLive)
    await firebase
      .firestore()
      .collection('jobsSchedule')
      .doc('imageStream')
      .update({isEnabled: !isLive})
  }
}

export default Dashboard
