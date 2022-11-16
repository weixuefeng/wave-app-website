/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 20:26:47
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-16 11:07:44
 * @FilePath: /wave-app-website/src/pages/tickets.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import DialogComponent from 'components/common/DialogComponent'
import DownAppDialog from 'components/dialog/DownAppDialog'
import NormalLayout from 'components/layout/normalLayout'
import { CinemaList } from 'model/cinema'
import { PageModel } from 'model/navModel'
import { UserInfo } from 'model/user'
import React, { useState, useEffect, useRef } from 'react'
import { selectUser } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppSelector } from 'store/store'
import { isInViewPort } from 'utils/functions'
import { formatSeconds } from 'utils/time'

export default function Cinema(props) {
  let pageModel = new PageModel('Cinema', 'WAVE', '')
  const currentUser = useAppSelector(selectUser) as UserInfo
  const [cinemaData, setCinemaData] = useState<Array<CinemaList>>()
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const ref = useRef(null)

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  useEffect(() => {
    if (currentUser) {
      getCinemaData()
    }
  }, [currentUser])

  function getCinemaData() {
    setIsLoading(true)
    Http.getInstance()
      .getMyCinemaList(currentPage)
      .then(response => {
        console.log('ppppp', response)
        if (currentPage == 1) {
          // first page
          setCinemaData(response.data)
          // check has more
          if (response.page_id < response.total_page) {
            setHasMore(true)
            // update current page
            setCurrentPage(currentPage + 1)
          } else {
            setHasMore(false)
          }
        } else {
          // more page
          setCinemaData(cinemaData.concat(response.data))
          // check has more
          if (response.page_id < response.total_page) {
            setHasMore(true)
            setCurrentPage(currentPage + 1)
          } else {
            setHasMore(false)
          }
        }
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  const handleScroll = () => {
    if (ref) {
      let res = isInViewPort(ref.current)
      if (res) {
        if (hasMore && !isLoading) {
          getCinemaData()
        }
      }
    }
  }

  function content() {
    return (
      <>
        <div className="cinema-page">
          <div className="container mx-auto">
            <h2 className="title">My Cinema</h2>
            <div className="cinema">
              {cinemaData?.map((item, index) => {
                return (
                  <div className="item" key={index} onClick={openModal}>
                    <div className="img">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="type">EVT</div>
                    <div className="info-bg">
                      <div className="info">
                        <div className="name">
                          <h5>{item.name}</h5>
                          <p>{formatSeconds(item.running_time)}</p>
                        </div>
                        <div className="pic">
                          <img src="/assets/image/icon_play.png" alt="play icon" />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <button ref={ref} className="primary black mb-10" onClick={() => getCinemaData()}>
              {isLoading ? 'loading...' : hasMore ? 'load more' : 'no more'}
            </button>
          </div>
        </div>
        <DialogComponent isOpen={isOpen} closeModal={closeModal}>
          <DownAppDialog />
        </DialogComponent>
      </>
    )
  }

  return NormalLayout(content(), pageModel)
}
