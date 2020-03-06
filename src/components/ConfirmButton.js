import React, {useEffect, useState} from 'react'
import {Button} from 'reactstrap'

const ConfirmButton = ({onClick = () => undefined, ...props}) => {
  const [timeoutId, setTimeoutId] = useState(null)

  useEffect(
    () => () => {
      if (timeoutId === null) {
        return
      }

      clearTimeout(timeoutId)
    },
    [timeoutId]
  )

  function toggle() {
    if (timeoutId === null) {
      setTimeoutId(setTimeout(() => setTimeoutId(null), 2000))
      return
    }

    clearTimeout(timeoutId)
    setTimeoutId(null)
    onClick()
  }

  return (
    <Button
      color={timeoutId === null ? 'secondary' : 'danger'}
      onClick={toggle}
      {...props}
    />
  )
}

export default ConfirmButton
