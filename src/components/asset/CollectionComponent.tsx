import { CollectionInfo } from 'model/collection'
import React, { useEffect, useState } from 'react'
import Http from 'services/http'

export default function CollectionComponent(props) {
  const { id } = props
  const [collection, setCollection] = useState<CollectionInfo>()
  useEffect(() => {
    getNFTCollection()
  }, [id])

  function getNFTCollection() {
    Http.getInstance().getNFTCollection(id)
    .then((response) => {
      console.log(response);
      setCollection(response)
      
    }).catch((error) => {
      console.log(error);
      
    })
  }

  if(!id || !collection) {
    return <></>
  }

  return (
    <div className="nft-collection">

      <div className="base-info">
        <img src={collection.image} alt={collection.name}/>
        <div className="content">
          <h2>{collection.name}</h2>
          <div className="status">
            <div className="item">
              <p>{collection.stats.item_number}</p>
              <p>Items</p>
            </div>
            <div className="item">
              <p>{collection.stats.owner_number}</p>
              <p>Owners</p>
            </div>
            <div className="item">
              <p>{collection.stats.floor_price}</p>
              <p>Floor Price</p>
            </div>
            <div className="item">
              <p>{collection.stats.volume_all}</p>
              <p>Volume Traded</p>
            </div>
          </div>
        </div>
      </div>


      <div className="related-info">
        <div className="tab">

        </div>
      </div>
    </div>
  )
}
