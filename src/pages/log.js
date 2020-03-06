import React, {useContext, useState} from 'react'
import {Link} from 'gatsby'
import {Table, Row} from 'reactstrap'
import {DateTime} from 'luxon'
import {useFirebase} from 'gatsby-plugin-firebase'
import ReactJson from 'react-json-view'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import UserContext from '../user-context'
// Import firestore from "../firebase-firestore"

const LogPage = () => {
  const user = useContext(UserContext)
  const [logData, setLogData] = useState([])
  useFirebase(
    firebase => {
      if (user === null) {
        setLogData([])
        return
      }

      return firebase
        .firestore()
        .collection('jobs')
        .orderBy('createdAt', 'desc')
        .limit(20)
        .onSnapshot(snapshots => {
          setLogData(
            snapshots.docs.map(snapshot => ({
              data: snapshot.data(),
              id: snapshot.id,
            }))
          )
        })
    },
    [user]
  )

  console.log('DATA:', logData)

  return (
    <Layout>
      <Seo title="Command Log" />
      <Row>
        <h1>Command Log</h1>
        <Table>
          <thead>
            <tr>
              <th className="w-auto">command</th>
              <th>created</th>
              <th>completed</th>
              <th>status</th>
              <th>options</th>
            </tr>
          </thead>
          <tbody>
            {logData.map(({id, data}) => {
              const {
                isPending,
                isExpired,
                error,
                isSuccess,
                expiresAt,
                createdAt,
                doneAt,
                command,
                ...other
              } = data

              const status =
                isPending === true
                  ? 'pending'
                  : isExpired === true
                  ? `expired: ${
                      expiresAt === undefined
                        ? ''
                        : DateTime.fromJSDate(
                            expiresAt.toDate()
                          ).toLocaleString(DateTime.DATETIME_SHORT)
                    }`
                  : error === undefined
                  ? 'success'
                  : error

              const textClass =
                isExpired === true
                  ? 'text-warning'
                  : isSuccess === true
                  ? 'text-success'
                  : error === undefined
                  ? ''
                  : 'text-danger'

              return (
                <tr key={id} className={textClass}>
                  <td>{command}</td>
                  <td>
                    {DateTime.fromJSDate(createdAt.toDate()).toLocaleString(
                      DateTime.DATETIME_SHORT
                    )}
                  </td>
                  <td>
                    {data.doneAt &&
                      DateTime.fromJSDate(doneAt.toDate()).toLocaleString(
                        DateTime.DATETIME_SHORT
                      )}
                  </td>
                  <td>{status}</td>
                  <td>
                    <ReactJson
                      src={other}
                      collapsed
                      name={false}
                      displayDataTypes={false}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <Link to="/page-2/">Go to page 2</Link>
      </Row>
    </Layout>
  )
}

export default LogPage
