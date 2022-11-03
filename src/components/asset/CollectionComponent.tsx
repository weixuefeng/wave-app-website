import { Tab } from '@headlessui/react'
import { CollectionInfo } from 'model/collection'
import React, { Fragment, useEffect, useState } from 'react'
import Http from 'services/http'
import AllItemsComponent from './AllItemsComponent'
import ChainInfoComponent from './ChainInfoComponent'
import CollectionActivity from './CollectionActivityComponent'

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
          <div className="mt-4 p-4">
            <ChainInfoComponent address={''} tokenStandard={''} blockChain={''} creatorEariningPercent={''} />
          </div>
        </div>
      </div>

      <div className="related-info">
        <Tab.Group>
          <Tab.List>
            <Tab className="tab-item">All Items</Tab>
            <Tab className="tab-item ml-4">Activities</Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <AllItemsComponent collectionId={collection.id} />
            </Tab.Panel>
            <Tab.Panel>
              <CollectionActivity collectionId={collection.id} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}
