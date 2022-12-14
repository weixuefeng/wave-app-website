/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-16 18:32:00
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-12-02 12:27:29
 * @FilePath: /wave-app-website/src/pages/trade.tsx
 */
import LoadMoreComponent from 'components/layout/LoadMoreComponent'
import NormalLayoutComponent from 'components/layout/NormalLayoutComponent'
import usePagination from 'hooks/usePagination'
import { PageModel } from 'model/navModel'
import { TradeItem } from 'model/trade'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Http from 'services/http'
import TradeComponent from '../components/trade/TradeComponent'

export default function TradePage(props) {
  let pageModel = new PageModel('Trade', 'WAVE', '')
  const ref = useRef(null)
  const { t } = useTranslation()

  const { hasMore, isLoading, currentPage, data, error } = usePagination<TradeItem>(ref, fetchData)

  function fetchData(page) {
    return Http.getInstance().getNFTTradeList(page, null)
  }

  function content() {
    return (
      <div className="asset trade">
        <div className="container mx-auto">
          <h2>
            <>{t('TRADE')}</>
          </h2>
          <ul>
            {data?.map((item, index) => {
              return <TradeComponent key={index} item={item} />
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
