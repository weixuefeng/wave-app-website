import React, { Fragment, useState } from 'react'
import Link from 'next/link'
import { Dialog, Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import { putLocalData } from 'localstorage/localstorage'
import { LocalKey } from 'constants/key'
import Login from './login'

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
          <Link href="/" passHref>
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
        <Login />
      </ul>
    </div>
  )
}
