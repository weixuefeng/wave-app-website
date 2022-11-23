/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-17 20:18:09
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-23 11:49:07
 * @FilePath: /wave-app-webiste/src/components/layout/LoadMoreComponent.tsx
 */
import React from 'react'
import { useTranslation } from 'react-i18next'
import Nodata from './NoData'

export default function LoadMoreComponent(props) {
  const { t } = useTranslation()
  const { currentPage, isLoading, hasMore, data } = props

  if (currentPage == 1) {
    return (
      <>
        {isLoading ? (
          <div className="mt-10 text-center text-base text-gray99">
            <img className="mx-auto mt-10 h-auto w-44" src="/assets/image/loading.gif" alt="loading" />
          </div>
        ) : data && data.length > 0 ? null : (
          <Nodata />
        )}
      </>
    )
  } else {
    return (
      <>
        {
          <div className="mt-10 text-center text-base text-gray99">
            {hasMore ? `${t('LOADING') + '...'}` : `${t('NOMOREDATA')}`}
          </div>
        }
      </>
    )
  }
}
