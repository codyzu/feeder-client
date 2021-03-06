import React, {useContext} from 'react'
import {FirebaseContext} from 'gatsby-plugin-firebase'

import {Row, Col, Button} from 'reactstrap'
import {FaCat, FaCogs, FaPowerOff, FaVideo, FaHandPaper} from 'react-icons/fa'
import {IoMdRefresh} from 'react-icons/io'
import {MdAddAPhoto} from 'react-icons/md'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import runCommand from '../commands'
import CommandCard from '../components/CommandCard'
import ConfirmButton from '../components/ConfirmButton'

const Dashboard = () => {
  const firebase = useContext(FirebaseContext)

  return (
    <Layout>
      <Seo title="Dashboard" />
      <Row className="mb-4">
        <Col className="text-center">
          <h1>Dashboard</h1>
        </Col>
      </Row>
      <Row xs="1" md="2" xl="3">
        <CommandCard
          HeaderIcon={FaCat}
          headerText="Feed"
          commands={[
            <Button
              key="big-feed"
              className="w-100"
              size="lg"
              onClick={() =>
                runCommand(firebase, {
                  command: 'feed',
                  options: {speed: 400, isForward: true, duration: 3000},
                })
              }
            >
              <FaCat className="mr-2" size="2em" />
              <FaCat className="mr-2" size="2em" />
              Big
            </Button>,
            <Button
              key="small-feed"
              className="w-100"
              size="lg"
              onClick={() =>
                runCommand(firebase, {
                  command: 'feed',
                  options: {speed: 400, isForward: true, duration: 1000},
                })
              }
            >
              <FaCat className="mr-2" />
              Small
            </Button>,
          ]}
        />
        <CommandCard
          HeaderIcon={FaVideo}
          headerText="Image"
          commands={[
            <Button
              key="image"
              className="w-100"
              size="lg"
              onClick={() => runCommand(firebase, {command: 'image'})}
            >
              <MdAddAPhoto className="mr-2" />
              Capture Image
            </Button>,
          ]}
        />
        <CommandCard
          HeaderIcon={FaCogs}
          headerText="Admin"
          commands={[
            <Button
              key="wave"
              className="w-100"
              size="lg"
              onClick={() => runCommand(firebase, {command: 'wave'})}
            >
              <FaHandPaper className="mr-2" />
              Wave
            </Button>,
            <ConfirmButton
              key="restart daemon"
              className="w-100"
              size="lg"
              onClick={() => runCommand(firebase, {command: 'exit'})}
            >
              <IoMdRefresh className="mr-2" />
              Restart Daemon
            </ConfirmButton>,
            <ConfirmButton
              key="reboot system"
              className="w-100"
              size="lg"
              onClick={() => runCommand(firebase, {command: 'reboot'})}
            >
              <IoMdRefresh className="mr-2" />
              Reboot System
            </ConfirmButton>,
            <ConfirmButton
              key="shutdown"
              className="w-100"
              size="lg"
              onClick={() => runCommand(firebase, {command: 'shutdown'})}
            >
              <FaPowerOff className="mr-2" />
              Shutdown System
            </ConfirmButton>,
          ]}
        />
      </Row>
    </Layout>
  )
}

export default Dashboard
