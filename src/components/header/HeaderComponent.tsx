/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-15 12:51:57
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-25 19:09:46
 * @FilePath: /wave-app-webiste/src/components/header/HeaderComponent.tsx
 */
import React from 'react'
import HeaderMobileComponent from './HeaderMobileComponent'
import HeaderPcComponent from './HeaderPcComponent'

export default function Header(props) {
  return (
    <>
      <HeaderPcComponent />
      <HeaderMobileComponent />
    </>
  )
}
