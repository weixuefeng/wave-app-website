import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from 'reducer/userReducer'

export default function UserComponent() {
  const currentUser = useSelector(selectUser)

  if (!currentUser) {
    return <div>no user info</div>
  } else {
    return <div>{currentUser.name}</div>
  }
}
