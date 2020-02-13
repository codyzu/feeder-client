import React, {useContext, useState, useEffect} from 'react'
import {Link} from 'gatsby'
import {Table, Row} from 'reactstrap'
import {DateTime} from 'luxon'
import {useFirebase} from 'gatsby-plugin-firebase'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import UserContext from '../user-context'
// import firestore from "../firebase-firestore"

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
        .collection('commands')
        .orderBy('createdAt')
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
              <th>command</th>
              <th>created</th>
              <th>completed</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {logData.map(({id, data}) => {
              const isPending = data.isPending === true
              const isExpired = data.isExpired === true
              const isError = data.error !== undefined
              const isSuccess = data.isSuccess === true
              const status = isPending
                ? 'pending'
                : isExpired
                ? `expired: ${
                    data.expiresAt
                      ? DateTime.fromJSDate(
                          data.expiresAt.toDate()
                        ).toLocaleString(DateTime.DATETIME_SHORT)
                      : ''
                  }`
                : isError
                ? data.error
                : 'success'

              const textClass = isExpired
                ? 'text-warning'
                : isError
                ? 'text-danger'
                : isSuccess
                ? 'text-success'
                : ''

              return (
                <tr key={id} className={textClass}>
                  <td>{data.command}</td>
                  <td>
                    {DateTime.fromJSDate(
                      data.createdAt.toDate()
                    ).toLocaleString(DateTime.DATETIME_SHORT)}
                  </td>
                  <td>
                    {data.doneAt &&
                      DateTime.fromJSDate(data.doneAt.toDate()).toLocaleString(
                        DateTime.DATETIME_SHORT
                      )}
                  </td>
                  <td>{status}</td>
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
