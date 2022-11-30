/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-17 20:18:09
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-30 13:59:50
 * @FilePath: /wave-app-webiste/src/components/layout/LoadMoreComponent.tsx
 */
import React from 'react'
import { useTranslation } from 'react-i18next'
import EmptyComponent from './EmptyComponent'
import LoadingCompontent from './LoadingCompontent'

export default function LoadMoreComponent(props) {
  const { t } = useTranslation()
  const { currentPage, isLoading, hasMore, data } = props

  if (currentPage == 1) {
    return (
      <>
        {isLoading ? (
          <LoadingCompontent />
        ) : data && data.length > 0 ? null : (
          <EmptyComponent />
        )}
      </>
    )
  } else {
    return (
      <>
        {
          <div className="mt-10 pb-16 text-center text-base text-gray99">
            {hasMore ? `${t('LOADING') + '...'}` : `${t('NOMOREDATA')}`}
          </div>
        }
      </>
    )
  }
}
