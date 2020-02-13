import React, {useState} from 'react'
import {useFirebase} from 'gatsby-plugin-firebase'
import UserContext from '../user-context'

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null) // eslint-disable-line react-hooks/rules-of-hooks

  console.log("I'm here")
  useFirebase(
    firebase => {
      console.log('FIREBASE:', firebase)
      return firebase.auth().onAuthStateChanged(user => {
        console.log('USER:', user)
        if (user === null) {
          setUser(user)
          return
        }

        setUser({
          email: user.email,
          photoUrl: user.photoURL,
          uid: user.uid,
          displayName: user.displayName,
        })
      })
    },
    [setUser]
  )

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export default UserProvider
