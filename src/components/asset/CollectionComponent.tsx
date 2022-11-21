import { Tab } from '@headlessui/react'
import { t } from 'i18next'
import { BaseCollectionInfo } from 'model/collection'
import React, { Fragment, useEffect, useState } from 'react'
import Http from 'services/http'
import Log from 'utils/log'
import AllItemsComponent from './AllItemsComponent'
import ChainInfoComponent from './ChainInfoComponent'
import CollectionActivity from './CollectionActivityComponent'

export default function CollectionComponent(props) {
  const { id, type } = props
  const [collection, setCollection] = useState<BaseCollectionInfo>()
  useEffect(() => {
    getNFTCollection()
  }, [id])

  function getNFTCollection() {
    Http.getInstance()
      .getNFTCollection(id)
      .then(response => {
        setCollection(response)
      })
      .catch(error => {
        Log.e(error)
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
              <p className="label">
                <>{t('COLLECTION_ITEMS')}</>
              </p>
            </div>
            <div className="item">
              <p className="value">{collection.stats.owner_number}</p>
              <p className="label">
                <>{t('COLLECTION_OWNERS')}</>
              </p>
            </div>
            <div className="item">
              <p className="value">{collection.stats.floor_price}</p>
              <p className="label">
                <>{t('FLOOR_PRICE')}</>
              </p>
            </div>
            <div className="item">
              <p className="value">{collection.stats.volume_all}</p>
              <p className="label">
                <>{t('COLLECTION_VAOLUME_TRADED')}</>
              </p>
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
            <Tab className="tab-item">
              <>{t('COLLECTION_ALL_ITEMS')}</>
            </Tab>
            <Tab className="tab-item ml-4">
              <>{t('COLLECTION_ACTIVITY')}</>
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <AllItemsComponent collectionId={collection.id} type={type} />
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
