/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 20:26:47
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-17 20:01:30
 * @FilePath: /wave-app-website/src/pages/cinema.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import DialogComponent from 'components/common/DialogComponent'
import DownAppDialog from 'components/dialog/DownAppDialog'
import LoadMoreComponent from 'components/layout/LoadMoreComponent'
import Nodata from 'components/layout/noData'
import NormalLayout from 'components/layout/normalLayout'
import usePagination from 'hooks/usePagination'
import { CinemaList } from 'model/cinema'
import { PageModel } from 'model/navModel'
import React, { useState, useRef } from 'react'
import Http from 'services/http'
import { formatSeconds } from 'utils/time'

export default function Cinema(props) {
  let pageModel = new PageModel('Cinema', 'WAVE', '')

  const ref = useRef(null)

  let [isOpen, setIsOpen] = useState(false)

  const { hasMore, isLoading, currentPage, data, error } = usePagination<CinemaList>(ref, fetchData)


  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }


  function fetchData() {
    return Http.getInstance().getMyCinemaList(currentPage)
  }

  function content() {
    return (
      <>
        <div className="cinema-page">
          <div className="container mx-auto">
            <h2 className="title">My Cinema</h2>
            <div className="cinema">
              {data?.map((item, index) => {
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
            <div ref={ref}>
              <LoadMoreComponent currentPage={currentPage} hasMore={hasMore} isLoading={isLoading} data={data}/>
            </div>
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
