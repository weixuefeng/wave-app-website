/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-10-13 11:26:10
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-23 14:35:14
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
            <img src="/assets/image/footer_logo.png" alt="footer-logo" />
          </div>
          <dl>
            <dt>{t('JOIN_THE_COMMUNITY')}</dt>
            <dd>
              <Link href="https://app.waveuniverse.org/">
                <a target="_blank">
                  <img src="/assets/image/footer_telegram.png" alt="footer-telegram" />
                </a>
              </Link>
              <Link href="https://app.waveuniverse.org/">
                <a target="_blank">
                  <img src="/assets/image/footer_twier.png" alt="footer-twier" />
                </a>
              </Link>
              <Link href="https://app.waveuniverse.org/">
                <a target="_blank">
                  <img src="/assets/image/footer_discord.png" alt="footer-discord" />
                </a>
              </Link>
            </dd>
          </dl>
        </div>
      </div>
      <div className="footer-content container">
        <p>Copyright © {date} WAVE Foundation. All Rights Reserved.</p>
        <div>
          <Link href="/privacy">{t('PRIVACY_POLICY')}</Link>
          <Link href="/terms">{t('TERM_OF_SERVICES')}</Link>
        </div>
      </div>
    </div>
  )
}
