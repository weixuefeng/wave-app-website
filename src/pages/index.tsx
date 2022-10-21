/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-10-12 19:08:34
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-10-21 21:18:07
 * @FilePath: /wave-app-webiste/src/pages/index.tsx
 */

import React, { useState, useEffect } from 'react'
import NormalLayout from 'components/layout/normalLayout'
import { PageModel } from 'model/navModel'
import { useTranslation } from 'react-i18next'
import { sign } from 'utils/sign_utils'
export default Home

function Home() {
  let pageModel = new PageModel('HOME', 'WAVE', '')
  return <>{NormalLayout(Main(), pageModel)}</>
}

const newLocal = '/api/hello'
const collectionUrl = newLocal
function Main() {
  let { i18n } = useTranslation()
  const { t } = useTranslation()

  useEffect(() => {
    getCollectionInfo()
    sign({ name: 'weixuefeng', age: 12, binfo: 'bssd', c: 'a' })
  }, [])
  const getCollectionInfo = async () => {
    let params = {
      collection_id: 4,
    }
    // const res = await postRequest(collectionUrl, params)
    // console.log('res:',res)
    // if (res.status == 200 && res.data.error_code == 1) {
    //   const info = res.data.result
    //   console.log('info:',info)
    // }
  }
  return (
    <div className={'container'}>
      <div className={'main'} onClick={() => sign({ haha: 'sadf' })}>
        {t('Content')}
      </div>
    </div>
  )
}
