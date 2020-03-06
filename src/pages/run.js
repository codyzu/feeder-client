import React, {useContext, useState} from 'react'
import {Link} from 'gatsby'
import {Field, Form as FormikForm, Formik} from 'formik'
import {
  Form,
  FormGroup,
  Row,
  Col,
  Label,
  Button,
  Input,
  FormFeedback,
  Alert,
} from 'reactstrap'
// Import {ReactstrapInput} from "reactstrap-formik"
// import {DateTime} from 'luxon'
import * as Yup from 'yup'
import {FirebaseContext} from 'gatsby-plugin-firebase'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import runCommand from '../commands'
// Import UserContext from '../user-context'
// import firestore from '../firebase-firestore'
// import ReactstarpFormikInput from "reactstrap-formik/dist/ReactstrapFormikInput"

const commandSchema = Yup.object().shape({
  command: Yup.string().required(),
  options: Yup.string().test(
    'is JSON serializable',
    '${path} is not serializable to JSON',
    value => {
      console.log('TESTING:', value)
      try {
        JSON.parse(value)
        return true
      } catch {
        return false
      }
    }
  ),
})

const RunPage = () => {
  const firebase = useContext(FirebaseContext)
  const [alert, setAlert] = useState({})

  async function submitCommand({command, options: optionsString}, {resetForm}) {
    try {
      const options = JSON.parse(optionsString)

      // Const commandData = {
      //   command,
      //   options,
      //   isPending: true,
      //   createdAt: new Date(),
      //   expiresAt: DateTime.local()
      //     .plus({minutes: 10})
      //     .toJSDate(),
      // }

      // console.log('WRITING:', commandData)

      // await firebase
      //   .firestore()
      //   .collection('commands')
      //   .doc()
      //   .set(commandData)

      await runCommand(firebase, {command, options})
      resetForm()

      setAlert({
        message: 'Command sent successfully',
        visible: true,
        success: true,
      })
    } catch (error) {
      setAlert({
        message: error.message,
        visible: true,
        success: false,
      })
    }
  }

  return (
    <Layout>
      <Seo title="Run Command" />
      <Row className="mb-4">
        <Col className="text-center">
          <h1>Run</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Alert
            isOpen={alert.visible === true}
            color={alert.success ? 'success' : 'danger'}
            toggle={() => setAlert({...alert, visible: false})}
          >
            {alert.message}
          </Alert>
        </Col>
      </Row>
      <Formik
        initialValues={{command: 'feed', options: '{}'}}
        validationSchema={commandSchema}
        onSubmit={submitCommand}
      >
        {({errors, isValid}) => (
          <Form tag={FormikForm}>
            <FormGroup row>
              <Label for="command" sm={2}>
                Command
              </Label>
              <Col sm={10}>
                <Field
                  type="text"
                  name="command"
                  id="command"
                  as={Input}
                  invalid={errors.command}
                />
                <FormFeedback>{errors.command}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="options" sm={2}>
                Options
              </Label>
              <Col sm={10}>
                <Field
                  type="textarea"
                  name="options"
                  id="options"
                  as={Input}
                  invalid={errors.options}
                />
                <FormFeedback>{errors.options}</FormFeedback>
              </Col>
            </FormGroup>
            {/* <FormGroup row>
              <Label for="speed" sm={2}>
                Choose
              </Label>
              <Col sm={10}>
                <Input name="speed" type="range"></Input>
              </Col>
            </FormGroup> */}
            <FormGroup check row>
              <Col sm={{offset: 2}}>
                <Button type="submit" disabled={!isValid}>
                  Submit
                </Button>
              </Col>
            </FormGroup>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default RunPage
