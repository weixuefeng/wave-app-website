import { CollectionInfo } from 'model/collection'
import React, { useEffect, useState } from 'react'
import Http from 'services/http'
import ChainInfoComponent from './ChainInfoComponent'

export default function CollectionComponent(props) {
  const { id } = props
  const [collection, setCollection] = useState<CollectionInfo>()
  useEffect(() => {
    getNFTCollection()
  }, [id])

  function getNFTCollection() {
    Http.getInstance()
      .getNFTCollection(id)
      .then(response => {
        console.log(response)
        setCollection(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  if (!id || !collection) {
    return <></>
  }

  return (
    <div className="nft-collection">
      <div className="base-info">
        <img src={collection.image} alt={collection.name} />
        <div className="content">
          <h2>{collection.name}</h2>
          <div className="status">
            <div className="item">
              <p className="value">{collection.stats.item_number}</p>
              <p className="label">Items</p>
            </div>
            <div className="item">
              <p className="value">{collection.stats.owner_number}</p>
              <p className="label">Owners</p>
            </div>
            <div className="item">
              <p className="value">{collection.stats.floor_price}</p>
              <p className="label">Floor Price</p>
            </div>
            <div className="item">
              <p className="value">{collection.stats.volume_all}</p>
              <p className="label">Volume Traded</p>
            </div>
          </div>

          <div className="chain-info">
          <ChainInfoComponent
            address={""}
            tokenStandard={""}
            blockChain={""}
            creatorEariningPercent={""}
          />
          </div>
        </div>
      </div>

      <div className="related-info">
        <div className="tab"></div>
      </div>
    </div>
  )
}
