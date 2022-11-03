/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 16:47:08
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-03 20:15:59
 * @FilePath: /wave-app-webiste/src/components/asset/CollectionActivityComponent.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { CollectionActivities } from 'model/asset'
import React, { useEffect, useState } from 'react'
import Http from 'services/http'
import { trimStr } from 'utils/functions'
import { formatDate } from 'utils/time'

export default function CollectionActivity(props) {
  const { collectionId } = props
  const [activity, setActivity] = useState<Array<CollectionActivities>>([])
  useEffect(() => {
    Http.getInstance()
      .getNFTActivity(collectionId, 1)
      .then(response => {
        setActivity(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <div className="collection-activity">
      {activity?.map((item, index) => {
        return (
          <div className="item" key={index}>
            <div className="event">{item.event}</div>
            <div className="info">
              <div>
                <img src={item.from_user.avatar} alt="" />
              </div>
              <h3>Remembering 1950 #1</h3>
            </div>
            <div className="price">230,000 NEW</div>
            <div className="trading">
              <div className="form">
                <img src={item.from_user.avatar} alt="" />
              </div>
              <h4>{trimStr(item.from_user.name)}</h4>
              <div className="arrow">
                <img src="/assets/image/icon_arrow.png" alt="arrow-img" />
              </div>
              <div className="to">
                <img src={item.to_user.avatar} alt="" />
              </div>
              <h4>{item.to_user.name}</h4>
            </div>
            <div className="date">{formatDate(item.activity_time)}</div>
          </div>
        )
      })}
    </div>
  )
}
