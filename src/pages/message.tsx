/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-16 18:35:19
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-12-02 12:27:12
 * @FilePath: /wave-app-website/src/pages/message.tsx
 */
import LoadMoreComponent from 'components/layout/LoadMoreComponent'
import NormalLayoutComponent from 'components/layout/NormalLayoutComponent'
import MessageComponent from 'components/message/MessageComponent'
import usePagination from 'hooks/usePagination'
import { MessageList } from 'model/message'
import { PageModel } from 'model/navModel'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Http from 'services/http'

export default function Message() {
  const { t } = useTranslation()
  let pageModel = new PageModel('Notification', 'WAVE', '')

  const ref = useRef(null)

  const { hasMore, isLoading, currentPage, data, error } = usePagination<MessageList>(ref, fetchData)

  function fetchData(page) {
    return Http.getInstance().getMessageList(0, page)
  }

  function content() {
    return (
      <div className="message">
        <div className="container mx-auto">
          <h2 className="title">{t('NOTIFICATION')}</h2>
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

  return NormalLayoutComponent(content(), pageModel)
}
