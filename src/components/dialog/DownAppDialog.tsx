/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-16 10:58:54
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-12-02 21:11:50
 * @FilePath: /wave-app-webiste/src/components/dialog/DownAppDialog.tsx
 */

import React, { useEffect } from 'react'
import QRCode from 'qrcode.react'
import Link from 'next/link'
import Http from 'services/http'
import Log from 'utils/log'
export default function DownAppDialog() {
  // useEffect(() => {
  //   requestUpgrade()
  // }, [])

  // async function requestUpgrade() {
  //   const response = await Http.getInstance().requestUpgrade()
  //   Log.d(response)
  // }

  useEffect(() => {
    Http.getInstance()
      .requestWaveVersion()
      .then(response => {
       Log.d(response)
      })
      .catch(error => {
        Log.e(error)
      })
  }, [])

  return (
    <div className="down-app-dialog">
      <h2>Please Download the Wave App to View</h2>
      <div className="down-app">
        <Link href="https://apps.apple.com/us/app/wave-nft-browser/id1626787987">
          <a className="store" target="_blank">
            <img src="/assets/image/app-store.png" alt="appStore" />
          </a>
        </Link>
        <Link href="https://play.google.com/store/apps/details?id=org.wave">
          <a className="play" target="_blank">
            <img src="/assets/image/google-play.png" alt="googlePlay" />
          </a>
        </Link>
        <div className={'code'}>
          <img className="code-img" src="/assets/image/code.png" alt="code" />
          <div className={'code-tit'}>
            <QRCode value="https://app.waveuniverse.org/assets/image/banner-new.png" size={86} />
          </div>
        </div>
      </div>
    </div>
  )
}
