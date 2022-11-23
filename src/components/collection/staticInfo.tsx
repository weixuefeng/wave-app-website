/*
 * @Author: zhuxiaotong zhuxiaotong@diynova.com
 * @Date: 2022-09-29 15:46:19
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-23 21:59:37
 * @FilePath: /wave-app-webiste/src/components/collection/staticInfo.tsx
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-10-08 20:54:29
 * @FilePath: /wave-chinese-website/src/components/index/staticInfo.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react'
import { t } from 'i18next'
import copy from 'copy-to-clipboard'

import { message } from 'antd'

export default StaticInfo

function StaticInfo(props) {
  const [showAllIntro, setShowAllIntro] = useState(false)
  const [isShowBubble, setIsShowBubble] = useState(false)
  const [isShowToast, setIsShowToast] = useState(false)

  function changeShowAllIntro() {
    setShowAllIntro(!showAllIntro)
  }
  function checkMore() {
    window.open('https://www.newtonproject.org/en/evt/')
  }
  function copyAddress(str) {
    copy(str)
    setIsShowToast(true)
    setTimeout(() => {
      setIsShowToast(false)
    }, 3000)
    // message.success(t('COPYSUCCESS'))
  }
  function showBubble(val, event) {
    event = event || window.event
    if (val) {
      event.stopPropagation()
    }
    setIsShowBubble(val)
  }

  function dealWithAdd(str) {
    return str.substring(0, 6) + '...' + str.substr(-7)
  }
  return (
    <>
      <div className="staticinfo-wrap" onClick={e => showBubble(false, e)}>
        <p className="title introduction">
          <>{t('INTRODUCTION')}</>
        </p>
        <div className="content-wrap">
          <p
            className={showAllIntro ? 'whitespace-pre-wrap' : 'line-clamp-2 h-[3rem] whitespace-pre-wrap text-gray666 '}
          >
            {props.collectionInfo.description}
          </p>
          <p className="more" onClick={changeShowAllIntro}>
            <>{showAllIntro ? t('COLLAPSE') : t('MORE')}</>
          </p>
        </div>
        <div className="mt-7">
          {props.collectionInfo.specifications && (
            <p className="title">
              <>{t('SPECIFICATTIONS')}</>
            </p>
          )}
          <div className="spec-info">
            <div className="flex">
              {props.collectionInfo &&
                props.collectionInfo.specifications &&
                (props.collectionInfo.specifications.contract_address ||
                  props.collectionInfo.specifications.token_standard ||
                  props.collectionInfo.specifications.block_chain ||
                  props.collectionInfo.specifications.creator_earnings) && (
                  <>
                    <div className="info-title">
                      {props.collectionInfo.specifications.contract_address && (
                        <p className="item">
                          <>{t('CONTRACT_ADDRESS')}</>
                        </p>
                      )}
                      {props.collectionInfo.specifications.token_standard && (
                        <p className="item">
                          <>{t('TOKEN_STANDARD')}</>
                        </p>
                      )}
                      {props.collectionInfo.specifications.block_chain && (
                        <p className="item">
                          <>{t('BLOCKCHAIN')}</>
                        </p>
                      )}
                      {props.collectionInfo.specifications.creator_earnings && (
                        <p className="item">
                          <>{t('CREATOR_EARNINGS')}</>
                        </p>
                      )}
                    </div>
                    <div className="info-content">
                      {props.collectionInfo.specifications.contract_address && (
                        <div className="item">
                          <p className="needTruncate">
                            {dealWithAdd(props.collectionInfo.specifications.contract_address)}
                          </p>
                          <img
                            src="/assets/image/icon-copy.png"
                            alt=""
                            className="icon-copy"
                            onClick={() => copyAddress(props.collectionInfo.specifications.contract_address)}
                          />
                          {/* onClick={copyAddress(props.collectionInfo.specifications.contract_address)} */}
                        </div>
                      )}
                      {props.collectionInfo.specifications.token_standard && (
                        <p className="item">{props.collectionInfo.specifications.token_standard}</p>
                      )}
                      {props.collectionInfo.specifications.block_chain && (
                        <p className="item">{props.collectionInfo.specifications.block_chain}</p>
                      )}
                      {props.collectionInfo.specifications.creator_earnings && (
                        <div className="item">
                          {props.collectionInfo.specifications.creator_earnings}
                          <img
                            src="/assets/image/icon-ques.png"
                            alt=""
                            className="icon-ques"
                            onClick={e => showBubble(true, e)}
                          />
                          {/* onClick={showBubble(true)} */}
                          {isShowBubble && (
                            <div className="bubble">
                              <img src="/assets/image/bubble.png" alt="" />
                              <p className="bubble-content">
                                {t('BUBBLEBEFORE') +
                                  ' ' +
                                  props.collectionInfo.specifications.creator_earnings +
                                  ' ' +
                                  t('BUBBLEAFTER')}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                )}
            </div>
            <div className="spec-tip">
              <img src="/assets/image/icon-point.png" alt="" className="icon-point" />
              {/* className={showAllTips ? '' : 'h-8 line-clamp-2'} */}
              <p>
                <>{t('TIPS')}</>
                <a className="more" href="https://www.newtonproject.org/en/evt/">
                  <> {t('MORE')}</>
                </a>
              </p>
              {/* <p className="more" onClick={changeShowAllTips}>
                {showAllTips ? t('COLLAPSE') : t('MORE')}
              </p> */}
            </div>
          </div>
        </div>
      </div>
      {isShowToast && (
        <div className="toast">
          <img className="copied" src="/assets/image/copied.png" alt="copied" />
          <>{t('COPYSUCCESS')}</>
        </div>
      )}
    </>
  )
}
