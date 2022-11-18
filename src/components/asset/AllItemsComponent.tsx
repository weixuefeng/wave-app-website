/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 15:46:58
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-18 20:09:32
 * @FilePath: /wave-app-website/src/components/asset/AllItemsComponent.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import LoadMoreComponent from 'components/layout/LoadMoreComponent'
import usePagination from 'hooks/usePagination'
import { t } from 'i18next'
import { CollectionAllItem } from 'model/collection'
import Link from 'next/link'
import React, { useRef } from 'react'
import Http from 'services/http'
import { floorNum } from 'utils/functions'
import { getAssetDetailPathByInfo } from 'utils/route'

export default function AllItemsComponent(props) {
  const { collectionId, type } = props
  const ref = useRef(null)

  const { hasMore, isLoading, currentPage, data, error } = usePagination<CollectionAllItem>(ref, fetchData)

  function fetchData() {
    return Http.getInstance().getNFTList(collectionId, currentPage)
  }

  return (
    <div className="asset">
      <div className="container mx-auto">
        <ul className="all-item">
          {data?.map((item, index) => {
            return (
              <li className="item" key={index}>
                <Link href={getAssetDetailPathByInfo(type, item.nft_id)}>
                  <a href="" className="cover">
                    <div className="perfect-square">
                      <img src={item.image} alt="img" />
                    </div>
                    <div className="collection-name">
                      <h3>{item.name}</h3>
                      <h4>{floorNum(item.highest_bid_price)} NEW</h4>
                      <p className="price">
                        <span><>{t('LIST_PRICE')}</>List Price</span>
                        <span><>{t('FLOOR_DIFFERENCE')}</></span>
                      </p>
                      <p className="gains">
                        <span className="left">--</span>
                        <span className="right">--</span>
                      </p>
                    </div>
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
        <div ref={ref}>
          <LoadMoreComponent currentPage={currentPage} hasMore={hasMore} isLoading={isLoading} data={data} />
        </div>
      </div>
    </div>
  )
}
