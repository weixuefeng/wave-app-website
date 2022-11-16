/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-10-13 11:26:10
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-16 16:08:14
 * @FilePath: /wave-app-webiste/src/components/footer/footer.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  let date = new Date().getFullYear()

  return (
    <div className="footer">
      <div className="footer-top">
        <div className="footer-logo container">
          <div className="logo">
            <img src="/assets/image/footer_logo.png" alt="footer-logo" />
          </div>
          <dl>
            <dt>Join the community</dt>
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
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Use</Link>
        </div>
      </div>
    </div>
  )
}
