/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-10-13 11:26:10
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-28 19:54:59
 * @FilePath: /wave-app-webiste/src/components/footer/footer.tsx
 */
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  let date = new Date().getFullYear()

  return (
    <div className="footer">
      <div className="footer-top">
        <div className="footer-logo container">
          <div className="logo">
            <Link href="/" passHref>
              <img className="wave-logo" src="/assets/image/footer_logo.png" alt="footer-logo" />
            </Link>
            <Link href="https://www.newtonproject.org/en/">
              <a target="_blank">
                <img className="newton-logo" src="/assets/image/footer_newton.png" alt="footer-newton" />
              </a>
            </Link>
          </div>
          <dl>
            <dt>{t('JOIN_THE_COMMUNITY')}</dt>
            <dd>
              <Link href="https://t.me/waveuniverse_group">
                <a target="_blank">
                  <img src="/assets/image/footer_telegram.png" alt="footer-telegram" />
                </a>
              </Link>
              <Link href="https://twitter.com/wave_universe">
                <a target="_blank">
                  <img src="/assets/image/footer_twier.png" alt="footer-twier" />
                </a>
              </Link>
              <Link href="https://discord.com/invite/rwnwZCbfhe">
                <a target="_blank">
                  <img src="/assets/image/footer_discord.png" alt="footer-discord" />
                </a>
              </Link>
            </dd>
          </dl>
        </div>
      </div>
      <div className="footer-content container">
        <p className="hidden md:block">©{date} Wave Platform Pte. Ltd.</p>
        <div>
          <Link href="/privacy">{t('PRIVACY_POLICY')}</Link>
          <Link href="/terms">{t('TERM_OF_SERVICES')}</Link>
        </div>
        <p className="block md:hidden">©{date} Wave Platform Pte. Ltd.</p>
      </div>
    </div>
  )
}
