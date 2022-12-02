/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 16:47:08
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-12-02 20:28:15
 * @FilePath: /wave-app-webiste/src/components/asset/CollectionActivityComponent.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import LoadMoreComponent from 'components/layout/LoadMoreComponent'
import usePagination from 'hooks/usePagination'
import { CollectionActivitiesItem } from 'model/asset'
import React, { useRef } from 'react'
import Http from 'services/http'
import { floorNum, trimStr } from 'utils/functions'
import { formatDate } from 'utils/time'

export default function CollectionActivity(props) {
  const { collectionId } = props
  const ref = useRef(null)
  const { hasMore, isLoading, currentPage, data, error } = usePagination<CollectionActivitiesItem>(ref, fetchData)

  function fetchData(page) {
    return Http.getInstance().getNFTActivity(collectionId, page)
  }

  return (
    <>
      <div className="collection-activity">
        {data && data?.map((item, index) => {
          return (
            <div className="item" key={index}>
              <div className="event">{item.event}</div>
              <div className="info">
                <div>
                  <img src={item.nft.image} alt={item.nft.name} />
                </div>
                <h3>{item.nft.name}</h3>
              </div>
              <div className="price">{floorNum(item.price)} NEW</div>
              <div className="trading">
                <div className="form">
                  <img src={item.from_user.avatar == '' ? '/assets/image/icon_avata.png' : item.from_user.avatar} alt="avatar" />
                </div>
                <h4>{trimStr(item.from_user.name)}</h4>
                <div className="arrow">
                  <img src="/assets/image/icon_arrow.png" alt="arrow-img" />
                </div>
                <div className="to">
                  <img src={item.to_user.avatar == '' ? '/assets/image/icon_avata.png' : item.to_user.avatar} alt="avatar" />
                </div>
                <h4>{trimStr(item.to_user.name)}</h4>
              </div>
              <div className="date">{formatDate(item.activity_time)}</div>
            </div>
          )
        })}
      </div>
      <div ref={ref}>
        <LoadMoreComponent currentPage={currentPage} hasMore={hasMore} isLoading={isLoading} data={data} />
      </div>
    </>
  )
}
