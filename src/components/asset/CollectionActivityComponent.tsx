import React, { useEffect } from 'react'
import Http from 'services/http'

export default function CollectionActivity(props) {
  const { collectionId } = props
  useEffect(() => {
    Http.getInstance()
      .getNFTActivity(collectionId, 1)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  })
  return <div>CollectionActivity</div>
}
