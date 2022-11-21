/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-21 20:01:59
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-21 20:44:53
 * @FilePath: /wave-app-webiste/src/components/dialog/BuySuccessfulDialog.tsx
 */
import Link from 'next/link'
import React  from 'react'

export default function BuySuccessfulDialog(props) {

  return (
    <div className="dialog-buy-successful">
      <div className="flex justify-center">
        <img className="h-auto w-48" src="/assets/image/icon_done.png" alt="done" />
      </div>
      <h2>Payment Successful</h2>
      <div className='content'>
        Congratulations on the successful purchase of this assetyou can view it in &quot;My&quot; -&quot;Asset&quot;
      </div>
      <div className="action">
        <Link href='/assets'>View Records</Link>
      </div>
    </div>
  )
}
