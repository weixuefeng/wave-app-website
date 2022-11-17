/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-16 18:35:19
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-17 20:39:55
 * @FilePath: /wave-app-webiste/src/pages/notification.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import LoadMoreComponent from 'components/layout/LoadMoreComponent'
import NormalLayout from 'components/layout/NormalLayout'
import MessageComponent from 'components/message/MessageComponent'
import usePagination from 'hooks/usePagination'
import { MessageList } from 'model/message'
import { PageModel } from 'model/navModel'
import React, { useRef } from 'react'
import Http from 'services/http'

export default function Message() {
  let pageModel = new PageModel('Notification', 'WAVE', '')

  const ref = useRef(null)

  const { hasMore, isLoading, currentPage, data, error } = usePagination<MessageList>(ref, fetchData)

  function fetchData() {
    return Http.getInstance().getMessageList(0, currentPage)
  }

  function content() {
    return (
      <div className="message">
        <div className="container">
          <ul className="message-itme">
            {data?.map((item, index) => {
              return <MessageComponent key={index} item={item} />
            })}
          </ul>
          <div ref={ref}>
            <LoadMoreComponent currentPage={currentPage} hasMore={hasMore} isLoading={isLoading} data={data} />
          </div>
        </div>
      </div>
    )
  }

  return NormalLayout(content(), pageModel)
}
