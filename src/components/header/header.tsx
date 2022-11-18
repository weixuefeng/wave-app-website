/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-15 12:51:57
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-16 20:44:03
 * @FilePath: /wave-app-webiste/src/components/header/header.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Fragment, useState } from 'react'
import Link from 'next/link'
import { Dialog, Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import { putLocalData } from 'localstorage/localstorage'
import { LocalKey } from 'constants/key'
import Login from './LoginComponent'
import LoginComponent from './LoginComponent'

export default function Header(props) {
  const languageTitle = [
    {
      language: 'en',
      title: 'English',
    },
    {
      language: 'zh',
      title: '中文',
    },
  ]
  const navList = [
    {
      src: '/',
      nav: 'WAVE',
    },
    {
      src: '/',
      nav: 'FEATURES',
    },
    {
      src: '/',
      nav: 'COMMUNITY',
    },
    {
      src: '/',
      nav: 'FAQ',
    },
    {
      src: '/',
      nav: 'DOWNLOAD',
    },
  ]

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  let { i18n } = useTranslation()
  const { t } = useTranslation()

  return (
    <div className="border-b-2 border-solid border-gray-100 bg-white">
      <div className="header container">
        <div className="logo">
          <Link href="/" passHref>
            <div>
              <img src="/assets/image/logo.png" alt="Wave" />
            </div>
          </Link>
        </div>
        <ul>
          <li className="massage">
            <Link href="/trade" passHref>
              Trade
            </Link>
            <Link href="/message" passHref>
              <div className="massage-img">
                <img src="/assets/image/icon_massage.png" alt="massage" />
                <i></i>
              </div>
            </Link>
          </li>
          <li className="language">
            <Link href="/" passHref>
              <div className="language-img">
                <img src="/assets/image/icon_language.png" alt="language" />
              </div>
            </Link>
          </li>
          <LoginComponent />
        </ul>
      </div>
    </div>
  )
}
