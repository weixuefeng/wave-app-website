import React, { useEffect } from 'react'
import Http from 'services/http'

export default function AllItemsComponent(props) {
  const { collectionId } = props
  useEffect(() => {
    Http.getInstance().getNFTList(collectionId, 1)
    .then((response) => {
      console.log(response);
      
    })
    .catch((error) => {
      console.log(error);
      
    })
  })
  return (
    <div>AllItemsComponent</div>
  )
}
